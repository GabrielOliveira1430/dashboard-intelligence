import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

import {
  useFootballRealtimeStore
} from '../../store/footballRealtime.store';

export default function FootballNeuralVisualizer() {

  const timeline =
    useFootballRealtimeStore(
      s => s.timeline
    );

  const data =
    timeline.map(
      (item: any, index) => ({

        index,

        homePressure:
          item.homePressure || 0,

        awayPressure:
          item.awayPressure || 0,

        momentum:
          item.momentum || 0,

        goalProbability:
          item.goalProbability || 0
      })
    );

  return (

    <div className="
      rounded-3xl
      border
      border-cyan-500/20
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
    ">

      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <div>

          <h2 className="
            text-3xl
            font-black
          ">
            🧠 Neural Match Visualizer
          </h2>

          <p className="
            text-slate-400
            mt-1
          ">
            AI realtime tactical analysis
          </p>

        </div>

        <div className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-2xl
          border
          border-emerald-500/20
          bg-emerald-500/10
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
            text-emerald-400
          ">
            LIVE AI
          </span>

        </div>

      </div>

      {/* PRESSURE FLOW */}

      <div className="mb-10">

        <h3 className="
          text-xl
          font-black
          mb-4
        ">
          ⚡ Pressure Flow
        </h3>

        <div className="h-[300px]">

          <ResponsiveContainer>

            <AreaChart data={data}>

              <defs>

                <linearGradient
                  id="homePressure"
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

                <linearGradient
                  id="awayPressure"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#ef4444"
                    stopOpacity={0.5}
                  />

                  <stop
                    offset="95%"
                    stopColor="#ef4444"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.08}
              />

              <XAxis dataKey="index" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="homePressure"
                stroke="#06b6d4"
                fill="url(#homePressure)"
                strokeWidth={3}
              />

              <Area
                type="monotone"
                dataKey="awayPressure"
                stroke="#ef4444"
                fill="url(#awayPressure)"
                strokeWidth={3}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* MOMENTUM */}

      <div className="mb-10">

        <h3 className="
          text-xl
          font-black
          mb-4
        ">
          🌊 Momentum Waves
        </h3>

        <div className="h-[300px]">

          <ResponsiveContainer>

            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.08}
              />

              <XAxis dataKey="index" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="momentum"
                stroke="#8b5cf6"
                strokeWidth={4}
                dot={false}
                isAnimationActive
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* GOAL PROBABILITY */}

      <div>

        <h3 className="
          text-xl
          font-black
          mb-4
        ">
          🎯 Goal Probability Pulse
        </h3>

        <div className="h-[300px]">

          <ResponsiveContainer>

            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.08}
              />

              <XAxis dataKey="index" />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="goalProbability"
                stroke="#22c55e"
                strokeWidth={4}
                dot={false}
                isAnimationActive
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}