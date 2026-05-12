import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

type Props = {
  data: {
    time: string;
    confidence: number;
  }[];
};

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
        w-full
        min-w-0
        overflow-hidden
        rounded-3xl
        bg-white/5
        border border-cyan-500/10
        p-6
      "
    >

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-black">
          📡 Live Confidence
        </h2>

        <div className="flex items-center gap-2 text-green-400 text-sm">

          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

          LIVE

        </div>

      </div>

      <div className="w-full h-[350px] min-w-0">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={safeData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 10
            }}
          >

            <defs>

              <linearGradient
                id="colorConfidence"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#06b6d4"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#06b6d4"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.08}
            />

            <XAxis
              dataKey="time"
              tick={{
                fill: '#94a3b8',
                fontSize: 11
              }}
            />

            <YAxis
              tick={{
                fill: '#94a3b8'
              }}
              domain={[0, 100]}
            />

            <Tooltip
              contentStyle={{
                background: '#020617',
                border: '1px solid #0f172a',
                borderRadius: 16
              }}
            />

            <Area
              type="monotone"
              dataKey="confidence"
              stroke="#06b6d4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorConfidence)"
              isAnimationActive
              animationDuration={1200}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}