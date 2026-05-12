import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

type Props = {
  data: {
    match: string;
    confidence: number;
  }[];
};

export default function FootballPredictionChart({
  data
}: Props) {

  return (

    <div className="p-6 rounded-3xl bg-white/5 border border-white/5">

      <h2 className="text-2xl font-black mb-6">
        🎯 Prediction Confidence
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="match"
              tick={{ fill: '#94a3b8' }}
            />

            <YAxis
              tick={{ fill: '#94a3b8' }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="confidence"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}