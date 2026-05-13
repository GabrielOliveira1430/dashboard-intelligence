type Props = {

  homeTeam: string;

  awayTeam: string;

  homeDanger: number;

  awayDanger: number;

  possessionHome: number;

  possessionAway: number;
};

export default function FootballTacticalMap({

  homeTeam,
  awayTeam,
  homeDanger,
  awayDanger,
  possessionHome,
  possessionAway

}: Props) {

  return (

    <div className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-500/20
      bg-[#020617]
      p-6
    ">

      {/* FIELD */}

      <div className="
        relative
        h-[420px]
        rounded-3xl
        border
        border-white/10
        bg-gradient-to-b
        from-emerald-900
        to-emerald-700
        overflow-hidden
      ">

        {/* FIELD LINES */}

        <div className="
          absolute
          inset-0
          border-4
          border-white/20
          rounded-3xl
        " />

        <div className="
          absolute
          left-1/2
          top-0
          bottom-0
          w-[2px]
          bg-white/20
          -translate-x-1/2
        " />

        <div className="
          absolute
          left-1/2
          top-1/2
          w-28
          h-28
          rounded-full
          border-4
          border-white/20
          -translate-x-1/2
          -translate-y-1/2
        " />

        {/* HOME PRESSURE */}

        <div
          className="
            absolute
            left-[12%]
            top-1/2
            w-40
            h-40
            rounded-full
            blur-3xl
            bg-cyan-400/40
            animate-pulse
          "
          style={{
            opacity:
              homeDanger / 100
          }}
        />

        {/* AWAY PRESSURE */}

        <div
          className="
            absolute
            right-[12%]
            top-1/2
            w-40
            h-40
            rounded-full
            blur-3xl
            bg-red-500/40
            animate-pulse
          "
          style={{
            opacity:
              awayDanger / 100
          }}
        />

        {/* BALL */}

        <div
          className="
            absolute
            top-1/2
            w-6
            h-6
            rounded-full
            bg-white
            shadow-2xl
            transition-all
            duration-700
          "
          style={{
            left: `${possessionHome}%`
          }}
        />

      </div>

      {/* INFO */}

      <div className="
        mt-5
        grid
        grid-cols-2
        gap-4
      ">

        <div className="
          rounded-2xl
          bg-cyan-500/10
          border
          border-cyan-500/20
          p-4
        ">

          <p className="text-sm text-slate-400">
            {homeTeam}
          </p>

          <h2 className="
            text-3xl
            font-black
            text-cyan-400
          ">
            {homeDanger}%
          </h2>

        </div>

        <div className="
          rounded-2xl
          bg-red-500/10
          border
          border-red-500/20
          p-4
        ">

          <p className="text-sm text-slate-400">
            {awayTeam}
          </p>

          <h2 className="
            text-3xl
            font-black
            text-red-400
          ">
            {awayDanger}%
          </h2>

        </div>

      </div>

    </div>
  );
}