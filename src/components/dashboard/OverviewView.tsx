import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  Star,
  Users,
  CheckCircle2,
  Plus,
  ArrowRight,
  Sparkles,
  QrCode,
  Layers,
  MessageSquare,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { StoreService } from '../../services/store';
import { Survey, Issue, SurveyResponse } from '../../types';
import { QrShareModal } from '../share/QrShareModal';

interface OverviewViewProps {
  onOpenBuilder: () => void;
  onNavigateTab: (tab: string) => void;
  onTestSurvey: (survey: Survey) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onOpenBuilder,
  onNavigateTab,
  onTestSurvey,
}) => {
  const pulse = StoreService.getFeedbackPulse();
  const surveys = StoreService.getSurveys();
  const issues = StoreService.getIssues();
  const responses = StoreService.getResponses();

  const [shareSurvey, setShareSurvey] = useState<Survey | null>(null);

  const activeIssues = issues.filter((i) => i.status !== 'resolved');
  const resolvedIssues = issues.filter((i) => i.status === 'resolved' || i.status === 'action_taken');

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6 sm:p-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60">
              Live Operations Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">
            Feedback & Performance Radar
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('radar')}
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-xl border border-white/[0.15] text-xs font-mono text-[#DEDBC8] flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-black/20"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Issue Radar ({activeIssues.length})</span>
          </button>

          <button
            onClick={onOpenBuilder}
            className="px-5 py-2 rounded-xl bg-[#DEDBC8]/20 hover:bg-[#DEDBC8]/30 backdrop-blur-xl border border-[#DEDBC8]/50 text-[#E1E0CC] hover:text-white font-medium text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-[#DEDBC8]/10 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Survey</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. Feedback Pulse Score */}
        <div className="p-6 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#090b10]/45 shadow-2xl transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-xs font-mono text-[#DEDBC8]/50 uppercase tracking-widest">
              Feedback Pulse™
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-medium border border-emerald-500/20">
              {pulse.status}
            </span>
          </div>
          <div className="flex items-baseline gap-2 my-2 relative z-10">
            <span className="text-5xl font-bold font-mono text-[#E1E0CC]">{pulse.score}</span>
            <span className="text-sm font-mono text-[#DEDBC8]/50">/ 100</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono relative z-10">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{pulse.trendPercentage}% continuous trend</span>
          </div>
        </div>

        {/* 2. Average Overall Rating */}
        <div className="p-6 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#090b10]/45 shadow-2xl transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#DEDBC8]/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-xs font-mono text-[#DEDBC8]/50 uppercase tracking-widest">
              Overall Rating
            </span>
            <div className="flex text-[#DEDBC8]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 fill-[#DEDBC8]" />
              ))}
            </div>
          </div>
          <div className="flex items-baseline gap-2 my-2 relative z-10">
            <span className="text-5xl font-bold font-mono text-[#E1E0CC]">{pulse.averageRating}</span>
            <span className="text-sm font-mono text-[#DEDBC8]/50">/ 5.0</span>
          </div>
          <span className="text-xs font-mono text-[#DEDBC8]/50 relative z-10">
            Across {pulse.totalResponses} verified responses
          </span>
        </div>

        {/* 3. Sentiment Breakdown */}
        <div className="p-6 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#090b10]/45 shadow-2xl transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
          <span className="text-xs font-mono text-[#DEDBC8]/50 uppercase tracking-widest mb-3 relative z-10">
            Sentiment Ratio
          </span>
          <div className="space-y-2 my-1 relative z-10">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold">Positive {pulse.positivePercentage}%</span>
              <span className="text-amber-300">Neutral {pulse.neutralPercentage}%</span>
              <span className="text-red-400">Issues {pulse.negativePercentage}%</span>
            </div>
            <div className="h-2 w-full bg-white/[0.06] rounded-full flex overflow-hidden">
              <div style={{ width: `${pulse.positivePercentage}%` }} className="h-full bg-emerald-400" />
              <div style={{ width: `${pulse.neutralPercentage}%` }} className="h-full bg-amber-400" />
              <div style={{ width: `${pulse.negativePercentage}%` }} className="h-full bg-red-400" />
            </div>
          </div>
          <span className="text-xs font-mono text-[#DEDBC8]/50 mt-2 relative z-10">
            Real-time NLP sentiment engine
          </span>
        </div>

        {/* 4. Active Issues & Actions */}
        <div className="p-6 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#090b10]/45 shadow-2xl transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-xs font-mono text-[#DEDBC8]/50 uppercase tracking-widest">
              Issue Radar
            </span>
            <span className="p-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 my-2 relative z-10">
            <span className="text-5xl font-bold font-mono text-amber-300">{activeIssues.length}</span>
            <span className="text-sm font-mono text-[#DEDBC8]/50">Active Triages</span>
          </div>
          <button
            onClick={() => onNavigateTab('improvements')}
            className="text-xs font-mono text-[#DEDBC8] hover:underline flex items-center gap-1 cursor-pointer relative z-10"
          >
            <span>{resolvedIssues.length} improvements verified</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Grid: Campaigns & Recent Feedback Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Campaigns (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-2xl transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#DEDBC8]" />
                <h3 className="text-base font-bold text-[#E1E0CC]">Active Survey Campaigns</h3>
              </div>
              <button
                onClick={onOpenBuilder}
                className="text-xs font-mono text-[#DEDBC8] hover:underline cursor-pointer"
              >
                + Create New
              </button>
            </div>

            <div className="space-y-3.5">
              {surveys.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.08] text-center space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-[#DEDBC8]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#E1E0CC]">No Survey Campaigns Yet</h4>
                    <p className="text-xs text-[#DEDBC8]/60 max-w-sm mx-auto mt-1 leading-relaxed">
                      Launch your first customer pulse survey or load an industry template to start gathering feedback via QR codes and web links.
                    </p>
                  </div>
                  <button
                    onClick={onOpenBuilder}
                    className="px-4 py-2 rounded-xl bg-[#DEDBC8]/20 hover:bg-[#DEDBC8]/30 backdrop-blur-md border border-[#DEDBC8]/40 text-[#E1E0CC] hover:text-white text-xs font-mono font-medium transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>+ Create Your First Survey</span>
                  </button>
                </div>
              ) : (
                surveys.map((survey) => (
                  <div
                    key={survey.id}
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] backdrop-blur-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase text-[#DEDBC8]/60 bg-white/[0.04] px-2 py-0.5 rounded">
                          {survey.industry}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {survey.status}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-[#E1E0CC]">{survey.title}</div>
                      <div className="flex items-center gap-4 text-xs font-mono text-[#DEDBC8]/50">
                        <span>{survey.totalResponses} Responses</span>
                        <span>•</span>
                        <span>★ {survey.averageRating} Avg Rating</span>
                        <span>•</span>
                        <span>Pulse: {survey.feedbackPulseScore}/100</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setShareSurvey(survey)}
                        className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md border border-white/[0.1] text-[#DEDBC8] transition-all cursor-pointer"
                        title="Share QR Code"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onTestSurvey(survey)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/[0.15] text-[#E1E0CC] hover:text-white text-xs font-mono font-medium transition-all cursor-pointer"
                      >
                        Test Survey
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.06] mt-6 flex items-center justify-between text-xs font-mono text-[#DEDBC8]/50">
            <span>{surveys.length} campaigns active</span>
            <button
              onClick={() => onNavigateTab('surveys')}
              className="text-[#DEDBC8] hover:underline cursor-pointer"
            >
              Manage all campaigns →
            </button>
          </div>
        </div>

        {/* Recent Feedback Feed & Quotes (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-2xl transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#DEDBC8]" />
                <h3 className="text-base font-bold text-[#E1E0CC]">Live Feedback Stream</h3>
              </div>
              <span className="text-xs font-mono text-[#DEDBC8]/50">Auto-Refreshed</span>
            </div>

            <div className="space-y-3.5">
              {responses.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.08] text-center space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-[#DEDBC8]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#E1E0CC]">Waiting for Responses</h4>
                    <p className="text-xs text-[#DEDBC8]/60 max-w-xs mx-auto mt-1 leading-relaxed">
                      As soon as customers or team members submit feedback through your survey links, live comments and NLP sentiment will stream here.
                    </p>
                  </div>
                </div>
              ) : (
                responses.slice(0, 4).map((resp) => {
                  const isPositive = resp.sentiment === 'positive';
                  const isNegative = resp.sentiment === 'negative';

                  return (
                    <div
                      key={resp.id}
                      className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] backdrop-blur-md transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#E1E0CC]">
                          {resp.isAnonymous ? 'Anonymous Respondent' : resp.respondentName}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                            isPositive
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : isNegative
                              ? 'bg-red-500/10 text-red-400'
                              : 'bg-white/[0.06] text-[#DEDBC8]'
                          }`}
                        >
                          {resp.sentiment}
                        </span>
                      </div>

                      <p className="text-xs text-[#DEDBC8]/80 leading-relaxed italic">
                        "{resp.keyQuote || 'Verified rating submitted for campaign evaluation.'}"
                      </p>

                      <div className="flex items-center justify-between text-[10px] font-mono text-[#DEDBC8]/50 pt-1">
                        <span>{resp.surveyTitle}</span>
                        <span>{new Date(resp.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/[0.06] text-center">
            <button
              onClick={() => onNavigateTab('feed')}
              className="text-xs font-mono text-[#DEDBC8] hover:underline cursor-pointer"
            >
              View all {responses.length} responses →
            </button>
          </div>
        </div>
      </div>

      {/* Before vs After Improvement Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14161f]/25 via-[#101217]/15 to-[#14161f]/25 backdrop-blur-2xl border border-[#DEDBC8]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#DEDBC8]/10 text-[#DEDBC8]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8] font-bold">
              Continuous Improvement Delta
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#E1E0CC]">
            {resolvedIssues.length > 0
              ? 'Active corrective actions improving customer satisfaction'
              : 'Continuous improvement & closed-loop remediation ready'}
          </h3>
          <p className="text-xs text-[#DEDBC8]/70 leading-relaxed">
            {resolvedIssues.length > 0
              ? `${resolvedIssues.length} resolved operational bottlenecks verified across recent feedback cycles.`
              : 'When issues are identified from customer feedback, Sentio tracks corrective actions and compares before-and-after satisfaction scores.'}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab(resolvedIssues.length > 0 ? 'improvements' : 'surveys')}
          className="px-6 py-3 rounded-2xl bg-[#DEDBC8]/20 hover:bg-[#DEDBC8]/30 backdrop-blur-xl border border-[#DEDBC8]/50 text-[#E1E0CC] hover:text-white font-medium text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-lg shadow-[#DEDBC8]/10"
        >
          <span>{resolvedIssues.length > 0 ? 'Explore Improvement Metrics' : 'Create First Survey'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

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
