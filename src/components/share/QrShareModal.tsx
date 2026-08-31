import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Download, ExternalLink, QrCode, Play, Sparkles } from 'lucide-react';
import QRCode from 'qrcode';
import { Survey } from '../../types';
import { useToast } from '../common/Toast';

interface QrShareModalProps {
  survey: Survey | null;
  isOpen: boolean;
  onClose: () => void;
  onTestSurvey: (survey: Survey) => void;
}

export const QrShareModal: React.FC<QrShareModalProps> = ({
  survey,
  isOpen,
  onClose,
  onTestSurvey,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  // Use clean, standard URL query param (?survey=id) for max cross-browser compatibility
  const cleanPath = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';
  const shareUrl = survey
    ? `${window.location.origin}${cleanPath}/?survey=${encodeURIComponent(survey.id)}`
    : (typeof window !== 'undefined' ? window.location.href : '');

  useEffect(() => {
    if (survey && isOpen) {
      QRCode.toDataURL(shareUrl, {
        width: 360,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: {
          dark: '#000000',
          light: '#DEDBC8',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [survey, isOpen, shareUrl]);

  if (!isOpen || !survey) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast('Link Copied to Clipboard', shareUrl, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `${survey.slug || 'survey'}-qr-code.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('QR Code Downloaded', 'High-res QR image saved.', 'info');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#121319] border border-white/[0.12] p-6 sm:p-8 text-[#E1E0CC] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-[#DEDBC8]/10 text-[#DEDBC8]">
                  <QrCode className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#DEDBC8]/60">
                  Share & Collect Responses
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#E1E0CC]">{survey.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* QR Code Presentation Box */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0a0b0e] border border-white/[0.06] mb-6">
            <div className="p-3 bg-[#DEDBC8] rounded-2xl shadow-xl shadow-[#DEDBC8]/5 mb-4">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Survey QR Code"
                  className="w-48 h-48 rounded-xl object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-black font-mono text-xs">
                  Generating QR...
                </div>
              )}
            </div>
            <div className="text-xs font-mono text-[#DEDBC8]/70 text-center">
              Scan with any mobile camera or table-top stand to open survey.
            </div>
          </div>

          {/* Share Link input */}
          <div className="mb-6">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#DEDBC8]/60 block mb-2">
              Direct Public Link
            </label>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent border-none outline-none text-xs font-mono text-[#E1E0CC] flex-1 px-2 selection:bg-[#DEDBC8] selection:text-black"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <button
              onClick={handleDownloadQr}
              className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] font-mono uppercase tracking-wider text-[#E1E0CC] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#DEDBC8]" />
              <span>PNG</span>
            </button>

            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] font-mono uppercase tracking-wider text-[#E1E0CC] flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#DEDBC8]" />
              <span>Open Tab</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onTestSurvey(survey);
              }}
              className="py-2.5 px-3 rounded-xl bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-medium text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#DEDBC8]/10 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-black" />
              <span>Live Test</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
