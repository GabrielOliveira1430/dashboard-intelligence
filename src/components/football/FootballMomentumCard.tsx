// src/components/football/FootballMomentumCard.tsx

import {
  Activity,
  TrendingUp,
  Zap
} from 'lucide-react';

// ==========================================
// 🧠 MOCK DATA
// ==========================================

const momentumData = [

  {
    team: 'Barcelona',
    momentum: 92,
    trend: '+12%',
    status: 'DOMINATING'
  },

  {
    team: 'Liverpool',
    momentum: 81,
    trend: '+8%',
    status: 'PRESSURE'
  },

  {
    team: 'Bayern',
    momentum: 74,
    trend: '+4%',
    status: 'CONTROL'
  }
];

// ==========================================
// 🎨 HELPERS
// ==========================================

function getMomentumColor(
  value: number
) {

  if (value >= 85) {
    return 'bg-emerald-400';
  }

  if (value >= 70) {
    return 'bg-cyan-400';
  }

  if (value >= 50) {
    return 'bg-yellow-400';
  }

  return 'bg-red-400';
}

function getStatusStyle(
  status: string
) {

  switch (status) {

    case 'DOMINATING':

      return `
        bg-emerald-500/10
        border-emerald-500/20
        text-emerald-400
      `;

    case 'PRESSURE':

      return `
        bg-cyan-500/10
        border-cyan-500/20
        text-cyan-400
      `;

    case 'CONTROL':

      return `
        bg-yellow-500/10
        border-yellow-500/20
        text-yellow-400
      `;

    default:

      return `
        bg-slate-500/10
        border-slate-500/20
        text-slate-300
      `;
  }
}

// ==========================================
// ⚽ COMPONENT
// ==========================================

export default function FootballMomentumCard() {

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
        mb-6
      ">

        <div>

          <h2 className="
            text-2xl
            font-black
            flex
            items-center
            gap-3
          ">

            <Activity
              className="
                text-cyan-400
              "
              size={26}
            />

            Momentum AI

          </h2>

          <p className="
            text-sm
            text-slate-400
            mt-2
          ">
            Live neural pressure tracking
          </p>

        </div>

        <div className="
          flex
          items-center
          gap-2
          rounded-2xl
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
            text-emerald-400
            tracking-wider
          ">
            LIVE
          </span>

        </div>

      </div>

      {/* LIST */}

      <div className="
        relative
        z-10
        space-y-5
      ">

        {
          momentumData.map((item) => (

            <div
              key={item.team}
              className="
                rounded-2xl
                border
                border-white/5
                bg-black/20
                p-4
              "
            >

              {/* TOP */}

              <div className="
                flex
                items-center
                justify-between
                gap-4
                mb-3
              ">

                <div>

                  <h3 className="
                    text-lg
                    font-black
                  ">
                    {item.team}
                  </h3>

                  <p className="
                    text-sm
                    text-slate-400
                    mt-1
                  ">
                    Neural momentum activity
                  </p>

                </div>

                <div
                  className={`
                    px-3
                    py-1.5
                    rounded-xl
                    border
                    text-xs
                    font-black
                    tracking-wide
                    ${getStatusStyle(
                      item.status
                    )}
                  `}
                >
                  {item.status}
                </div>

              </div>

              {/* BAR */}

              <div className="mb-3">

                <div className="
                  flex
                  items-center
                  justify-between
                  text-sm
                  mb-2
                ">

                  <span className="
                    text-slate-400
                  ">
                    Momentum
                  </span>

                  <span className="
                    font-black
                    text-cyan-400
                  ">
                    {item.momentum}%
                  </span>

                </div>

                <div className="
                  h-3
                  overflow-hidden
                  rounded-full
                  bg-white/10
                ">

                  <div
                    className={`
                      h-full
                      rounded-full
                      transition-all
                      duration-1000
                      ${getMomentumColor(
                        item.momentum
                      )}
                    `}
                    style={{
                      width:
                        `${item.momentum}%`
                    }}
                  />

                </div>

              </div>

              {/* FOOTER */}

              <div className="
                flex
                items-center
                justify-between
                gap-3
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-emerald-400
                  font-bold
                ">

                  <TrendingUp
                    size={16}
                  />

                  {item.trend}

                </div>

                <div className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-yellow-400
                  font-bold
                  tracking-wide
                ">

                  <Zap
                    size={14}
                  />

                  AI ACTIVE

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}