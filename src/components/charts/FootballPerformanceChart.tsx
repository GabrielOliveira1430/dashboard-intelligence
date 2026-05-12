import {

  ResponsiveContainer,

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

  Cell

} from 'recharts';

// ==========================================
// 🧠 TYPES
// ==========================================

type Props = {

  data: {

    team: string;

    performance: number;

  }[];
};

// ==========================================
// 🎨 COLORS
// ==========================================

function getBarColor(
  performance: number
) {

  if (performance >= 80) {
    return '#10b981';
  }

  if (performance >= 60) {
    return '#06b6d4';
  }

  if (performance >= 40) {
    return '#facc15';
  }

  return '#ef4444';
}

// ==========================================
// 💬 TOOLTIP
// ==========================================

type TooltipProps = {

  active?: boolean;

  payload?: any[];
};

function CustomTooltip({
  active,
  payload
}: TooltipProps) {

  if (
    !active ||
    !payload?.length
  ) {
    return null;
  }

  const item =
    payload[0]?.payload;

  return (

    <div className="
      rounded-2xl
      border
      border-cyan-500/20
      bg-[#020617]/95
      backdrop-blur-xl
      p-4
      shadow-2xl
    ">

      <p className="
        text-sm
        text-slate-400
        mb-2
      ">
        Team
      </p>

      <p className="
        text-lg
        font-black
        text-white
        mb-3
      ">
        {item.team}
      </p>

      <p className="
        text-xs
        text-slate-400
        mb-1
      ">
        Performance
      </p>

      <p className="
        text-2xl
        font-black
        text-cyan-400
      ">
        {item.performance}%
      </p>

    </div>
  );
}

// ==========================================
// 📈 CHART
// ==========================================

export default function FootballPerformanceChart({
  data
}: Props) {

  const safeData =
    Array.isArray(data)
      ? data
      : [];

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-500/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-6
      "
    >

      {/* BG GLOW */}

      <div className="
        absolute
        top-0
        right-0
        w-40
        h-40
        bg-cyan-500/10
        blur-3xl
      " />

      {/* HEADER */}

      <div className="
        relative
        z-10
        flex
        items-center
        justify-between
        gap-4
        mb-6
      ">

        <div>

          <h2 className="
            text-2xl
            font-black
          ">
            📈 Team Performance
          </h2>

          <p className="
            text-sm
            text-slate-400
            mt-1
          ">
            Top realtime teams
          </p>

        </div>

        <div className="
          rounded-xl
          border
          border-cyan-500/20
          bg-cyan-500/10
          px-3
          py-2
        ">

          <span className="
            text-xs
            font-black
            tracking-wide
            text-cyan-400
          ">
            REALTIME
          </span>

        </div>

      </div>

      {/* CHART */}

      <div className="
        relative
        z-10
        h-[350px]
        w-full
        min-w-0
      ">

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart
            data={safeData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 10
            }}
          >

            {/* GRID */}

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.06}
            />

            {/* X */}

            <XAxis
              dataKey="team"
              tick={{
                fill: '#94a3b8',
                fontSize: 11
              }}
              tickMargin={10}
              minTickGap={20}
            />

            {/* Y */}

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: '#94a3b8',
                fontSize: 11
              }}
              tickMargin={10}
            />

            {/* TOOLTIP */}

            <Tooltip
              content={
                <CustomTooltip />
              }
            />

            {/* BAR */}

            <Bar
              dataKey="performance"
              radius={[10, 10, 0, 0]}
              animationDuration={900}
            >

              {
                safeData.map(
                  (
                    item,
                    index
                  ) => (

                    <Cell
                      key={index}
                      fill={
                        getBarColor(
                          item.performance
                        )
                      }
                    />
                  )
                )
              }

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}