import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, MessageSquare, Share2, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface ReferralShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferralShareModal: React.FC<ReferralShareModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [ambassadorName, setAmbassadorName] = useState('Rahul Verma');
  const [collegeName, setCollegeName] = useState('IIT Bombay');

  if (!isOpen) return null;

  const referralCode = `eyfi.in/ref/${ambassadorName.toLowerCase().replace(/\s+/g, '-')}-2026`;

  const whatsappMessage = `Hey guys! 🚀 Join the EYFI (Earn Your First Income) Challenge with my official Campus Ambassador link! Unlocks paid internships, founder mentorship, and free swag drops. Register now: https://${referralCode}`;

  const handleCopy = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(`https://${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    soundFx.playClick();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl bg-[#09090B] border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left overflow-hidden"
        >
          {/* Top Glow Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-[#A3E635]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            id="close-referral-modal"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-lime-500/20 text-[#A3E635] border border-lime-500/40 shadow-lg shadow-lime-500/20">
              <Share2 className="w-6 h-6 text-[#A3E635]" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#FF5500] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Ambassador Link Generator
              </div>
              <h2 className="text-2xl font-black text-white">
                Share Your Unique Invite
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 mb-6">
            Share your link on WhatsApp college groups, Instagram stories, and Linkedin to climb the EYFI Reward Ladder.
          </p>

          {/* Customizer Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={ambassadorName}
                onChange={(e) => setAmbassadorName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#A3E635]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                College Campus
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#A3E635]"
              />
            </div>
          </div>

          {/* Referral Link Copy Bar */}
          <div className="p-3.5 rounded-2xl bg-[#111111] border border-white/15 mb-6">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
              Your Referral URL
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-[#A3E635] truncate font-bold">
                https://{referralCode}
              </span>

              <button
                id="btn-copy-referral-link"
                onClick={handleCopy}
                className="px-4 py-2 rounded-full bg-[#A3E635] hover:bg-lime-400 text-black text-xs font-black shrink-0 transition-all flex items-center gap-1.5 shadow-md shadow-lime-500/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Quick WhatsApp & Social Action Buttons */}
          <div className="space-y-3">
            <button
              id="btn-share-whatsapp"
              onClick={handleWhatsAppShare}
              className="w-full py-3.5 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Share directly to WhatsApp College Groups</span>
            </button>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-400 text-center">
              💡 <strong>Pro Tip for Ambassadors:</strong> Post your invite link on your Instagram story with the EYFI sticker to double your registrations in 24 hours!
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

