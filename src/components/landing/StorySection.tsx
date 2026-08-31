import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Activity, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export const StorySection: React.FC = () => {
  const steps = [
    { num: '01', title: 'Feedback', desc: 'Engaging, frictionless respondent experience across mobile & desktop.' },
    { num: '02', title: 'Rating', desc: 'Quantified multi-dimensional scoring (NPS, CSAT, CES, Stars, Emojis).' },
    { num: '03', title: 'Insight', desc: 'Real-time NLP sentiment analysis & recurring topic extraction.' },
    { num: '04', title: 'Issue', desc: 'Auto-clustering pain points on the Issue Radar with severity scores.' },
    { num: '05', title: 'Action', desc: 'Assigning corrective tasks to operational teams with SLAs.' },
    { num: '06', title: 'Improvement', desc: 'Measuring Before vs After rating deltas to verify real impact.' },
  ];

  return (
    <section id="lifecycle" className="relative py-28 px-6 bg-[#0c0d10] text-[#E1E0CC] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#DEDBC8]/70 mb-4">
            <Activity className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span>The Closed-Loop Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#E1E0CC] leading-tight mb-6">
            Most survey tools stop when someone clicks <span className="font-serif italic font-normal text-[#DEDBC8]">Submit.</span>{' '}
            We don't.
          </h2>

          <p className="text-base sm:text-lg text-[#DEDBC8]/70 leading-relaxed">
            Collecting responses is only 20% of the equation. True operational excellence comes from identifying root causes, taking measurable action, and proving that your fixes actually improved ratings.
          </p>
        </div>

        {/* 6-Step Closed Loop Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#DEDBC8]/40 group-hover:text-[#DEDBC8] transition-colors">
                  {step.num}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#DEDBC8]/30 group-hover:bg-[#DEDBC8] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#E1E0CC] mb-2 tracking-tight flex items-center gap-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#DEDBC8]/60 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contrast Table: Traditional vs Sentio */}
        <div className="rounded-3xl bg-[#111217] border border-white/[0.08] p-8 sm:p-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#DEDBC8]/5 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-xl sm:text-2xl font-bold text-[#E1E0CC] mb-8 flex items-center gap-3">
            <span>Why Conventional Survey Tools Fail You</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="space-y-4 p-6 rounded-2xl bg-red-950/10 border border-red-500/15">
              <div className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                <span>The Dead-End Paradigm</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#E1E0CC]/70">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Responses sit in a static spreadsheet with no owner or follow-up.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Critical complaints are buried in thousands of open-text rows.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">•</span>
                  <span>No one knows if team changes resolved customer dissatisfaction.</span>
                </li>
              </ul>
            </div>

            {/* The Sentio Way */}
            <div className="space-y-4 p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Sentio Intelligence Engine</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#E1E0CC]/80">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Real-time Issue Radar groups low ratings and negative sentiment automatically.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Corrective actions are assigned with accountability timelines and audit logs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Before vs After delta tracker mathematically validates that ratings improved.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
