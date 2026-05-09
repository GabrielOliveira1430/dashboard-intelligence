import MainLayout from '../components/layout/MainLayout';

export default function Simulator() {

  return (

    <MainLayout>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="
          text-5xl
          font-black
          tracking-tight
          mb-3
        ">
          Simulator
        </h1>

        <p className="text-slate-400 text-lg">
          AI simulation environment
        </p>

      </div>

      {/* GRID */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-8
        mb-10
      ">

        {/* MAIN */}
        <div className="
          xl:col-span-2
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-8
          shadow-2xl
        ">

          {/* Glow */}
          <div className="
            absolute
            top-0
            right-0
            w-72
            h-72
            bg-cyan-500/10
            blur-3xl
          " />

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-10">

              <div>

                <h2 className="
                  text-4xl
                  font-black
                  mb-3
                ">
                  🎯 Smart Simulator
                </h2>

                <p className="text-slate-400 text-lg">
                  Simulação inteligente em tempo real
                </p>

              </div>

              <div className="
                bg-green-500/10
                border
                border-green-500/20
                text-green-400
                px-5
                py-3
                rounded-2xl
                font-bold
              ">

                ACTIVE

              </div>

            </div>

            {/* FAKE TERMINAL */}
            <div className="
              rounded-3xl
              border
              border-white/10
              bg-black/40
              p-6
              font-mono
              text-sm
            ">

              <div className="space-y-4">

                <p className="text-green-400">
                  ✓ AI Engine initialized
                </p>

                <p className="text-cyan-400">
                  ✓ Strategies loaded
                </p>

                <p className="text-purple-400">
                  ✓ Neural prediction online
                </p>

                <p className="text-yellow-400">
                  ✓ Waiting simulation...
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* SIDE */}
        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-8
          shadow-2xl
        ">

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">
            ⚡ Stats
          </h2>

          <div className="space-y-6">

            <div className="
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-5
            ">

              <p className="
                text-slate-400
                text-sm
                mb-2
              ">
                Simulations
              </p>

              <h3 className="
                text-4xl
                font-black
              ">
                1.2K
              </h3>

            </div>

            <div className="
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-5
            ">

              <p className="
                text-slate-400
                text-sm
                mb-2
              ">
                Accuracy
              </p>

              <h3 className="
                text-4xl
                font-black
              ">
                91%
              </h3>

            </div>

            <div className="
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-5
            ">

              <p className="
                text-slate-400
                text-sm
                mb-2
              ">
                AI Status
              </p>

              <h3 className="
                text-2xl
                font-black
                text-green-400
              ">
                ONLINE
              </h3>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}