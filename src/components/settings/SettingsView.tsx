import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Save,
  CheckCircle2,
  Building,
  Bell,
  Palette,
  Shield,
  RotateCcw,
  Sparkles,
  Check,
  Globe,
  Clock,
  Navigation,
} from 'lucide-react';
import { StoreService } from '../../services/store';
import { OrganizationSettings, IndustryType } from '../../types';
import { useToast } from '../common/Toast';
import { TIMEZONE_GROUPS, ALL_TIMEZONES, detectUserTimezone } from '../../utils/timezones';

interface SettingsViewProps {
  onSettingsUpdated?: (settings: OrganizationSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onSettingsUpdated }) => {
  const { showToast } = useToast();
  const [currentSettings, setCurrentSettings] = useState<OrganizationSettings>(() =>
    StoreService.getSettings()
  );

  // Form State
  const [orgName, setOrgName] = useState(currentSettings.organizationName);
  const [industry, setIndustry] = useState<IndustryType>(currentSettings.industry);
  const [timezone, setTimezone] = useState(currentSettings.timezone);
  const [emailAlertsAddress, setEmailAlertsAddress] = useState(
    currentSettings.notifications.emailAlertsAddress
  );
  const [criticalAlerts, setCriticalAlerts] = useState(
    currentSettings.notifications.criticalFeedbackAlerts
  );
  const [weeklyDigest, setWeeklyDigest] = useState(currentSettings.notifications.weeklyDigest);
  const [issueAlerts, setIssueAlerts] = useState(
    currentSettings.notifications.issueAssignmentAlerts
  );
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(
    currentSettings.appearance.theme
  );

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const handleSettingsChanged = (e: any) => {
      if (e.detail) {
        setCurrentSettings(e.detail);
        setOrgName(e.detail.organizationName);
        setIndustry(e.detail.industry);
      }
    };
    window.addEventListener('sentio_settings_changed', handleSettingsChanged);
    return () => window.removeEventListener('sentio_settings_changed', handleSettingsChanged);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) {
      showToast('Validation Error', 'Organization name cannot be empty.', 'error');
      return;
    }

    setIsSaving(true);
    setSavedSuccess(false);

    setTimeout(() => {
      const updated = StoreService.updateSettings({
        organizationName: orgName.trim(),
        industry,
        timezone,
        notifications: {
          criticalFeedbackAlerts: criticalAlerts,
          weeklyDigest,
          issueAssignmentAlerts: issueAlerts,
          campaignCompletionAlerts: false,
          emailAlertsAddress: emailAlertsAddress.trim(),
        },
        appearance: {
          theme,
          compactMode: false,
        },
      });

      setIsSaving(false);
      setSavedSuccess(true);
      showToast(
        'Settings Saved Successfully',
        `Workspace organization updated to "${updated.organizationName}".`,
        'success'
      );

      if (onSettingsUpdated) {
        onSettingsUpdated(updated);
      }

      setTimeout(() => setSavedSuccess(false), 3000);
    }, 300);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo campaigns, responses, and issues to factory defaults?')) {
      StoreService.resetAllDemoData();
      showToast('Workspace Reset', 'All demo data has been reset to default state.', 'info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-4 h-4 text-[#DEDBC8]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60">
              Single Source of Truth
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">Workspace Settings</h1>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-[#DEDBC8]/20 hover:bg-[#DEDBC8]/30 backdrop-blur-md border border-[#DEDBC8]/50 text-[#E1E0CC] hover:text-white font-medium text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-[#DEDBC8]/10 cursor-pointer shrink-0"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Saved & Synced</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-[#DEDBC8]" />
              <span>{isSaving ? 'Persisting...' : 'Save Changes'}</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Organization Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-2xl space-y-6 transition-all">
          <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06]">
            <Building className="w-4 h-4 text-[#DEDBC8]" />
            <h2 className="text-base font-bold text-[#E1E0CC]">Organization & Workspace Identity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#DEDBC8]/70 block mb-2">
                Organization / Company Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. Demo"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
              />
              <span className="text-[11px] font-mono text-[#DEDBC8]/40 mt-1 block">
                Propagates immediately to the sidebar and headers across the application.
              </span>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#DEDBC8]/70 block mb-2">
                Primary Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value as IndustryType)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#171822] border border-white/[0.1] text-sm text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
              >
                <option value="Technology & SaaS">Technology & SaaS</option>
                <option value="Hospitality & Restaurant">Hospitality & Restaurant</option>
                <option value="Hotel & Travel">Hotel & Travel</option>
                <option value="Higher Education & Academics">Higher Education & Academics</option>
                <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                <option value="Retail & E-commerce">Retail & E-commerce</option>
                <option value="Fitness & Recreation">Fitness & Recreation</option>
                <option value="Events & Entertainment">Events & Entertainment</option>
                <option value="General Business">General Business</option>
              </select>
              <span className="text-[11px] font-mono text-[#DEDBC8]/40 mt-1 block">
                Customizes template suggestions and metric benchmarks.
              </span>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#DEDBC8]/70 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#DEDBC8]" />
                <span>Operational Timezone</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  const detected = detectUserTimezone();
                  setTimezone(`${detected.offset} — ${detected.label}`);
                  showToast(
                    'Timezone Detected',
                    `Set operational timezone to ${detected.label} (${detected.offset}).`,
                    'info'
                  );
                }}
                className="text-[11px] font-mono text-[#DEDBC8]/80 hover:text-[#DEDBC8] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Navigation className="w-3 h-3 text-[#DEDBC8]" />
                <span>Auto-Detect My Timezone</span>
              </button>
            </div>

            <div className="relative">
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#171822] border border-white/[0.1] text-sm text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8] cursor-pointer"
              >
                {/* Standard timezone value if not in list */}
                {!ALL_TIMEZONES.some((t) => `${t.offset} — ${t.label}` === timezone || t.value === timezone || t.label === timezone) && (
                  <option value={timezone}>{timezone}</option>
                )}

                {TIMEZONE_GROUPS.map((group) => (
                  <optgroup key={group.region} label={group.region} className="bg-[#121319] text-[#DEDBC8] font-bold">
                    {group.timezones.map((tz) => {
                      const formattedVal = `${tz.offset} — ${tz.label}`;
                      return (
                        <option
                          key={tz.value}
                          value={formattedVal}
                          className="bg-[#171822] text-[#E1E0CC] font-normal py-1"
                        >
                          [{tz.offset}] {tz.label}
                        </option>
                      );
                    })}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#DEDBC8]/50 mt-2">
              <span>Used to timestamp feedback submissions, pulse trends, and automated issue reports.</span>
              <span className="flex items-center gap-1 text-[#DEDBC8]/70">
                <Clock className="w-3 h-3 text-[#DEDBC8]" />
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Local)
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Automated Issue Alerts & Notifications */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#090b10]/30 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.16] shadow-2xl space-y-6 transition-all">
          <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06]">
            <Bell className="w-4 h-4 text-[#DEDBC8]" />
            <h2 className="text-base font-bold text-[#E1E0CC]">Issue Radar & Notification Rules</h2>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[#DEDBC8]/70 block mb-2">
              Operations Alert Email Address
            </label>
            <input
              type="email"
              value={emailAlertsAddress}
              onChange={(e) => setEmailAlertsAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
            />
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div>
                <div className="text-xs font-bold text-[#E1E0CC]">Critical Feedback Alerts</div>
                <div className="text-[11px] text-[#DEDBC8]/60 mt-0.5">
                  Trigger instant notifications whenever an issue with critical severity is clustered.
                </div>
              </div>
              <input
                type="checkbox"
                checked={criticalAlerts}
                onChange={(e) => setCriticalAlerts(e.target.checked)}
                className="w-4 h-4 rounded accent-[#DEDBC8] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div>
                <div className="text-xs font-bold text-[#E1E0CC]">Weekly Feedback Pulse Digest</div>
                <div className="text-[11px] text-[#DEDBC8]/60 mt-0.5">
                  Receive executive summary with average rating trends and before vs after deltas.
                </div>
              </div>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                className="w-4 h-4 rounded accent-[#DEDBC8] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div>
                <div className="text-xs font-bold text-[#E1E0CC]">Corrective Action Assignment Alerts</div>
                <div className="text-[11px] text-[#DEDBC8]/60 mt-0.5">
                  Notify assignees when new tasks are added to the Issue Radar.
                </div>
              </div>
              <input
                type="checkbox"
                checked={issueAlerts}
                onChange={(e) => setIssueAlerts(e.target.checked)}
                className="w-4 h-4 rounded accent-[#DEDBC8] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Reset / Factory Defaults */}
        <div className="p-6 rounded-3xl bg-red-950/10 border border-red-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-red-400">Reset Demo Data</div>
            <div className="text-[11px] text-[#DEDBC8]/60 mt-0.5">
              Restore default multi-industry survey templates, responses, and issue radar logs.
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-mono transition-colors cursor-pointer shrink-0"
          >
            Reset Workspace
          </button>
        </div>
      </form>
    </div>
  );
};
