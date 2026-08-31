import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Lock,
  Mail,
  User,
  Building,
  Briefcase,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  KeyRound,
  Info,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { IndustryType } from '../types';
import { StoreService } from '../services/store';
import { DashboardBackgroundMotion } from './dashboard/DashboardBackgroundMotion';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
  onSuccess?: (email: string, mode: 'signin' | 'signup') => void;
  onExploreDemo?: () => void;
  redirectTarget?: string | null;
}

const INDUSTRIES: IndustryType[] = [
  'General Business',
  'Technology & SaaS',
  'Hospitality & Restaurant',
  'Hotel & Travel',
  'Retail & E-commerce',
  'Higher Education & Academics',
  'Healthcare & Wellness',
  'Fitness & Recreation',
  'Events & Entertainment',
  'Professional Services',
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  onClose,
  onSuccess,
  onExploreDemo,
  redirectTarget,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot_password' | 'set_new_password'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [industry, setIndustry] = useState<IndustryType>('Technology & SaaS');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync mode when initialMode changes or modal opens
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSubmitted(false);
      setLoading(false);
      setError(null);
      setResetToken(null);
      setCopiedLink(false);
    }
  }, [isOpen, initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid work or personal email address.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!organizationName.trim()) {
        setError('Please enter your organization or workspace name.');
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      if (mode === 'signup') {
        StoreService.initNewAccountWorkspace({
          id: 'usr-' + Math.random().toString(36).substring(2, 9),
          name: name.trim() || email.split('@')[0],
          email: email.trim(),
          organizationName: organizationName.trim() || 'Sentio Workspace',
          industry: industry || 'Technology & SaaS',
        });
      } else {
        StoreService.signInUser(email.trim());
      }

      if (onSuccess) {
        onSuccess(email, mode === 'signup' ? 'signup' : 'signin');
      }

      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setOrganizationName('');
      }, 1200);
    }, 500);
  };

  const handleGenerateResetLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter your registered email address.');
      return;
    }
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const generated = 'rst_' + Math.random().toString(36).substring(2, 11);
      setResetToken(generated);
    }, 400);
  };

  const handleApplyNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      StoreService.signInUser(email.trim());

      if (onSuccess) {
        onSuccess(email, 'signin');
      }

      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 1200);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md overflow-hidden"
        >
          {/* Constellation Motion behind Sign In */}
          <DashboardBackgroundMotion variant="auth" intensity="vibrant" isFixed={false} />
        </motion.div>

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg liquid-glass-modal rounded-3xl p-6 sm:p-8 z-10 text-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* In-Modal subtle ambient motion */}
          <DashboardBackgroundMotion variant="modal" intensity="subtle" isFixed={false} className="opacity-25" />

          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/[0.08] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <div className="space-y-5">
              {/* Header */}
              <div className="text-center space-y-1.5 pt-2">
                {mode === 'forgot_password' || mode === 'set_new_password' ? (
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signin');
                        setError(null);
                        setResetToken(null);
                      }}
                      className="text-xs font-mono text-[#DEDBC8]/70 hover:text-[#DEDBC8] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Sign In</span>
                    </button>
                  </div>
                ) : null}

                <h3
                  className="text-3xl sm:text-4xl text-white tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {mode === 'signin'
                    ? (redirectTarget === 'create_survey' ? 'Sign In to Build & Save Survey' : 'Sign In to Sentio')
                    : mode === 'signup'
                    ? 'Create Your Organization Account'
                    : mode === 'forgot_password'
                    ? 'Reset Workspace Password'
                    : 'Set New Account Password'}
                </h3>
                <p className="text-xs text-[#DEDBC8]/70 max-w-sm mx-auto">
                  {mode === 'signin'
                    ? (redirectTarget === 'create_survey'
                      ? 'Sign in or create an account to save and publish live surveys, or test in Demo Sandbox.'
                      : 'Access your survey campaigns, feedback radar, and intelligence reports.')
                    : mode === 'signup'
                    ? 'Build adaptive surveys and transform customer feedback into measurable improvements.'
                    : mode === 'forgot_password'
                    ? 'Enter your account email to generate a direct reset token or simulate the recovery link.'
                    : 'Create and verify your new account password to sign in immediately.'}
                </p>
              </div>

              {/* Mode Toggle Pills (Only on Sign In / Sign Up) */}
              {(mode === 'signin' || mode === 'signup') && (
                <div className="liquid-glass rounded-full p-1 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setError(null);
                    }}
                    className={`flex-1 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      mode === 'signin'
                        ? 'bg-[#DEDBC8] text-black font-semibold shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setError(null);
                    }}
                    className={`flex-1 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      mode === 'signup'
                        ? 'bg-[#DEDBC8] text-black font-semibold shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs text-center">
                  {error}
                </div>
              )}

              {/* FORGOT PASSWORD MODE */}
              {mode === 'forgot_password' && (
                <div className="space-y-4">
                  {/* Sandbox Clarification Notice */}
                  <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                      <Info className="w-4 h-4 shrink-0" />
                      <span>Why no Gmail email in preview?</span>
                    </div>
                    <p className="text-[11px] text-[#DEDBC8]/70 leading-relaxed">
                      In sandboxed browser prototypes, external transactional emails are simulated in-app rather than sent over public SMTP to personal inboxes like Gmail. You can simulate and test the recovery link directly below!
                    </p>
                  </div>

                  {!resetToken ? (
                    <form onSubmit={handleGenerateResetLink} className="space-y-3">
                      <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                        <Mail className="w-4 h-4 text-white/40 shrink-0" />
                        <input
                          type="email"
                          required
                          placeholder="Your registered email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none border-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-full bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#DEDBC8]/15"
                      >
                        {loading ? (
                          <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                          <>
                            <KeyRound className="w-4 h-4 text-black" />
                            <span>Simulate & Generate Reset Link</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                        <span className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Reset Token Generated</span>
                        </span>
                        <span className="text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded">Active 15m</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between font-mono text-xs">
                        <span className="text-[#DEDBC8] truncate">https://sentio.io/auth/reset?token={resetToken}</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(`https://sentio.io/auth/reset?token=${resetToken}`);
                            setCopiedLink(true);
                            setTimeout(() => setCopiedLink(false), 2000);
                          }}
                          className="p-1.5 text-[#DEDBC8]/70 hover:text-white cursor-pointer transition-colors shrink-0 ml-2"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setMode('set_new_password');
                          setError(null);
                        }}
                        className="w-full py-3 rounded-xl bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                      >
                        <span>Set New Password Now →</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* SET NEW PASSWORD MODE */}
              {mode === 'set_new_password' && (
                <form onSubmit={handleApplyNewPassword} className="space-y-3">
                  <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-white/40 shrink-0" />
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full bg-transparent text-sm text-white/60 outline-none border-none cursor-not-allowed"
                    />
                  </div>

                  <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <Lock className="w-4 h-4 text-white/40 shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter new password (min 6 chars)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none border-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/40 hover:text-white p-1 cursor-pointer transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <Lock className="w-4 h-4 text-white/40 shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none border-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-3 py-3.5 rounded-full bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#DEDBC8]/15"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Update Password & Log In</span>
                        <Sparkles className="w-4 h-4 text-black" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Quick Demo Fill Buttons (Only in Sign In mode) */}
              {mode === 'signin' && (
                <div className="flex items-center justify-between text-[11px] font-mono text-[#DEDBC8]/60 px-1">
                  <span>Quick demo credentials:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('admin@sentio.io');
                      setPassword('sentio2026');
                      setName('Alex Vance');
                      setOrganizationName('Lumina Dynamics');
                    }}
                    className="text-[#DEDBC8] hover:underline cursor-pointer"
                  >
                    Fill Demo Admin
                  </button>
                </div>
              )}

              {/* Standard Sign In / Sign Up Form */}
              {(mode === 'signin' || mode === 'signup') && (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {mode === 'signup' && (
                    <>
                      <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                        <User className="w-4 h-4 text-white/40 shrink-0" />
                        <input
                          type="text"
                          required
                          placeholder="Full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none border-none"
                        />
                      </div>

                      <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                        <Building className="w-4 h-4 text-white/40 shrink-0" />
                        <input
                          type="text"
                          required
                          placeholder="Organization or Company name"
                          value={organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none border-none"
                        />
                      </div>

                      <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                        <Briefcase className="w-4 h-4 text-white/40 shrink-0" />
                        <select
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value as IndustryType)}
                          className="w-full bg-transparent text-sm text-white outline-none border-none cursor-pointer [&>option]:bg-[#121319] [&>option]:text-white"
                        >
                          {INDUSTRIES.map((ind) => (
                            <option key={ind} value={ind}>
                              {ind}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-white/40 shrink-0" />
                    <input
                      type="email"
                      required
                      placeholder="Work email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none border-none"
                    />
                  </div>

                  <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <Lock className="w-4 h-4 text-white/40 shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none border-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/40 hover:text-white p-1 cursor-pointer transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {mode === 'signup' && (
                    <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                      <Lock className="w-4 h-4 text-white/40 shrink-0" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none border-none"
                      />
                    </div>
                  )}

                  {/* Auxiliary row */}
                  <div className="flex items-center justify-between text-xs text-white/60 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded accent-[#DEDBC8] cursor-pointer"
                      />
                      <span>Remember this device</span>
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot_password');
                          setError(null);
                          setResetToken(null);
                        }}
                        className="text-[#DEDBC8]/80 hover:text-[#DEDBC8] transition-colors cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-3 py-3.5 rounded-full bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#DEDBC8]/15 active:scale-[0.99]"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{mode === 'signin' ? 'Sign In to Workspace' : 'Complete Registration'}</span>
                        <Sparkles className="w-4 h-4 text-black" />
                      </>
                    )}
                  </button>

                  {/* Direct Demo Sandbox Access */}
                  {onExploreDemo && (
                    <div className="pt-2 text-center border-t border-white/[0.08] mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onExploreDemo();
                        }}
                        className="text-xs text-[#DEDBC8]/80 hover:text-[#DEDBC8] transition-colors inline-flex items-center gap-1.5 cursor-pointer py-1"
                      >
                        <span>Just exploring?</span>
                        <span className="underline font-semibold">Try Sandbox Demo Mode without signing in →</span>
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          ) : (
            /* Success State */
            <div className="py-8 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>
              <div className="space-y-1">
                <h4
                  className="text-2xl text-white font-medium"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {mode === 'set_new_password'
                    ? 'Password Updated Successfully'
                    : mode === 'signin'
                    ? 'Welcome Back'
                    : 'Account Configured'}
                </h4>
                <p className="text-xs text-[#DEDBC8]/70">
                  {mode === 'set_new_password'
                    ? 'Your credentials have been securely updated. Launching workspace...'
                    : mode === 'signin'
                    ? `Authenticating workspace access for ${email}...`
                    : `Welcome to Sentio, ${name || email}! Launching workspace...`}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
