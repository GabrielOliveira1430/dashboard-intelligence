import {

  ResponsiveContainer,

  LineChart,

  Line,

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

    match: string;

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

  const item =
    payload[0]?.payload;

  return (

    <div
      className="
        rounded-2xl
        border
        border-cyan-500/20
        bg-[#020617]/95
        backdrop-blur-xl
        p-4
        shadow-2xl
      "
    >

      <p className="
        text-xs
        text-slate-400
        mb-1
      ">
        Match
      </p>

      <p className="
        text-sm
        font-bold
        text-white
        mb-3
      ">
        {item.match}
      </p>

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
        {item.confidence}%
      </p>

    </div>
  );
}

// ==========================================
// 📈 CHART
// ==========================================

export default function FootballPredictionChart({
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
        border-violet-500/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-6
        w-full
        min-w-0
      "
    >

      {/* BG GLOW */}

      <div
        className="
          absolute
          top-0
          right-0
          w-40
          h-40
          bg-violet-500/10
          blur-3xl
        "
      />

      {/* HEADER */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-4
          mb-6
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-black
            "
          >
            🎯 Prediction Confidence
          </h2>

          <p
            className="
              text-sm
              text-slate-400
              mt-1
            "
          >
            AI prediction accuracy
          </p>

        </div>

        <div
          className="
            rounded-xl
            border
            border-violet-500/20
            bg-violet-500/10
            px-3
            py-2
          "
        >

          <span
            className="
              text-xs
              font-black
              tracking-wide
              text-violet-400
            "
          >
            LIVE
          </span>

        </div>

      </div>

      {/* CHART */}

      <div
        className="
          relative
          z-10
          h-[350px]
          w-full
          min-w-0
        "
      >

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart
            data={safeData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 10
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.06}
            />

            <XAxis
              dataKey="match"
              tick={{
                fill: '#94a3b8',
                fontSize: 11
              }}
              tickMargin={10}
              minTickGap={25}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: '#94a3b8',
                fontSize: 11
              }}
              tickMargin={10}
            />

            <Tooltip
              content={
                <CustomTooltip />
              }
            />

            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6
              }}
              isAnimationActive
              animationDuration={700}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}