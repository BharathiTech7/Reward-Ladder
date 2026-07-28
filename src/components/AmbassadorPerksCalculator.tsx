import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Sparkles, Check, DollarSign, Gift, Briefcase, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface PerksCalculatorProps {
  onSetSimulatorTarget: (target: number) => void;
  onOpenShareModal: () => void;
}

export const AmbassadorPerksCalculator: React.FC<PerksCalculatorProps> = ({
  onSetSimulatorTarget,
  onOpenShareModal,
}) => {
  const [targetRegs, setTargetRegs] = useState<number>(50);

  // Calculate projected benefits based on targetRegs
  const calculateBenefits = (regs: number) => {
    let cashIncentive = 0;
    if (regs >= 25) cashIncentive += (regs - 20) * 50;
    if (regs >= 100) cashIncentive += 2500; // Bonus tier

    let swagItems: string[] = ['Digital Scout Badge', 'WhatsApp Community Access'];
    if (regs >= 25) swagItems.push('Physical Ambassador Welcome Pack', 'Laptop Sticker Pack', 'Lapel Pin');
    if (regs >= 50) swagItems.push('Custom EYFI Heavyweight Hoodie', 'Matte Black Water Bottle');
    if (regs >= 75) swagItems.push('Wireless Earbuds / Power Bank Tech Kit');
    if (regs >= 200) swagItems.push('Executive Gold Engraved Trophy', 'Personalized Leather Gift Box');

    let careerPerks: string[] = ['Certificate of Appreciation'];
    if (regs >= 25) careerPerks.push('Verified LinkedIn Designation Credential');
    if (regs >= 50) careerPerks.push('Official Letter of Recommendation (LoR)');
    if (regs >= 75) careerPerks.push('Monthly 1-on-1 VC & Founder Mentorship');
    if (regs >= 100) careerPerks.push('Paid Internship Fast-Track (₹15,000–₹35,000/mo stipend)');
    if (regs >= 200) careerPerks.push('Founding Core Team & Equity Track Consideration');

    return { cashIncentive, swagItems, careerPerks };
  };

  const benefits = calculateBenefits(targetRegs);

  return (
    <section id="perks-estimator-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-6 sm:p-10 rounded-3xl bg-[#111111] border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#A3E635]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-[#A3E635] text-xs font-extrabold uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#A3E635]" /> Perks & Rewards Estimator
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            What Will You Earn at Your College?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Select your student registration goal and see the cumulative physical swag, career credentials, and monetary perks unlocked.
          </p>
        </div>

        {/* Target Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {[10, 25, 50, 75, 100, 200].map((num) => (
            <button
              key={num}
              id={`btn-target-regs-${num}`}
              onClick={() => {
                soundFx.playClick();
                setTargetRegs(num);
              }}
              className={`px-4 sm:px-6 py-2.5 rounded-full font-black text-xs sm:text-sm transition-all border ${
                targetRegs === num
                  ? 'bg-[#A3E635] text-black border-lime-300 shadow-md shadow-lime-500/20 scale-105'
                  : 'bg-[#09090B] text-zinc-400 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              {num === 200 ? '200+ (Legend)' : `${num} Regs`}
            </button>
          ))}
        </div>

        {/* Dynamic Earnings Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* Box 1: Cash & Monetary Perks */}
          <div className="p-5 rounded-2xl bg-[#09090B] border border-white/10 text-left">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#A3E635] uppercase tracking-wider mb-2">
              <DollarSign className="w-4 h-4 text-[#A3E635]" /> Estimated Cash Perks
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mb-1">
              {benefits.cashIncentive > 0 ? `₹${benefits.cashIncentive.toLocaleString('en-IN')}+` : 'Perk Eligible'}
            </div>
            <p className="text-[11px] text-zinc-400">
              {targetRegs >= 25
                ? 'Performance bonus pool + grant funding eligibility'
                : 'Reach 25+ registrations to unlock direct cash bonuses'}
            </p>
          </div>

          {/* Box 2: Physical Swag Unlocked */}
          <div className="p-5 rounded-2xl bg-[#09090B] border border-white/10 text-left">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#A3E635] uppercase tracking-wider mb-2">
              <Gift className="w-4 h-4 text-[#A3E635]" /> Physical Merch Unlocked
            </div>
            <div className="text-lg font-bold text-white mb-1">
              {benefits.swagItems.length} Swag Items
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {benefits.swagItems.slice(0, 3).map((swag, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
                  <span className="truncate">{swag}</span>
                </li>
              ))}
              {benefits.swagItems.length > 3 && (
                <li className="text-[11px] text-[#A3E635] font-bold">
                  + {benefits.swagItems.length - 3} more items included
                </li>
              )}
            </ul>
          </div>

          {/* Box 3: Career & Mentorship Track */}
          <div className="p-5 rounded-2xl bg-[#09090B] border border-white/10 text-left">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5500] uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4 text-[#FF5500]" /> Career Boosters
            </div>
            <div className="text-lg font-bold text-white mb-1">
              {benefits.careerPerks.length} Career Perks
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {benefits.careerPerks.slice(0, 3).map((perk, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                  <span className="truncate">{perk}</span>
                </li>
              ))}
              {benefits.careerPerks.length > 3 && (
                <li className="text-[11px] text-[#FF5500] font-bold">
                  + {benefits.careerPerks.length - 3} more career perks
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="btn-apply-calculator-target"
            onClick={() => {
              soundFx.playUnlock();
              onSetSimulatorTarget(targetRegs);
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#A3E635] text-black font-extrabold text-sm shadow-xl shadow-lime-500/10 hover:bg-lime-400 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Simulate {targetRegs} Regs on Ladder</span>
          </button>

          <button
            id="btn-share-referral-calculator"
            onClick={() => {
              soundFx.playClick();
              onOpenShareModal();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white font-bold text-sm border border-white/15 transition-all flex items-center justify-center gap-2"
          >
            <span>Get Referral Link</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </motion.div>
    </section>
  );
};

