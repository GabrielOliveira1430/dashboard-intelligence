import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import {
  useFootballRealtimeStore
} from '../../../store/footballRealtime.store';

// ==========================================
// ⚽ DANGER RADAR
// ==========================================

export default function FootballDangerRadar() {

  const data =
    useFootballRealtimeStore(
      (state: any) =>
        state.data
    );

  const bestPrediction =
    data?.bestPrediction;

  const confidence =
    bestPrediction?.confidence || 50;

  const risk =
    bestPrediction?.risk || 30;

  const edge =
    Math.min(
      100,
      Math.max(
        0,
        bestPrediction?.edge || 40
      )
    );

  const pressure =
    Math.min(
      100,
      Math.max(
        0,
        bestPrediction?.pressure
          ?.goalProbability || 60
      )
    );

  const radarData = [

    {
      subject: 'Confidence',
      value: confidence
    },

    {
      subject: 'Pressure',
      value: pressure
    },

    {
      subject: 'Edge',
      value: edge
    },

    {
      subject: 'Momentum',
      value:
        Math.min(
          100,
          confidence + 5
        )
    },

    {
      subject: 'Danger',
      value:
        Math.min(
          100,
          100 - risk
        )
    },

    {
      subject: 'Value',
      value:
        Math.min(
          100,
          edge + 20
        )
    }
  ];

  return (

    <div className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-red-500/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
    ">

      {/* BG */}

      <div className="
        absolute
        inset-0
        pointer-events-none
      ">

        <div className="
          absolute
          top-0
          right-0
          w-40
          h-40
          bg-red-500/10
          blur-3xl
        " />

        <div className="
          absolute
          bottom-0
          left-0
          w-40
          h-40
          bg-orange-500/10
          blur-3xl
        " />

      </div>

      {/* HEADER */}

      <div className="
        relative
        z-10
        flex
        items-center
        justify-between
        mb-6
      ">

        <div>

          <h2 className="
            text-2xl
            font-black
          ">
            ☢️ Danger Radar
          </h2>

          <p className="
            text-sm
            text-slate-400
            mt-1
          ">
            Neural risk analysis
          </p>

        </div>

        <div className="
          px-3
          py-2
          rounded-xl
          border
          border-red-500/20
          bg-red-500/10
          text-red-400
          text-xs
          font-black
          tracking-wide
        ">
          LIVE AI
        </div>

      </div>

      {/* CHART */}

      <div className="
        relative
        z-10
        h-[380px]
        w-full
      ">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <RadarChart
            outerRadius="75%"
            data={radarData}
          >

            <PolarGrid
              stroke="rgba(255,255,255,0.08)"
            />

            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: '#cbd5e1',
                fontSize: 12,
                fontWeight: 700
              }}
            />

            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{
                fill: '#64748b',
                fontSize: 10
              }}
            />

            <Tooltip
              contentStyle={{
                background:
                  'rgba(2,6,23,0.95)',
                border:
                  '1px solid rgba(239,68,68,0.2)',
                borderRadius: '16px',
                color: '#fff',
                backdropFilter:
                  'blur(16px)'
              }}
            />

            <Radar
              name="AI Danger"
              dataKey="value"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.35}
              strokeWidth={3}
            />

          </RadarChart>

        </ResponsiveContainer>

      </div>

      {/* FOOTER */}

      <div className="
        relative
        z-10
        mt-4
        grid
        grid-cols-3
        gap-3
      ">

        <div className="
          rounded-2xl
          border
          border-white/5
          bg-white/[0.03]
          p-4
        ">

          <p className="
            text-xs
            text-slate-400
            mb-1
          ">
            Match
          </p>

          <p className="
            text-sm
            font-black
            truncate
          ">
            {
              bestPrediction
                ? `${bestPrediction.homeTeam} vs ${bestPrediction.awayTeam}`
                : 'No Match'
            }
          </p>

        </div>

        <div className="
          rounded-2xl
          border
          border-white/5
          bg-white/[0.03]
          p-4
        ">

          <p className="
            text-xs
            text-slate-400
            mb-1
          ">
            Confidence
          </p>

          <p className="
            text-lg
            font-black
            text-cyan-400
          ">
            {confidence}%
          </p>

        </div>

        <div className="
          rounded-2xl
          border
          border-white/5
          bg-white/[0.03]
          p-4
        ">

          <p className="
            text-xs
            text-slate-400
            mb-1
          ">
            Risk
          </p>

          <p className="
            text-lg
            font-black
            text-red-400
          ">
            {risk}%
          </p>

        </div>

      </div>

    </div>
  );
}