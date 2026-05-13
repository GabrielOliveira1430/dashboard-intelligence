type Props = {

  simulation: any;
};

export default function FootballQuantumSimulator({
  simulation
}: Props) {

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
              {simulation.simulations}
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
              {simulation.winProbabilityHome}%
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
              {simulation.drawProbability}%
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
              {simulation.winProbabilityAway}%
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
              {simulation.expectedGoalsHome}
              {' '}x{' '}
              {simulation.expectedGoalsAway}
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
              {simulation.chaosLevel}%
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}