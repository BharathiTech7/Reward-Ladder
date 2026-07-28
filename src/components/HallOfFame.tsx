import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X, Crown, MapPin, Sparkles, Flame } from 'lucide-react';
import { leaderboardData } from '../data/leaderboardData';
import { soundFx } from '../utils/soundEffects';

interface HallOfFameProps {
  isOpen: boolean;
  onClose: () => void;
  userRegistrations: number;
}

export const HallOfFame: React.FC<HallOfFameProps> = ({
  isOpen,
  onClose,
  userRegistrations,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#09090B] border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#A3E635] via-[#FF5500] to-[#A3E635]" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            id="close-hall-of-fame"
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
              <Trophy className="w-7 h-7 text-[#A3E635] animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#FF5500] flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" /> EYFI National Leaderboard
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Ambassador Hall of Fame
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 mb-6">
            Meet the top student campus leads driving EYFI registrations across India’s premier universities.
          </p>

          {/* User's Current Rank Card */}
          <div className="p-4 rounded-2xl bg-[#111111] border border-lime-500/30 flex items-center justify-between gap-4 mb-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A3E635] flex items-center justify-center text-black font-black text-sm shadow-md">
                YOU
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  Your Current Standing
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-500/20 text-[#A3E635] font-extrabold border border-lime-500/30">
                    Active Lead
                  </span>
                </div>
                <div className="text-xs text-zinc-400">Your College Campus Lead</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-black text-[#A3E635]">{userRegistrations} Regs</div>
              <div className="text-[11px] text-zinc-400 font-medium">Keep climbing!</div>
            </div>
          </div>

          {/* Leaderboard Table List */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {leaderboardData.map((user, idx) => (
              <div
                key={user.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  idx === 0
                    ? 'bg-lime-500/10 border-lime-500/40'
                    : idx === 1
                    ? 'bg-[#111111] border-orange-500/30'
                    : idx === 2
                    ? 'bg-[#111111] border-white/10'
                    : 'bg-[#111111] border-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank Number Badge */}
                  <div className="shrink-0 w-8 text-center">
                    {idx === 0 ? (
                      <Crown className="w-6 h-6 text-[#A3E635] mx-auto" />
                    ) : idx === 1 ? (
                      <span className="font-black text-sm text-[#FF5500]">#2</span>
                    ) : idx === 2 ? (
                      <span className="font-black text-sm text-amber-500">#3</span>
                    ) : (
                      <span className="font-bold text-xs text-zinc-500">#{idx + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
                  />

                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate flex items-center gap-2">
                      <span>{user.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-bold shrink-0">
                        {user.badge}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-400 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span className="truncate">{user.college}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-black text-[#A3E635] flex items-center justify-end gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>{user.registrations}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400">Registrations</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A3E635]" />
            <span>Leaderboard updates real-time with verified student referral logins.</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

