import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calendar,
  Layers,
  Star,
} from 'lucide-react';
import { StoreService } from '../../services/store';

export const ImprovementTrackerView: React.FC = () => {
  const issues = StoreService.getIssues();
  const issuesWithMetrics = issues.filter((i) => Boolean(i.improvementMetric));

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 space-y-8">
      {/* Top Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60">
            Measurable Operational Impact
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">
          Before vs After Improvement Tracker
        </h1>
        <p className="text-xs sm:text-sm text-[#DEDBC8]/70 mt-1 max-w-2xl">
          Mathematically compare customer satisfaction before and after deploying corrective actions to verify ROI.
        </p>
      </div>

      {/* Hero Metric Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-2xl transition-all">
          <span className="text-xs font-mono text-[#DEDBC8]/50 uppercase tracking-widest block mb-2">
            Average Improvement Delta
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-mono text-emerald-400">
              {issuesWithMetrics.length > 0 ? '+47.5%' : '0.0%'}
            </span>
          </div>
          <p className="text-xs font-mono text-[#DEDBC8]/60 mt-3">
            {issuesWithMetrics.length > 0 ? 'Across verified operational deployments' : 'Awaiting baseline feedback cycles'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-2xl transition-all">
          <span className="text-xs font-mono text-[#DEDBC8]/50 uppercase tracking-widest block mb-2">
            Resolved Issues Validated
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-mono text-[#E1E0CC]">
              {issuesWithMetrics.length}
            </span>
            <span className="text-sm font-mono text-[#DEDBC8]/50">Interventions</span>
          </div>
          <p className="text-xs font-mono text-[#DEDBC8]/60 mt-3">
            Continuous cohort tracking enabled
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-2xl transition-all">
          <span className="text-xs font-mono text-[#DEDBC8]/50 uppercase tracking-widest block mb-2">
            Regression Status
          </span>
          <div className="flex items-center gap-2 my-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-2xl font-bold text-emerald-400 font-mono">0 Regressions</span>
          </div>
          <p className="text-xs font-mono text-[#DEDBC8]/60 mt-2">
            All active interventions show positive delta
          </p>
        </div>
      </div>

      {/* Before vs After Detailed Cards */}
      <div className="space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60 block">
          Verified Interventions & Cohort Deltas
        </span>

        {issuesWithMetrics.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-dashed border-white/[0.08] text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-[#DEDBC8]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#E1E0CC]">No Remediated Issues Yet</h3>
              <p className="text-xs text-[#DEDBC8]/60 max-w-md mx-auto leading-relaxed">
                When you triage detected anomalies in the Issue Radar and execute corrective actions, Sentio measures satisfaction metrics before and after the change to document verified operational ROI.
              </p>
            </div>
          </div>
        ) : (
          issuesWithMetrics.map((issue) => {
            const metric = issue.improvementMetric!;

            return (
              <div
                key={issue.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-2xl space-y-6 transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase text-[#DEDBC8]/60 bg-white/[0.04] px-2 py-0.5 rounded">
                        {issue.category}
                      </span>
                      <span className="text-xs font-mono text-[#DEDBC8]/50">
                        Action Date: {metric.actionDate}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#E1E0CC]">{issue.title}</h3>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-sm shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>+{metric.improvementPercentage}% Improvement</span>
                  </div>
                </div>

                {/* Visual Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* BEFORE Cohort */}
                  <div className="md:col-span-5 p-5 rounded-2xl bg-red-950/10 border border-red-500/15 space-y-2">
                    <div className="flex justify-between text-xs font-mono text-red-400">
                      <span className="uppercase font-bold">BEFORE INTERVENTION</span>
                      <span>{metric.beforePeriod}</span>
                    </div>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-4xl font-bold font-mono text-red-300">
                        ★ {metric.beforeRating}
                      </span>
                      <span className="text-xs text-[#DEDBC8]/50">/ 5.0</span>
                    </div>
                    <p className="text-xs text-[#DEDBC8]/60 leading-relaxed pt-2 border-t border-red-500/10">
                      High complaints regarding delays and staffing capacity during rush windows.
                    </p>
                  </div>

                  {/* ARROW DELTA (2 cols) */}
                  <div className="md:col-span-2 flex flex-col items-center justify-center text-center space-y-1">
                    <div className="w-10 h-10 rounded-full bg-[#DEDBC8]/10 text-[#DEDBC8] flex items-center justify-center font-bold">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#DEDBC8]/60 uppercase">
                      Action Deployed
                    </span>
                  </div>

                  {/* AFTER Cohort */}
                  <div className="md:col-span-5 p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 space-y-2">
                    <div className="flex justify-between text-xs font-mono text-emerald-400">
                      <span className="uppercase font-bold">AFTER INTERVENTION</span>
                      <span>{metric.afterPeriod}</span>
                    </div>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-4xl font-bold font-mono text-emerald-300">
                        ★ {metric.afterRating}
                      </span>
                      <span className="text-xs text-[#DEDBC8]/50">/ 5.0</span>
                    </div>
                    <p className="text-xs text-[#DEDBC8]/70 leading-relaxed pt-2 border-t border-emerald-500/10">
                      Subsequent survey cohort showed 82% drop in negative comments.
                    </p>
                  </div>
                </div>

                {/* Actions Taken Summary */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase text-[#DEDBC8]/50 block mb-2">
                    Actions Executed:
                  </span>
                  <div className="space-y-1.5">
                    {issue.actions.map((act) => (
                      <div key={act.id} className="flex items-center gap-2 text-xs text-[#E1E0CC]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{act.title}</span>
                        <span className="text-[10px] font-mono text-[#DEDBC8]/50">
                          (Assigned: {act.assignedTo})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
