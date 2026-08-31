import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Layers,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Settings,
  Shield,
  MessageSquare,
  Plus,
  Search,
  ArrowUpRight,
  LogOut,
  QrCode,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { StoreService } from '../../services/store';
import { OrganizationSettings, Survey } from '../../types';
import { OverviewView } from './OverviewView';
import { IssueRadarView } from '../issue-radar/IssueRadarView';
import { ImprovementTrackerView } from '../improvement/ImprovementTrackerView';
import { AnalyticsView } from '../analytics/AnalyticsView';
import { SettingsView } from '../settings/SettingsView';
import { AuditLogView } from '../audit-log/AuditLogView';
import { CommandPalette } from '../common/CommandPalette';
import { QrShareModal } from '../share/QrShareModal';
import { DashboardBackgroundMotion } from './DashboardBackgroundMotion';

interface DashboardLayoutProps {
  initialTab?: string;
  onOpenBuilder: (survey?: Survey | null) => void;
  onExitToLanding: () => void;
  onSignOut?: () => void;
  onTestSurvey: (survey: Survey) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  initialTab = 'overview',
  onOpenBuilder,
  onExitToLanding,
  onSignOut,
  onTestSurvey,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [settings, setSettings] = useState<OrganizationSettings>(() => StoreService.getSettings());
  const [currentUser, setCurrentUser] = useState(() => StoreService.getCurrentUser());
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareSurvey, setShareSurvey] = useState<Survey | null>(null);

  const pulse = StoreService.getFeedbackPulse();
  const surveys = StoreService.getSurveys();
  const responses = StoreService.getResponses();

  // Listen to live reactive settings changes
  useEffect(() => {
    const handleSettingsChanged = (e: any) => {
      if (e.detail) {
        setSettings(e.detail);
      }
    };
    window.addEventListener('sentio_settings_changed', handleSettingsChanged);
    return () => window.removeEventListener('sentio_settings_changed', handleSettingsChanged);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'surveys', label: 'Surveys & Campaigns', icon: Layers, badge: surveys.length },
    { id: 'feed', label: 'Feedback Feed', icon: MessageSquare, badge: responses.length },
    { id: 'radar', label: 'Issue Radar', icon: AlertTriangle, badge: pulse.openIssuesCount, highlight: true },
    { id: 'improvements', label: 'Improvement Tracker', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'settings', label: 'Workspace Settings', icon: Settings },
    { id: 'audit', label: 'Audit Trail', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#07080b] text-[#E1E0CC] flex flex-col md:flex-row relative selection:bg-[#DEDBC8] selection:text-black">
      {/* Global Background Motion Layer */}
      <DashboardBackgroundMotion variant="dashboard" intensity="medium" isFixed={true} />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0d0e14]/90 backdrop-blur-md border-b border-white/[0.08] relative z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#DEDBC8] text-black font-bold text-xs flex items-center justify-center">
            S
          </div>
          <span className="font-extrabold tracking-wider text-sm text-[#E1E0CC]">SENTIO</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-white/60 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SIDEBAR (Deskop / Fixed) */}
      {/* ========================================================================= */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 border-r border-white/[0.08] bg-[#07080b]/45 backdrop-blur-2xl flex flex-col justify-between p-5 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div
              onClick={onExitToLanding}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#DEDBC8] text-black font-extrabold text-sm flex items-center justify-center shadow-lg shadow-[#DEDBC8]/15 group-hover:scale-105 transition-transform">
                S
              </div>
              <div>
                <span className="font-extrabold tracking-widest text-base text-[#E1E0CC] block leading-none">
                  SENTIO
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#DEDBC8]/60 uppercase">
                  Intelligence OS
                </span>
              </div>
            </div>
          </div>

          {/* Active Workspace / Org Identity Badge (SINGLE SOURCE OF TRUTH) */}
          <div
            onClick={() => setActiveTab('settings')}
            className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] transition-all cursor-pointer group"
            title="Click to configure organization settings"
          >
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#DEDBC8]/60 mb-1 flex items-center justify-between">
              <span>Active Organization</span>
              <Settings className="w-3 h-3 text-[#DEDBC8]/40 group-hover:text-[#DEDBC8] transition-colors" />
            </div>
            <div className="text-xs font-bold text-[#E1E0CC] truncate group-hover:text-[#DEDBC8] transition-colors">
              {settings.organizationName || 'Demo'}
            </div>
            <div className="text-[10px] font-mono text-[#DEDBC8]/60 truncate mt-0.5">
              {settings.industry}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left text-xs font-medium transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-[#DEDBC8]/25 text-white font-bold backdrop-blur-xl border border-[#DEDBC8]/40 shadow-lg shadow-[#DEDBC8]/10'
                      : 'text-[#DEDBC8]/70 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#DEDBC8]' : 'text-[#DEDBC8]/70'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#DEDBC8]/30 text-white border border-[#DEDBC8]/40'
                          : item.highlight
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-white/[0.06] text-[#DEDBC8]/60'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/[0.06] space-y-2">
          <button
            onClick={() => onOpenBuilder(null)}
            className="w-full py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-xl border border-white/[0.12] text-xs font-mono text-[#E1E0CC] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-black/20"
          >
            <Plus className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span>New Survey</span>
          </button>

          {onSignOut ? (
            <button
              onClick={onSignOut}
              className="w-full py-2 text-left text-[11px] font-mono text-red-400/70 hover:text-red-300 hover:bg-red-950/20 rounded-lg px-2 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out {currentUser ? `(${currentUser.email})` : ''}</span>
            </button>
          ) : (
            <button
              onClick={onExitToLanding}
              className="w-full py-2 text-left text-[11px] font-mono text-[#DEDBC8]/50 hover:text-[#DEDBC8] flex items-center gap-1.5 transition-colors cursor-pointer px-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Return to Landing Page</span>
            </button>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN VIEWPORT */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top App Header */}
        <header className="h-16 px-6 sm:px-8 border-b border-white/[0.08] bg-[#07080b]/30 backdrop-blur-2xl flex items-center justify-between sticky top-0 z-30">
          {/* Search Trigger (Cmd+K) */}
          <div
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] text-xs font-mono text-[#DEDBC8]/70 cursor-pointer w-64 sm:w-80 transition-all shadow-md shadow-black/20"
          >
            <Search className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span>Search or jump to...</span>
            <span className="ml-auto text-[10px] bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.06]">
              ⌘K
            </span>
          </div>

          {/* Quick Pulse Widget & New Survey Button & Sign Out */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#DEDBC8]/60">Pulse:</span>
              <span className="font-bold text-[#E1E0CC]">{pulse.score}/100</span>
            </div>

            <button
              onClick={() => onOpenBuilder(null)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#DEDBC8]/20 hover:bg-[#DEDBC8]/30 backdrop-blur-xl border border-[#DEDBC8]/50 text-[#E1E0CC] hover:text-white font-medium text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-[#DEDBC8]/10 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Survey</span>
            </button>

            {onSignOut && (
              <button
                onClick={onSignOut}
                title="Sign out of account"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-red-950/40 hover:border-red-500/40 text-white/70 hover:text-red-300 backdrop-blur-xl border border-white/[0.12] text-xs font-mono transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="text-[11px]">Sign Out</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic View Rendering */}
        <main className="flex-1 overflow-y-auto pb-16">
          {activeTab === 'overview' && (
            <OverviewView
              onOpenBuilder={() => onOpenBuilder(null)}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onTestSurvey={onTestSurvey}
            />
          )}

          {/* Campaigns / Survey list tab */}
          {activeTab === 'surveys' && (
            <div className="max-w-7xl mx-auto p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">
                    Active Survey Campaigns
                  </h1>
                  <p className="text-xs text-[#DEDBC8]/60 mt-1">
                    Manage questionnaires, branching logic, and live QR distribution channels.
                  </p>
                </div>
                <button
                  onClick={() => onOpenBuilder(null)}
                  className="px-4 py-2 rounded-xl bg-[#DEDBC8]/20 hover:bg-[#DEDBC8]/30 backdrop-blur-xl border border-[#DEDBC8]/50 text-[#E1E0CC] hover:text-white text-xs font-mono uppercase font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#DEDBC8]/10"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Campaign</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {surveys.length === 0 ? (
                  <div className="col-span-full p-12 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-dashed border-white/[0.08] text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-[#DEDBC8]">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-[#E1E0CC]">No Survey Campaigns Active</h3>
                      <p className="text-xs text-[#DEDBC8]/60 max-w-md mx-auto leading-relaxed">
                        Design a customer satisfaction pulse, employee evaluation, or event review to start capturing responses via QR codes and web links.
                      </p>
                    </div>
                    <button
                      onClick={() => onOpenBuilder(null)}
                      className="px-5 py-2.5 rounded-xl bg-[#DEDBC8]/20 hover:bg-[#DEDBC8]/30 backdrop-blur-xl border border-[#DEDBC8]/50 text-[#E1E0CC] hover:text-white text-xs font-mono uppercase font-bold inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#DEDBC8]/10"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Your First Campaign</span>
                    </button>
                  </div>
                ) : (
                  surveys.map((s) => (
                    <div
                      key={s.id}
                      className="p-6 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between space-y-4 shadow-2xl"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono uppercase text-[#DEDBC8]/60 bg-white/[0.04] px-2 py-0.5 rounded">
                            {s.industry}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {s.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#E1E0CC] mb-2">{s.title}</h3>
                        <p className="text-xs text-[#DEDBC8]/60 line-clamp-2 leading-relaxed mb-4">
                          {s.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs font-mono text-[#DEDBC8]/70">
                          <span>{s.questions.length} Questions</span>
                          <span>•</span>
                          <span>{s.totalResponses} Responses</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                        <button
                          onClick={() => setShareSurvey(s)}
                          className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md border border-white/[0.12] text-xs font-mono text-[#DEDBC8] flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>QR Code</span>
                        </button>

                        <div className="flex gap-2">
                          <button
                            onClick={() => onOpenBuilder(s)}
                            className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md border border-white/[0.12] text-xs font-mono text-[#E1E0CC] transition-all cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onTestSurvey(s)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#DEDBC8]/20 hover:bg-[#DEDBC8]/30 backdrop-blur-md border border-[#DEDBC8]/50 text-[#E1E0CC] hover:text-white text-xs font-mono font-medium transition-all cursor-pointer shadow-sm shadow-[#DEDBC8]/10"
                          >
                            Test
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Feedback Feed Tab */}
          {activeTab === 'feed' && (
            <div className="max-w-6xl mx-auto p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">
                    Live Feedback Feed
                  </h1>
                  <p className="text-xs text-[#DEDBC8]/60 mt-1">
                    Stream of raw verbatim comments, ratings, and NLP sentiment classifications.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#DEDBC8]/50">
                  {responses.length} Total Submissions
                </span>
              </div>

              <div className="space-y-4">
                {responses.length === 0 ? (
                  <div className="p-12 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-dashed border-white/[0.08] text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-[#DEDBC8]">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-[#E1E0CC]">No Feedback Received Yet</h3>
                      <p className="text-xs text-[#DEDBC8]/60 max-w-md mx-auto leading-relaxed">
                        Share your published surveys with respondents via web links or generated QR codes. Submissions, NLP sentiment, and rating scores will stream here in real time.
                      </p>
                    </div>
                  </div>
                ) : (
                  responses.map((resp) => {
                    const isPositive = resp.sentiment === 'positive';
                    const isNegative = resp.sentiment === 'negative';

                    return (
                      <div
                        key={resp.id}
                        className="p-5 rounded-2xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] space-y-3 shadow-xl"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#E1E0CC]">
                              {resp.isAnonymous ? 'Anonymous Respondent' : resp.respondentName}
                            </span>
                            <span className="text-xs font-mono text-[#DEDBC8]/50">
                              • {resp.surveyTitle}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded ${
                                isPositive
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : isNegative
                                  ? 'bg-red-500/10 text-red-400'
                                  : 'bg-white/[0.06] text-[#DEDBC8]'
                              }`}
                            >
                              {resp.sentiment} ({resp.sentimentScore > 0 ? `+${resp.sentimentScore}` : resp.sentimentScore})
                            </span>
                            <span className="text-[10px] font-mono text-[#DEDBC8]/40">
                              {new Date(resp.submittedAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>

                        {resp.keyQuote && (
                          <p className="text-xs sm:text-sm text-[#E1E0CC]/90 leading-relaxed italic bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.06]">
                            "{resp.keyQuote}"
                          </p>
                        )}

                        {/* Answers Breakdown */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2 border-t border-white/[0.04] text-[11px] font-mono text-[#DEDBC8]/70">
                          {resp.answers.map((ans, aIdx) => (
                            <div key={aIdx} className="truncate">
                              <span className="text-white/40">{ans.questionTitle}:</span>{' '}
                              <span className="text-[#E1E0CC] font-bold">
                                {typeof ans.value === 'object' ? JSON.stringify(ans.value) : String(ans.value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'radar' && <IssueRadarView />}
          {activeTab === 'improvements' && <ImprovementTrackerView />}
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'settings' && <SettingsView onSettingsUpdated={setSettings} />}
          {activeTab === 'audit' && <AuditLogView />}
        </main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(tab) => setActiveTab(tab)}
        onOpenBuilder={() => onOpenBuilder(null)}
      />

      {/* QR Share Modal */}
      <QrShareModal
        survey={shareSurvey}
        isOpen={Boolean(shareSurvey)}
        onClose={() => setShareSurvey(null)}
        onTestSurvey={(srv) => {
          setShareSurvey(null);
          onTestSurvey(srv);
        }}
      />
    </div>
  );
};
