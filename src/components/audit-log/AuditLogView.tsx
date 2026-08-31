import React, { useState, useEffect } from 'react';
import { Shield, Clock, FileText, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { StoreService } from '../../services/store';
import { AuditLog } from '../../types';

export const AuditLogView: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>(() => StoreService.getAuditLogs());

  useEffect(() => {
    const handleLogsChanged = (e: any) => {
      if (e.detail) setLogs(e.detail);
    };
    window.addEventListener('sentio_audit_logs_changed', handleLogsChanged);
    return () => window.removeEventListener('sentio_audit_logs_changed', handleLogsChanged);
  }, []);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'settings':
        return <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] font-mono">SETTINGS</span>;
      case 'issue':
        return <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono">ISSUE RADAR</span>;
      case 'response':
        return <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">RESPONSE</span>;
      case 'campaign':
        return <span className="px-2 py-0.5 rounded bg-[#DEDBC8]/15 text-[#DEDBC8] text-[10px] font-mono">CAMPAIGN</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 text-[10px] font-mono">SYSTEM</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-[#DEDBC8]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60">
              Compliance & Accountability
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">Security & Audit Trail</h1>
        </div>

        <button
          onClick={() => setLogs(StoreService.getAuditLogs())}
          className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md border border-white/[0.12] text-[#DEDBC8] text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-black/20"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Log list */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] shadow-2xl space-y-4">
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] backdrop-blur-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getCategoryBadge(log.category)}
                  <span className="font-bold text-[#E1E0CC]">{log.action}</span>
                </div>
                <p className="text-[#DEDBC8]/70 text-xs leading-relaxed">{log.details}</p>
              </div>

              <div className="flex items-center sm:flex-col sm:items-end gap-2 text-[10px] font-mono text-[#DEDBC8]/50 shrink-0">
                <span className="text-[#E1E0CC] font-semibold">{log.actor}</span>
                <span>{new Date(log.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
