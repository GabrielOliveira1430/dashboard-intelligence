import {

  ResponsiveContainer,

  AreaChart,

  Area,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid

} from 'recharts';

// ==========================================
// 🧠 TYPES
// ==========================================

type Props = {

  data: {

    time: string;

    confidence: number;

  }[];
};

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

  const value =
    payload[0]?.value || 0;

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
        text-xs
        text-slate-400
        mb-1
      ">
        Confidence
      </p>

      <p className="
        text-2xl
        font-black
        text-cyan-400
      ">
        {value}%
      </p>

    </div>
  );
}

// ==========================================
// 🎨 CHART
// ==========================================

export default function FootballLiveChart({
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
            📡 Live Confidence
          </h2>

          <p className="
            text-sm
            text-slate-400
            mt-1
          ">
            Realtime AI monitoring
          </p>

        </div>

        <div className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-emerald-500/20
          bg-emerald-500/10
          px-3
          py-2
        ">

          <div className="
            w-2
            h-2
            rounded-full
            bg-emerald-400
            animate-pulse
          " />

          <span className="
            text-xs
            font-black
            tracking-wide
            text-emerald-400
          ">
            LIVE
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

          <AreaChart
            data={safeData}
            margin={{
              top: 10,
              right: 10,
              left: -25,
              bottom: 0
            }}
          >

            {/* GRADIENT */}

            <defs>

              <linearGradient
                id="footballGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#06b6d4"
                  stopOpacity={0.5}
                />

                <stop
                  offset="95%"
                  stopColor="#06b6d4"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            {/* GRID */}

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.06}
            />

            {/* X */}

            <XAxis
              dataKey="time"
              tick={{
                fill: '#94a3b8',
                fontSize: 11
              }}
              tickMargin={10}
              minTickGap={25}
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

            {/* AREA */}

            <Area
              type="monotone"
              dataKey="confidence"
              stroke="#06b6d4"
              strokeWidth={3}
              fill="url(#footballGradient)"
              fillOpacity={1}
              isAnimationActive
              animationDuration={600}
              animationEasing="ease-out"
              activeDot={{
                r: 6
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}