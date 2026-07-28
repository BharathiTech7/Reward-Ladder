import React from 'react';
import { Volume2, VolumeX, Share2, Sparkles, Trophy, Flame } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  registrations: number;
  onOpenShareModal: () => void;
  onOpenLeaderboard: () => void;
  activeTab: 'ladder' | 'perks' | 'leaderboard';
  setActiveTab: (tab: 'ladder' | 'perks' | 'leaderboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  registrations,
  onOpenShareModal,
  onOpenLeaderboard,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090B]/90 border-b border-white/10 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* EYFI Brand Logo & Program Badge */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer flex items-center gap-2" onClick={() => setActiveTab('ladder')}>
            <span className="font-black text-2xl tracking-tighter text-white">
              EY<span className="text-[#A3E635]">FI</span>
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-[#FF5500] text-white flex items-center gap-1 shadow-sm">
              <Flame className="w-3 h-3 text-white animate-bounce" />
              CHALLENGE
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-white/10 text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
            <span>Campus Ambassador Portal</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-[#111111] border border-white/10 p-1 rounded-full text-xs sm:text-sm">
          <button
            id="tab-reward-ladder"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('ladder');
            }}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full font-bold transition-all ${
              activeTab === 'ladder'
                ? 'bg-[#A3E635] text-black shadow-md shadow-lime-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Reward Ladder
          </button>
          
          <button
            id="tab-perks-calculator"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('perks');
            }}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full font-bold transition-all ${
              activeTab === 'perks'
                ? 'bg-[#A3E635] text-black shadow-md shadow-lime-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Perks Estimator
          </button>

          <button
            id="tab-hall-of-fame"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('leaderboard');
              onOpenLeaderboard();
            }}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-[#FF5500] text-white shadow-md shadow-orange-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Leaderboard</span>
          </button>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Registrations Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] border border-white/10 rounded-full text-xs font-bold text-zinc-200">
            <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>Score: <strong className="text-[#A3E635] font-black">{registrations}</strong> Regs</span>
          </div>

          {/* Sound FX Toggle */}
          <button
            id="toggle-sound-fx"
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) soundFx.playClick();
            }}
            className={`p-2 rounded-full border transition-all ${
              soundEnabled
                ? 'bg-lime-500/10 border-lime-500/40 text-[#A3E635] hover:bg-lime-500/20'
                : 'bg-zinc-900 border-white/10 text-zinc-500 hover:text-zinc-300'
            }`}
            title={soundEnabled ? 'Sound FX Enabled' : 'Sound FX Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Share Referral Link Button */}
          <button
            id="btn-share-referral"
            onClick={() => {
              soundFx.playClick();
              onOpenShareModal();
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#A3E635] text-black text-xs sm:text-sm font-extrabold hover:bg-lime-400 active:scale-95 transition-all shadow-lg shadow-lime-500/10"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Share Link</span>
          </button>
        </div>

      </div>
    </header>
  );
};

