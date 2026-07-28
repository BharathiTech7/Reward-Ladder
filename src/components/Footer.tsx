import React from 'react';
import { Flame, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onOpenShareModal: () => void;
  onOpenLeaderboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenShareModal,
  onOpenLeaderboard,
}) => {
  return (
    <footer className="relative border-t border-white/10 bg-[#09090B] pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-zinc-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Branding */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="px-3.5 py-1.5 bg-[#111111] rounded-xl border border-white/10 flex items-center gap-2">
            <span className="font-black text-xl tracking-tighter text-white">
              EY<span className="text-[#A3E635]">FI</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-[#FF5500] text-white flex items-center gap-1">
              <Flame className="w-3 h-3 text-white" /> CHALLENGE
            </span>
          </div>

          <p className="text-zinc-400 text-xs max-w-sm">
            Earn Your First Income (EYFI) Campus Ambassador Program. Empowering Indian college students to lead, earn, and build careers.
          </p>
        </div>

        {/* Center Quick Navigation */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <button
            onClick={onOpenLeaderboard}
            className="hover:text-[#A3E635] transition-colors"
          >
            Leaderboard
          </button>
          <span>•</span>
          <button
            onClick={onOpenShareModal}
            className="hover:text-[#A3E635] transition-colors"
          >
            Referral Link
          </button>
          <span>•</span>
          <a
            href="mailto:ambassadors@eyfi.in"
            className="hover:text-[#A3E635] transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5 text-[#A3E635]" /> Support
          </a>
        </div>

        {/* Right Copyright & Guarantee */}
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-[#A3E635] shrink-0" />
          <span>Official EYFI Ecosystem • Verified Student Rewards</span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-zinc-500">
        © {new Date().getFullYear()} EYFI Challenge. Built with passion for Indian student founders and campus leads.
      </div>
    </footer>
  );
};

