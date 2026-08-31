import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Sparkles,
  BarChart3,
  AlertOctagon,
  TrendingUp,
  QrCode,
  ShieldCheck,
  CheckCircle,
  Sliders,
  ArrowRight,
} from 'lucide-react';

interface FeaturesGridProps {
  onOpenBuilder: () => void;
  onEnterApp: (tab?: string) => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onOpenBuilder, onEnterApp }) => {
  const cards = [
    {
      num: '01',
      tag: 'BUILD',
      title: 'Adaptive Survey Engineering',
      desc: 'Build frictionless feedback experiences in seconds. Drag-and-drop 11 question types, configure conditional branching logic, and distribute via custom QR codes.',
      icon: Layers,
      features: [
        '11 specialized question types (NPS, CSAT, Emoji, Likert, Stars)',
        'Dynamic conditional branching (IF rating <= 2 THEN ask why)',
        '10 pre-engineered industry templates & instant QR sharing',
      ],
      actionLabel: 'Launch Builder',
      action: onOpenBuilder,
    },
    {
      num: '02',
      tag: 'UNDERSTAND',
      title: 'Feedback Pulse & Deep NLP',
      desc: 'Move past superficial averages. Sentio continuously computes a comprehensive 0-100 Pulse Score with NLP sentiment modeling and auto-topic clustering.',
      icon: BarChart3,
      features: [
        'Single 0–100 Pulse health index with sentiment radar',
        'Automatic topic detection (e.g. Waiting Time, Pricing, Staff)',
        'Clean multi-dimensional rating breakdowns & CSV export',
      ],
      actionLabel: 'View Pulse Demo',
      action: () => onEnterApp('overview'),
    },
    {
      num: '03',
      tag: 'ACT',
      title: 'Automated Issue Radar',
      desc: 'Negative signals don’t get lost. Low ratings and critical mentions are automatically triaged onto the Issue Radar with owner assignments and SLA tracking.',
      icon: AlertOctagon,
      features: [
        'Real-time anomaly clustering for negative feedback quotes',
        'Direct owner assignment and corrective action milestones',
        'Complete chronological status transition history',
      ],
      actionLabel: 'Open Issue Radar',
      action: () => onEnterApp('radar'),
    },
    {
      num: '04',
      tag: 'IMPROVE',
      title: 'Before vs After Improvement Metric',
      desc: 'Prove that your operational interventions created measurable results. Mathematically track rating deltas before and after corrective actions were deployed.',
      icon: TrendingUp,
      features: [
        'Before vs After rating trend comparisons',
        'Verified improvement delta badges (+65% rating surge)',
        'Complete workspace audit log for enterprise accountability',
      ],
      actionLabel: 'Track Improvements',
      action: () => onEnterApp('improvements'),
    },
  ];

  return (
    <section id="features" className="relative py-28 px-6 bg-black text-[#E1E0CC]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#DEDBC8]/70 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span>Four Pillars of Feedback Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#E1E0CC] mb-4">
            Engineered for clarity at every stage.
          </h2>
          <p className="text-sm sm:text-base text-[#DEDBC8]/60">
            From the initial question design to quantifiable operational ROI, every tool is designed to work as one unified system.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-3xl p-8 sm:p-10 bg-[#101115] hover:bg-[#15171d] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle card glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#DEDBC8]/[0.02] group-hover:bg-[#DEDBC8]/[0.05] rounded-full blur-3xl transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-black bg-[#DEDBC8] px-2.5 py-1 rounded-md tracking-wider">
                        {card.num}
                      </span>
                      <span className="font-mono text-xs text-[#DEDBC8]/60 uppercase tracking-widest">
                        {card.tag}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#DEDBC8] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC] mb-4 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#DEDBC8]/70 leading-relaxed mb-8">
                    {card.desc}
                  </p>

                  {/* Feature checklist */}
                  <div className="space-y-2.5 mb-10">
                    {card.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#E1E0CC]/80">
                        <CheckCircle className="w-3.5 h-3.5 text-[#DEDBC8] mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={card.action}
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#DEDBC8] hover:text-white transition-colors cursor-pointer group/btn"
                  >
                    <span>{card.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[11px] font-mono text-[#DEDBC8]/40">Production Ready</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
