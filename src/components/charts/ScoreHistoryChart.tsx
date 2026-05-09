import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

type Props = {
  data: {
    time: string;
    score: number;
  }[];
};

export default function ScoreHistoryChart({
  data
}: Props) {

  return (

    <div className="
      rounded-3xl
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
      shadow-2xl
    ">

      <div className="mb-6">

        <h2 className="
          text-2xl
          font-black
          mb-2
        ">
          📈 Score History
        </h2>

        <p className="text-slate-400">
          Evolução das estratégias em tempo real
        </p>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="time"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#06b6d4"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}