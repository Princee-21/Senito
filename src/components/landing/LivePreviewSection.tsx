import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Star,
  Smile,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Share2,
  Sparkles,
} from 'lucide-react';

interface LivePreviewSectionProps {
  onEnterApp: (tab?: string) => void;
  onOpenBuilder: () => void;
}

export const LivePreviewSection: React.FC<LivePreviewSectionProps> = ({ onEnterApp, onOpenBuilder }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(5);
  const [selectedMood, setSelectedMood] = useState<number | null>(4);
  const [submittedSim, setSubmittedSim] = useState(false);

  const moods = [
    { label: 'Terrible', emoji: '😞', score: 1 },
    { label: 'Poor', emoji: '🙁', score: 2 },
    { label: 'Okay', emoji: '😐', score: 3 },
    { label: 'Good', emoji: '🙂', score: 4 },
    { label: 'Delighted', emoji: '🤩', score: 5 },
  ];

  return (
    <section id="radar" className="relative py-28 px-6 bg-[#08090c] text-[#E1E0CC] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#DEDBC8]/70 mb-4">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Live Environment</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#E1E0CC] mb-4">
            Experience the workflow in action.
          </h2>
          <p className="text-sm sm:text-base text-[#DEDBC8]/60">
            See how real respondent feedback instantly updates the Feedback Pulse score and triggers Issue Radar triage.
          </p>
        </div>

        {/* Interactive Sandbox Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Respondent Widget Simulation (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#111319] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono tracking-widest text-[#DEDBC8]/50 uppercase">
                  Live Respondent Experience
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              <div className="text-base sm:text-lg font-bold text-[#E1E0CC] mb-1">
                Customer Experience Pulse
              </div>
              <p className="text-xs text-[#DEDBC8]/60 mb-6">
                How was the speed and responsiveness of our platform today?
              </p>

              {/* Mood Selector */}
              <div className="mb-6">
                <label className="text-[11px] font-mono text-[#DEDBC8]/50 uppercase tracking-wider block mb-3">
                  1. Overall Impression
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {moods.map((m) => {
                    const isSelected = selectedMood === m.score;
                    return (
                      <button
                        key={m.score}
                        onClick={() => setSelectedMood(m.score)}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#DEDBC8] text-black border-[#DEDBC8] scale-105 shadow-md'
                            : 'bg-white/[0.02] border-white/[0.08] text-[#E1E0CC] hover:bg-white/[0.06]'
                        }`}
                      >
                        <span className="text-xl mb-1">{m.emoji}</span>
                        <span className="text-[9px] font-mono tracking-tight font-medium truncate w-full text-center">
                          {m.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Star Rating */}
              <div className="mb-6">
                <label className="text-[11px] font-mono text-[#DEDBC8]/50 uppercase tracking-wider block mb-3">
                  2. Quality Score (1 to 5 Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (selectedRating || 0) >= star;
                    return (
                      <button
                        key={star}
                        onClick={() => setSelectedRating(star)}
                        className="p-1 text-2xl transition-transform hover:scale-125 cursor-pointer text-[#DEDBC8]"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            isFilled
                              ? 'fill-[#DEDBC8] text-[#DEDBC8]'
                              : 'text-white/20 hover:text-[#DEDBC8]/60'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-3 font-mono text-xs text-[#DEDBC8]/70">
                    {selectedRating ? `${selectedRating}/5.0` : 'Select'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => setSubmittedSim(true)}
                className="w-full py-3 bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-medium text-xs font-mono tracking-wider uppercase rounded-xl transition-all shadow-md shadow-[#DEDBC8]/10 cursor-pointer"
              >
                {submittedSim ? '✓ Response Synchronized' : 'Simulate Submission'}
              </button>
              {submittedSim && (
                <p className="text-[11px] font-mono text-emerald-400 text-center mt-2">
                  Feedback recorded. Pulse score recalculated in real time.
                </p>
              )}
            </div>
          </div>

          {/* Right: Live Dashboard & Issue Radar Snapshot (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top row: Pulse Metric & Sentiment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Feedback Pulse Score */}
              <div className="rounded-3xl p-6 bg-[#111319] border border-white/[0.08] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#DEDBC8]/50 uppercase tracking-widest">
                    Feedback Pulse™
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-medium">
                    Healthy
                  </span>
                </div>
                <div className="flex items-baseline gap-3 my-2">
                  <span className="text-5xl sm:text-6xl font-bold font-mono text-[#E1E0CC]">84</span>
                  <span className="text-sm font-mono text-[#DEDBC8]/50">/ 100</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+8.4% this month</span>
                </div>
              </div>

              {/* Sentiment Distribution */}
              <div className="rounded-3xl p-6 bg-[#111319] border border-white/[0.08] flex flex-col justify-between">
                <span className="text-xs font-mono text-[#DEDBC8]/50 uppercase tracking-widest mb-4">
                  Sentiment Breakdown
                </span>
                <div className="space-y-2.5 my-1">
                  <div>
                    <div className="flex justify-between text-xs font-mono text-[#E1E0CC] mb-1">
                      <span>Positive</span>
                      <span className="text-emerald-400 font-bold">72%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-[72%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-mono text-[#E1E0CC] mb-1">
                      <span>Neutral</span>
                      <span className="text-[#DEDBC8]/70">18%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-[#DEDBC8]/60 rounded-full w-[18%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-mono text-[#E1E0CC] mb-1">
                      <span>Negative / Issues</span>
                      <span className="text-red-400">10%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full w-[10%]" />
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#DEDBC8]/40 mt-3">
                  Across 304 verified submissions
                </div>
              </div>
            </div>

            {/* Bottom: Issue Radar Snapshot */}
            <div className="rounded-3xl p-6 sm:p-7 bg-[#111319] border border-white/[0.08]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E1E0CC] font-semibold">
                    Issue Radar Active Alert
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono font-medium border border-amber-500/20">
                  Action Taken
                </span>
              </div>

              <div className="text-sm sm:text-base font-bold text-[#E1E0CC] mb-1">
                Peak Hours Service Bottleneck
              </div>
              <p className="text-xs text-[#DEDBC8]/70 mb-4 leading-relaxed">
                "Waited 35 minutes for main course during rush hour. Staff seemed overwhelmed."
              </p>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#DEDBC8]/10 text-[#DEDBC8] flex items-center justify-center font-mono text-xs font-bold">
                    Δ
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#E1E0CC]">
                      Before vs After Validation
                    </div>
                    <div className="text-[11px] text-[#DEDBC8]/50">
                      Rating surged from 2.3 → 3.8 after extra staffing
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  +65% Delta
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => onEnterApp('radar')}
                  className="text-xs font-mono text-[#DEDBC8] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Full Issue Radar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onEnterApp('overview')}
                  className="text-xs font-mono text-[#DEDBC8]/60 hover:text-[#DEDBC8] cursor-pointer"
                >
                  Enter Full Dashboard →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
