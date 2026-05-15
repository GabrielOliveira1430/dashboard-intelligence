// src/components/football/FootballQuantumSimulator.tsx

import type {
  QuantumSimulation
} from '../../types/football.quantum.types';

type Props = {

  simulation?:
    QuantumSimulation | null;
};

export default function FootballQuantumSimulator({
  simulation
}: Props) {

  // ==========================================
  // 🛡️ SAFE
  // ==========================================

  if (!simulation) {

    return (

      <div className="
        rounded-3xl
        border
        border-violet-500/20
        bg-violet-500/5
        p-6
      ">

        <p className="text-slate-400">
          No quantum simulation
        </p>

      </div>
    );
  }

  return (

    <div className="
      rounded-3xl
      border
      border-violet-500/20
      bg-violet-500/5
      p-6
      overflow-hidden
      relative
    ">

      <div className="
        absolute
        top-0
        right-0
        w-40
        h-40
        bg-violet-500/10
        blur-3xl
      " />

      <div className="relative z-10">

        <div className="
          flex
          items-center
          justify-between
          mb-5
        ">

          <div>

            <h2 className="
              text-2xl
              font-black
            ">
              ☢️ Quantum Simulation
            </h2>

            <p className="
              text-slate-400
              text-sm
            ">
              {simulation.match}
            </p>

          </div>

          <div className="
            px-4
            py-2
            rounded-2xl
            bg-violet-500/10
            border
            border-violet-500/20
          ">

            <p className="
              text-xs
              text-violet-300
            ">
              Simulations
            </p>

            <h2 className="
              text-xl
              font-black
              text-violet-400
            ">
              {simulation.simulations ?? 0}
            </h2>

          </div>

        </div>

        <div className="
          grid
          grid-cols-3
          gap-4
          mb-6
        ">

          <div className="
            rounded-2xl
            bg-cyan-500/10
            p-4
          ">

            <p className="text-xs text-slate-400">
              Home Win
            </p>

            <h2 className="
              text-3xl
              font-black
              text-cyan-400
            ">
              {simulation.winProbabilityHome ?? 0}%
            </h2>

          </div>

          <div className="
            rounded-2xl
            bg-white/5
            p-4
          ">

            <p className="text-xs text-slate-400">
              Draw
            </p>

            <h2 className="
              text-3xl
              font-black
            ">
              {simulation.drawProbability ?? 0}%
            </h2>

          </div>

          <div className="
            rounded-2xl
            bg-red-500/10
            p-4
          ">

            <p className="text-xs text-slate-400">
              Away Win
            </p>

            <h2 className="
              text-3xl
              font-black
              text-red-400
            ">
              {simulation.winProbabilityAway ?? 0}%
            </h2>

          </div>

        </div>

        <div className="
          grid
          grid-cols-2
          gap-4
        ">

          <div className="
            rounded-2xl
            bg-white/5
            p-4
          ">

            <p className="text-sm text-slate-400">
              Expected Goals
            </p>

            <h2 className="
              text-2xl
              font-black
            ">
              {simulation.expectedGoalsHome ?? 0}
              {' '}x{' '}
              {simulation.expectedGoalsAway ?? 0}
            </h2>

          </div>

          <div className="
            rounded-2xl
            bg-white/5
            p-4
          ">

            <p className="text-sm text-slate-400">
              Chaos Level
            </p>

            <h2 className="
              text-2xl
              font-black
              text-violet-400
            ">
              {simulation.chaosLevel ?? 0}%
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}