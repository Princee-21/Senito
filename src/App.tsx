import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ToastProvider, useToast } from './components/common/Toast';
import { LandingNav } from './components/landing/LandingNav';
import { LandingHero } from './components/landing/LandingHero';
import { StorySection } from './components/landing/StorySection';
import { LivePreviewSection } from './components/landing/LivePreviewSection';
import { FeaturesGrid } from './components/landing/FeaturesGrid';
import { FinalCta } from './components/landing/FinalCta';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { SurveyBuilder } from './components/survey-builder/SurveyBuilder';
import { PublicSurveyRunner } from './components/public-survey/PublicSurveyRunner';
import { AuthModal } from './components/AuthModal';
import { StoreService, AuthUser } from './services/store';
import { Survey, SurveyResponse } from './types';

function MainApp() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'builder' | 'survey_preview'>('landing');
  const [dashboardTab, setDashboardTab] = useState<string>('overview');
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [testingSurvey, setTestingSurvey] = useState<Survey | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => StoreService.getCurrentUser());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');
  const [redirectTarget, setRedirectTarget] = useState<string | null>(null);

  const { showToast } = useToast();

  useEffect(() => {
    const handlePopState = () => {
      // Check query param for public survey
      const params = new URLSearchParams(window.location.search);
      const surveyId = params.get('survey');
      if (surveyId) {
        const found = StoreService.getSurveyById(surveyId);
        if (found) {
          setTestingSurvey(found);
          setCurrentView('survey_preview');
        }
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleEnterApp = (targetTab: string = 'overview') => {
    const user = StoreService.getCurrentUser();
    if (!user) {
      setRedirectTarget(targetTab);
      setAuthInitialMode('signin');
      setAuthModalOpen(true);
      return;
    }
    setDashboardTab(targetTab);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreDemo = () => {
    const demoUser: AuthUser = {
      id: 'usr-demo',
      name: 'Demo Administrator',
      email: 'admin@sentio.io',
      organization: 'Sentio Operations',
      industry: 'Technology & SaaS',
      isDemoUser: true,
    };
    StoreService.setCurrentUser(demoUser);
    setCurrentUser(demoUser);
    setDashboardTab('overview');
    setCurrentView('dashboard');
    showToast('Demo Environment Loaded', 'Signed in with pre-populated multi-industry intelligence datasets.', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignIn = () => {
    setAuthInitialMode('signin');
    setAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthInitialMode('signup');
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (_email: string, mode: 'signin' | 'signup') => {
    const user = StoreService.getCurrentUser();
    setCurrentUser(user);
    setAuthModalOpen(false);
    showToast(
      mode === 'signup' ? 'Workspace Provisioned' : 'Welcome Back',
      `Signed in as ${user?.name || 'Administrator'}`,
      'success'
    );
    const target = redirectTarget || 'overview';
    setDashboardTab(target);
    setCurrentView('dashboard');
    setRedirectTarget(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    StoreService.setCurrentUser(null);
    setCurrentUser(null);
    setCurrentView('landing');
    showToast('Signed Out', 'You have been safely signed out of your workspace.', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBuilder = (survey?: Survey | null) => {
    const user = StoreService.getCurrentUser();
    if (!user) {
      setRedirectTarget('builder');
      setAuthInitialMode('signin');
      setAuthModalOpen(true);
      return;
    }
    setEditingSurvey(survey || null);
    setCurrentView('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveSurvey = (savedSurvey: Survey) => {
    StoreService.saveSurvey(savedSurvey);
    showToast('Survey Saved', `"${savedSurvey.title}" has been saved to your workspace.`, 'success');
    setCurrentView('dashboard');
    setDashboardTab('campaigns');
    setEditingSurvey(null);
  };

  const handleTestSurvey = (survey: Survey) => {
    setTestingSurvey(survey);
    setCurrentView('survey_preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSurveyResponseSubmitted = (_response: SurveyResponse) => {
    showToast('Response Recorded', 'Real-time telemetry updated across Feedback Pulse.', 'success');
  };

  return (
    <div className="min-h-screen bg-black text-[#E1E0CC] selection:bg-[#DEDBC8] selection:text-black font-sans antialiased">
      {/* 1. Landing View */}
      {currentView === 'landing' && (
        <div className="flex flex-col min-h-screen">
          <LandingNav
            currentUser={currentUser}
            onEnterApp={handleEnterApp}
            onExploreDemo={handleExploreDemo}
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
            onSignOut={handleSignOut}
          />

          <main className="flex-1">
            <LandingHero
              onOpenBuilder={() => handleOpenBuilder(null)}
              onEnterApp={handleEnterApp}
            />

            <StorySection />

            <LivePreviewSection
              onEnterApp={handleEnterApp}
              onOpenBuilder={() => handleOpenBuilder(null)}
            />

            <FeaturesGrid
              onOpenBuilder={() => handleOpenBuilder(null)}
              onEnterApp={handleEnterApp}
            />

            <FinalCta
              onOpenBuilder={() => handleOpenBuilder(null)}
              onEnterApp={handleEnterApp}
            />
          </main>
        </div>
      )}

      {/* 2. Operations Dashboard View */}
      {currentView === 'dashboard' && (
        <DashboardLayout
          initialTab={dashboardTab}
          onOpenBuilder={handleOpenBuilder}
          onExitToLanding={() => setCurrentView('landing')}
          onSignOut={handleSignOut}
          onTestSurvey={handleTestSurvey}
        />
      )}

      {/* 3. Survey Builder View */}
      {currentView === 'builder' && (
        <SurveyBuilder
          initialSurvey={editingSurvey}
          onSaveComplete={handleSaveSurvey}
          onCancel={() => {
            setCurrentView('dashboard');
            setEditingSurvey(null);
          }}
        />
      )}

      {/* 4. Public Survey / Simulator Runner */}
      {currentView === 'survey_preview' && (
        <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
          <PublicSurveyRunner
            survey={testingSurvey}
            onClose={() => {
              setCurrentView('dashboard');
              setTestingSurvey(null);
            }}
            onResponseSubmitted={handleSurveyResponseSubmitted}
            isSimulator={true}
          />
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authInitialMode}
        onClose={() => {
          setAuthModalOpen(false);
          setRedirectTarget(null);
        }}
        onSuccess={handleAuthSuccess}
        onExploreDemo={() => {
          setAuthModalOpen(false);
          handleExploreDemo();
        }}
        redirectTarget={redirectTarget}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
      <SpeedInsights />
    </ToastProvider>
  );
}
