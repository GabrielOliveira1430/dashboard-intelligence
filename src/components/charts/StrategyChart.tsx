import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

type Props = {
  data: {
    number: number | string;
    score: number;
  }[];
};

export default function StrategyChart({
  data
}: Props) {

  if (!data || data.length === 0) {

    return (

      <div className="
        w-full
        h-[420px]
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        flex
        items-center
        justify-center
      ">

        <p className="text-slate-400">
          Nenhum dado disponível
        </p>

      </div>
    );
  }

  return (

    <div className="
      w-full
      min-w-0
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
      shadow-2xl
    ">

      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
        mb-8
      ">

        <div>

          <h2 className="
            text-xl
            md:text-2xl
            font-black
            text-white
          ">
            🔥 Hot Numbers
          </h2>

          <p className="
            text-slate-400
            text-sm
            mt-1
          ">
            Tendência dos números em tempo real
          </p>

        </div>

        <div className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-2xl
          bg-cyan-500/10
          border
          border-cyan-500/20
          text-cyan-400
          text-sm
          font-bold
        ">

          <div className="
            w-2
            h-2
            rounded-full
            bg-cyan-400
            animate-pulse
          " />

          LIVE

        </div>

      </div>

      {/* CHART */}

      <div
        className="
          w-full
          min-w-0
        "
        style={{
          height: 380,
          minHeight: 380
        }}
      >

        <ResponsiveContainer
          width="99%"
          height={380}
        >

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0
            }}
          >

            <defs>

              <linearGradient
                id="colorScore"
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
              stroke="#1e293b"
              vertical={false}
            />

            <XAxis
              dataKey="number"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: '#020817',
                border:
                  '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                color: '#fff'
              }}
            />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#06b6d4"
              fillOpacity={1}
              fill="url(#colorScore)"
              strokeWidth={4}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}