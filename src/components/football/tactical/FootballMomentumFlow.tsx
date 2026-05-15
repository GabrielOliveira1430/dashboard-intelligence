import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';

import {
  useFootballRealtimeStore
} from '../../../store/footballRealtime.store';

export default function FootballMomentumFlow() {

  const data =
    useFootballRealtimeStore(
      (state: any) => state.data
    );

  const predictions =
    data?.predictions ?? [];

  // ==========================================
  // 🛡 SAFE CHART DATA
  // ==========================================

  const chartData =
    Array.isArray(predictions)
      ? predictions.slice(0, 10).map(
          (item: any, index: number) => ({
            time: String(index + 1),

            confidence: Number(item?.confidence ?? 0),

            pressure: Number(
              item?.pressure?.goalProbability ?? 0
            )
          })
        )
      : [];

  // ==========================================
  // ⚠️ EMPTY STATE PROTECTION
  // ==========================================

  const hasData =
    chartData.length > 0;

  return (

    <div className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-500/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
      min-h-[320px]
    ">

      {/* BG EFFECT */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/10 blur-3xl" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-black">
            ⚡ Momentum Flow
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Neural momentum tracking
          </p>
        </div>

        <div className="
          px-3 py-2 rounded-xl
          border border-cyan-500/20
          bg-cyan-500/10
          text-cyan-400
          text-xs font-black
        ">
          LIVE FLOW
        </div>

      </div>

      {/* EMPTY STATE (IMPORTANT FIX) */}
      {!hasData ? (
        <div className="
          relative z-10
          h-[220px]
          flex items-center justify-center
          text-slate-500
          text-sm
        ">
          Waiting realtime data...
        </div>
      ) : (

        <div className="relative z-10 h-[320px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={chartData}>

              <defs>
                <linearGradient
                  id="momentumGradient"
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

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.05}
              />

              <XAxis
                dataKey="time"
                tick={{
                  fill: '#94a3b8',
                  fontSize: 11
                }}
              />

              <YAxis
                domain={[0, 100]}
                tick={{
                  fill: '#94a3b8',
                  fontSize: 11
                }}
              />

              <Tooltip
                contentStyle={{
                  background: 'rgba(2,6,23,0.95)',
                  border: '1px solid rgba(6,182,212,0.2)',
                  borderRadius: '16px',
                  color: '#fff'
                }}
              />

              <Area
                type="monotone"
                dataKey="confidence"
                stroke="#06b6d4"
                strokeWidth={3}
                fill="url(#momentumGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}