import React from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { Sliders, Plus, RotateCcw, Zap, Trophy } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface RegistrationSimulatorProps {
  registrations: number;
  setRegistrations: React.Dispatch<React.SetStateAction<number>>;
  unlockedCount: number;
  totalMilestones: number;
}

export const RegistrationSimulator: React.FC<RegistrationSimulatorProps> = ({
  registrations,
  setRegistrations,
  unlockedCount,
  totalMilestones,
}) => {

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A3E635', '#FF5500', '#FBBF24', '#FFFFFF'],
      });
    } catch {
      // Ignore confetti errors if canvas unavailable
    }
  };

  const handleUpdateRegistrations = (newVal: number) => {
    const clamped = Math.max(0, Math.min(250, newVal));
    
    // Check if new milestone was unlocked
    if (clamped > registrations) {
      soundFx.playUnlock();
      if (clamped >= 25 || clamped >= 50 || clamped >= 75 || clamped >= 100 || clamped >= 200) {
        triggerConfetti();
      }
    } else {
      soundFx.playClick();
    }

    setRegistrations(clamped);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto my-8 px-4"
    >
      <div className="relative p-5 sm:p-6 rounded-3xl bg-[#111111] border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Glow accent line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#A3E635]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5500] uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4 text-[#FF5500] animate-bounce" />
              Interactive Progression Simulator
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Test Drive Your Campus Growth
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Drag the slider or click buttons below to simulate student registrations and watch perks light up!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#09090B] p-3 rounded-2xl border border-white/10 self-start md:self-auto">
            <div className="p-2 rounded-xl bg-lime-500/10 text-[#A3E635] border border-lime-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-zinc-400 uppercase font-bold">Unlocks Achieved</div>
              <div className="text-base font-extrabold text-white flex items-center gap-1.5">
                <span className="text-[#A3E635] font-black">{unlockedCount}</span> / {totalMilestones} Milestones
              </div>
            </div>
          </div>
        </div>

        {/* Range Slider & Quick Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-zinc-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#A3E635]" />
                Simulated Registrations Count:
              </span>
              <span className="text-xl font-black text-[#A3E635] px-3 py-1 bg-lime-500/10 border border-lime-500/30 rounded-xl">
                {registrations} Students
              </span>
            </div>

            <input
              id="registration-slider"
              type="range"
              min="0"
              max="220"
              step="5"
              value={registrations}
              onChange={(e) => handleUpdateRegistrations(parseInt(e.target.value, 10))}
              className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#A3E635] hover:accent-lime-400 transition-all"
            />

            <div className="flex justify-between text-[11px] text-zinc-500 font-medium px-1">
              <span>0 (Scout)</span>
              <span>25 (Ambassador)</span>
              <span>50 (Grant Lead)</span>
              <span>75 (Mentee)</span>
              <span>100 (Intern)</span>
              <span>200+ (Legend)</span>
            </div>
          </div>

          {/* Quick Increment Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium mr-1">Quick Add:</span>
              
              <button
                id="btn-add-5"
                onClick={() => handleUpdateRegistrations(registrations + 5)}
                className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-white/10 hover:border-white/20 transition-all flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#A3E635]" /> +5 Regs
              </button>

              <button
                id="btn-add-25"
                onClick={() => handleUpdateRegistrations(registrations + 25)}
                className="px-3 py-1.5 rounded-full bg-lime-500/15 hover:bg-lime-500/25 text-[#A3E635] text-xs font-bold border border-lime-500/30 transition-all flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#A3E635]" /> +25 Regs
              </button>

              <button
                id="btn-add-50"
                onClick={() => handleUpdateRegistrations(registrations + 50)}
                className="px-3 py-1.5 rounded-full bg-lime-500/15 hover:bg-lime-500/25 text-[#A3E635] text-xs font-bold border border-lime-500/30 transition-all flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#A3E635]" /> +50 Regs
              </button>

              <button
                id="btn-max-legend"
                onClick={() => handleUpdateRegistrations(200)}
                className="px-4 py-1.5 rounded-full bg-[#A3E635] text-black text-xs font-black shadow-md hover:bg-lime-400 transition-all flex items-center gap-1"
              >
                <Trophy className="w-3 h-3 text-black" /> Max (200 Regs)
              </button>
            </div>

            <button
              id="btn-reset-simulator"
              onClick={() => handleUpdateRegistrations(0)}
              className="px-3.5 py-1.5 rounded-full bg-[#09090B] hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold border border-white/10 transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

