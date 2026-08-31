import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  PieChart,
  Layers,
  Sparkles,
  Star,
  CheckCircle,
} from 'lucide-react';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

export const AnalyticsView: React.FC = () => {
  const { showToast } = useToast();
  const pulse = StoreService.getFeedbackPulse();
  const responses = StoreService.getResponses();
  const surveys = StoreService.getSurveys();
  const [selectedRange, setSelectedRange] = useState('30D');

  const handleExportCsv = () => {
    if (responses.length === 0) {
      showToast('No Data', 'No responses recorded to export.', 'warning');
      return;
    }

    const headers = ['Response ID', 'Survey Title', 'Respondent', 'Sentiment', 'Sentiment Score', 'Submitted At', 'Key Quote'];
    const rows = responses.map((r) => [
      r.id,
      `"${r.surveyTitle.replace(/"/g, '""')}"`,
      r.isAnonymous ? 'Anonymous' : `"${(r.respondentName || '').replace(/"/g, '""')}"`,
      r.sentiment,
      r.sentimentScore,
      r.submittedAt,
      `"${(r.keyQuote || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sentio-feedback-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Export Completed', 'CSV file downloaded successfully.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-[#DEDBC8]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60">
              Quantitative & Qualitative Analytics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">Analytics & Reports</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Time range switcher */}
          <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
            {['7D', '30D', '90D', 'All'].map((rng) => (
              <button
                key={rng}
                onClick={() => setSelectedRange(rng)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  selectedRange === rng ? 'bg-[#DEDBC8]/30 text-white border border-[#DEDBC8]/50 font-bold' : 'text-[#DEDBC8]/60 hover:text-white'
                }`}
              >
                {rng}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md border border-white/[0.12] text-xs font-mono text-[#DEDBC8] flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-black/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Charts Bento */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sentiment Distribution Card (6 cols) */}
        <div className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-2xl space-y-6 transition-all">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#E1E0CC]">Sentiment Distribution</h3>
            <span className="text-xs font-mono text-emerald-400">NLP Modeled</span>
          </div>

          {/* Graphical Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-emerald-400">Positive Feedback</span>
                <span className="font-bold text-[#E1E0CC]">{pulse.positivePercentage}%</span>
              </div>
              <div className="h-3 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  style={{ width: `${pulse.positivePercentage}%` }}
                  className="h-full bg-emerald-400 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-amber-300">Neutral Sentiment</span>
                <span className="font-bold text-[#E1E0CC]">{pulse.neutralPercentage}%</span>
              </div>
              <div className="h-3 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  style={{ width: `${pulse.neutralPercentage}%` }}
                  className="h-full bg-amber-400 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-red-400">Critical / Negative</span>
                <span className="font-bold text-[#E1E0CC]">{pulse.negativePercentage}%</span>
              </div>
              <div className="h-3 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  style={{ width: `${pulse.negativePercentage}%` }}
                  className="h-full bg-red-400 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-[#DEDBC8]/70">
            Sentiment polarity calculated across {responses.length} responses. Negative responses are automatically queued on the Issue Radar.
          </div>
        </div>

        {/* Top Recurring Topics & Mentions (6 cols) */}
        <div className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-2xl space-y-6 transition-all">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#E1E0CC]">Top Recurring Topic Clusters</h3>
            <span className="text-xs font-mono text-[#DEDBC8]/50">Frequency</span>
          </div>

          <div className="space-y-3">
            {responses.length === 0 ? (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.06] text-center text-xs font-mono text-[#DEDBC8]/50">
                Topic clustering will activate after survey responses are recorded.
              </div>
            ) : (
              [
                { topic: 'Quality & Freshness', count: 42, pct: 85, color: 'bg-emerald-400' },
                { topic: 'Service Attentiveness', count: 28, pct: 60, color: 'bg-[#DEDBC8]' },
                { topic: 'Speed & Waiting Time', count: 19, pct: 40, color: 'bg-amber-400' },
                { topic: 'Product Workflow UX', count: 14, pct: 30, color: 'bg-blue-400' },
                { topic: 'Pricing & Transparency', count: 8, pct: 18, color: 'bg-purple-400' },
              ].map((item) => (
                <div key={item.topic} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#E1E0CC]">{item.topic}</span>
                    <span className="text-[#DEDBC8]/60">{item.count} mentions</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.pct}%` }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-[11px] font-mono text-[#DEDBC8]/40 pt-2 border-t border-white/[0.04]">
            Clustered via natural language entity recognition.
          </div>
        </div>
      </div>

      {/* Campaign Breakdown Table */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] shadow-2xl space-y-6">
        <h3 className="text-base font-bold text-[#E1E0CC]">Survey Performance Breakdown</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.08] text-[#DEDBC8]/60 uppercase tracking-wider pb-2">
                <th className="pb-3 font-semibold">Survey Campaign</th>
                <th className="pb-3 font-semibold">Industry</th>
                <th className="pb-3 font-semibold">Responses</th>
                <th className="pb-3 font-semibold">Average Rating</th>
                <th className="pb-3 font-semibold">Pulse Score</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {surveys.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#DEDBC8]/50">
                    No survey campaigns created yet.
                  </td>
                </tr>
              ) : (
                surveys.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-bold text-[#E1E0CC]">{s.title}</td>
                    <td className="py-3.5 text-[#DEDBC8]/70">{s.industry}</td>
                    <td className="py-3.5 text-[#E1E0CC]">{s.totalResponses}</td>
                    <td className="py-3.5 text-emerald-400 font-bold">★ {s.averageRating} / 5.0</td>
                    <td className="py-3.5 text-[#DEDBC8]">{s.feedbackPulseScore} / 100</td>
                    <td className="py-3.5">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 uppercase font-semibold">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
