export default function FootballTacticalLegend() {

  const items = [

    {
      color: 'bg-cyan-400',
      label: 'Momentum'
    },

    {
      color: 'bg-orange-400',
      label: 'Pressure'
    },

    {
      color: 'bg-red-400',
      label: 'Danger'
    },

    {
      color: 'bg-emerald-400',
      label: 'Confidence'
    },

    {
      color: 'bg-violet-400',
      label: 'Quantum Signal'
    }
  ];

  return (

    <div className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-violet-500/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
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

      <div className="
        relative
        z-10
      ">

        <div className="mb-6">

          <h2 className="
            text-2xl
            font-black
          ">
            🧠 Tactical Legend
          </h2>

          <p className="
            text-sm
            text-slate-400
            mt-1
          ">
            Neural tactical indicators
          </p>

        </div>

        <div className="
          flex
          flex-col
          gap-4
        ">

          {
            items.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.03]
                    p-4
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <div
                      className={`
                        w-4
                        h-4
                        rounded-full
                        ${item.color}
                      `}
                    />

                    <p className="
                      font-semibold
                    ">
                      {item.label}
                    </p>

                  </div>

                  <div className="
                    text-xs
                    text-slate-500
                  ">
                    ACTIVE
                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}