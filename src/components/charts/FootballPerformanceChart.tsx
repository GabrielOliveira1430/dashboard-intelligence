import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

type Props = {
  data: {
    team: string;
    performance: number;
  }[];
};

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
          📈 Team Performance
        </h2>

        <span className="text-xs text-cyan-400">
          REALTIME
        </span>

      </div>

      <div className="w-full h-[350px] min-w-0">

        <ResponsiveContainer
          width="100%"
          height="100%"
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

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.08}
            />

            <XAxis
              dataKey="team"
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

            <Bar
              dataKey="performance"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}