import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Clock,
  User,
  Plus,
  ArrowRight,
  TrendingUp,
  X,
  Filter,
  Check,
  ChevronRight,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { StoreService } from '../../services/store';
import { IntelligenceService } from '../../services/intelligence';
import { Issue, IssueStatus, IssueSeverity, ActionItem } from '../../types';
import { useToast } from '../common/Toast';

export const IssueRadarView: React.FC = () => {
  const { showToast } = useToast();
  const [issues, setIssues] = useState<Issue[]>(() => StoreService.getIssues());
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(issues[0]?.id || null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  // New action modal / inputs
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionAssignee, setNewActionAssignee] = useState('Sarah Jenkins');

  const selectedIssue = issues.find((i) => i.id === selectedIssueId);

  const reloadIssues = () => {
    setIssues(StoreService.getIssues());
  };

  const handleStatusChange = (issueId: string, newStatus: IssueStatus) => {
    const updated = StoreService.updateIssue(issueId, { status: newStatus }, 'Sarah Jenkins');
    if (updated) {
      reloadIssues();
      showToast('Status Updated', `Issue status changed to "${newStatus.replace(/_/g, ' ')}".`, 'success');
    }
  };

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssueId || !newActionTitle.trim()) return;

    StoreService.addActionToIssue(selectedIssueId, newActionTitle.trim(), newActionAssignee);
    setNewActionTitle('');
    reloadIssues();
    showToast('Action Item Assigned', `Task assigned to ${newActionAssignee}.`, 'success');
  };

  const handleToggleAction = (issueId: string, actionId: string, currentStatus: string) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;

    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const updatedActions = issue.actions.map((a) =>
      a.id === actionId ? { ...a, status: newStatus as any, completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined } : a
    );

    StoreService.updateIssue(issueId, { actions: updatedActions }, 'Sarah Jenkins');
    reloadIssues();
    showToast('Action Updated', `Action item marked as ${newStatus}.`, 'info');
  };

  const filteredIssues = issues.filter((i) => {
    const matchesStatus = statusFilter === 'all' || i.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || i.severity === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const getSeverityBadge = (severity: IssueSeverity) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-mono font-bold border border-red-500/20">CRITICAL</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold border border-amber-500/20">HIGH</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-300 text-[10px] font-mono font-bold border border-yellow-500/20">MEDIUM</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-[10px] font-mono font-bold border border-blue-500/20">LOW</span>;
    }
  };

  const getStatusBadge = (status: IssueStatus) => {
    switch (status) {
      case 'resolved':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-semibold">Resolved</span>;
      case 'action_taken':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#DEDBC8]/15 text-[#DEDBC8] text-[10px] font-mono font-semibold">Action Taken</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono font-semibold">In Progress</span>;
      case 'under_review':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono font-semibold">Under Review</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-mono font-semibold">New Anomaly</span>;
    }
  };

  const suggestedActions = selectedIssue
    ? IntelligenceService.getSuggestedActions(selectedIssue.category, selectedIssue.title)
    : [];

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60">
              Automated Problem Detection & Resolution
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">Issue Radar</h1>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-white/[0.03] p-1 rounded-xl border border-white/[0.08]">
            {['all', 'new', 'in_progress', 'action_taken', 'resolved'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-colors cursor-pointer ${
                  statusFilter === st ? 'bg-[#DEDBC8] text-black font-bold' : 'text-[#DEDBC8]/60 hover:text-white'
                }`}
              >
                {st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Left Issue Cards, Right Detail Drawer */}
      {issues.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-dashed border-white/[0.08] text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#E1E0CC]">No Operational Bottlenecks Detected</h3>
            <p className="text-xs text-[#DEDBC8]/60 max-w-md mx-auto leading-relaxed">
              All feedback signals and survey metrics are currently operating within healthy thresholds. If recurring negative patterns or anomalies are detected in survey submissions, Sentio will automatically flag and cluster them here for remediation.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Issue List (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60 block mb-2">
              Detected Issues ({filteredIssues.length})
            </span>

            {filteredIssues.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.06] text-center text-xs font-mono text-[#DEDBC8]/50">
                No issues match the selected filter.
              </div>
            ) : (
              filteredIssues.map((issue) => {
                const isSelected = selectedIssueId === issue.id;

                return (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer backdrop-blur-2xl ${
                      isSelected
                        ? 'bg-[#DEDBC8]/15 border-[#DEDBC8]/40 shadow-xl shadow-black/40'
                        : 'bg-[#090b10]/30 border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.14]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(issue.severity)}
                        <span className="text-[10px] font-mono text-[#DEDBC8]/50 uppercase">
                          {issue.category}
                        </span>
                      </div>
                      {getStatusBadge(issue.status)}
                    </div>

                    <h3 className="text-base font-bold text-[#E1E0CC] mb-1.5 leading-snug">
                      {issue.title}
                    </h3>
                    <p className="text-xs text-[#DEDBC8]/70 line-clamp-2 leading-relaxed mb-4">
                      {issue.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] text-[11px] font-mono text-[#DEDBC8]/50">
                      <span>{issue.mentionsCount} Mentions • ★ {issue.averageRating}</span>
                      <span className="flex items-center gap-1 text-[#DEDBC8]">
                        Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        {/* Right: Selected Issue Detail & Corrective Action Workflow (7 cols) */}
        <div className="lg:col-span-7">
          {selectedIssue ? (
            <div className="rounded-3xl p-6 sm:p-8 bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] shadow-2xl space-y-6">
              {/* Top Header of Issue */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {getSeverityBadge(selectedIssue.severity)}
                    <span className="text-xs font-mono uppercase text-[#DEDBC8]/60">
                      {selectedIssue.category}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#E1E0CC]">
                    {selectedIssue.title}
                  </h2>
                </div>

                {/* Status Switcher Dropdown */}
                <div className="shrink-0">
                  <label className="text-[10px] font-mono uppercase text-[#DEDBC8]/50 block mb-1">
                    Workflow Status
                  </label>
                  <select
                    value={selectedIssue.status}
                    onChange={(e) => handleStatusChange(selectedIssue.id, e.target.value as IssueStatus)}
                    className="text-xs font-mono bg-[#181a24] border border-white/[0.12] rounded-xl px-3 py-1.5 text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
                  >
                    <option value="new">New Anomaly</option>
                    <option value="under_review">Under Review</option>
                    <option value="in_progress">In Progress</option>
                    <option value="action_taken">Action Taken</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Description & Impact Metrics */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <p className="text-xs sm:text-sm text-[#E1E0CC]/90 leading-relaxed">
                  {selectedIssue.description}
                </p>
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.04] text-xs font-mono">
                  <div>
                    <span className="text-[#DEDBC8]/50 block text-[10px]">Mentions</span>
                    <span className="font-bold text-[#E1E0CC]">{selectedIssue.mentionsCount} respondents</span>
                  </div>
                  <div>
                    <span className="text-[#DEDBC8]/50 block text-[10px]">Average Rating</span>
                    <span className="font-bold text-red-400">★ {selectedIssue.averageRating} / 5.0</span>
                  </div>
                  <div>
                    <span className="text-[#DEDBC8]/50 block text-[10px]">Owner</span>
                    <span className="font-bold text-[#DEDBC8]">{selectedIssue.owner}</span>
                  </div>
                </div>
              </div>

              {/* Related Feedback Quotes */}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60 block mb-3">
                  Verbatim Customer Quotes ({selectedIssue.relatedQuotes.length})
                </span>
                <div className="space-y-2.5">
                  {selectedIssue.relatedQuotes.map((quote, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs space-y-1"
                    >
                      <p className="italic text-[#E1E0CC]/90">"{quote.text}"</p>
                      <div className="flex justify-between text-[10px] font-mono text-[#DEDBC8]/50">
                        <span>★ {quote.rating || 2}/5</span>
                        <span>{quote.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corrective Actions Section */}
              <div className="pt-4 border-t border-white/[0.06] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60">
                    Corrective Actions ({selectedIssue.actions.length})
                  </span>
                </div>

                {/* Actions list */}
                <div className="space-y-2">
                  {selectedIssue.actions.map((act) => (
                    <div
                      key={act.id}
                      onClick={() => handleToggleAction(selectedIssue.id, act.id, act.status)}
                      className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                            act.status === 'completed'
                              ? 'bg-emerald-500 border-emerald-500 text-black'
                              : 'border-white/30'
                          }`}
                        >
                          {act.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div
                            className={`text-xs font-medium ${
                              act.status === 'completed'
                                ? 'line-through text-white/40'
                                : 'text-[#E1E0CC]'
                            }`}
                          >
                            {act.title}
                          </div>
                          {act.description && (
                            <div className="text-[11px] text-[#DEDBC8]/50 mt-0.5">
                              {act.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#DEDBC8]/50 shrink-0">
                        {act.assignedTo}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add new action form */}
                <form onSubmit={handleAddAction} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="New corrective action item..."
                    value={newActionTitle}
                    onChange={(e) => setNewActionTitle(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-[#E1E0CC] placeholder:text-white/30 focus:outline-none focus:border-[#DEDBC8]"
                  />
                  <input
                    type="text"
                    placeholder="Assignee"
                    value={newActionAssignee}
                    onChange={(e) => setNewActionAssignee(e.target.value)}
                    className="w-36 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#DEDBC8]/20 hover:bg-[#DEDBC8]/30 backdrop-blur-md border border-[#DEDBC8]/50 text-[#E1E0CC] hover:text-white font-medium text-xs font-mono uppercase tracking-wider shrink-0 cursor-pointer transition-all shadow-md shadow-[#DEDBC8]/10"
                  >
                    + Add
                  </button>
                </form>
              </div>

              {/* AI Recommended Solutions */}
              {suggestedActions.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#DEDBC8]/5 border border-[#DEDBC8]/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#DEDBC8]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Suggested Mitigations</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#DEDBC8]/80 pl-4 list-disc">
                    {suggestedActions.map((sug, sIdx) => (
                      <li key={sIdx}>{sug}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl p-12 bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] text-center text-[#DEDBC8]/50 text-xs font-mono shadow-2xl">
              Select an issue from the left radar to inspect history and assign corrective actions.
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
};
