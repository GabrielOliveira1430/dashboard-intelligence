import {
  useMemo
} from 'react';

import {
  useFootballRealtimeStore
} from '../../store/footballRealtime.store';

export default function FootballDangerMeter() {

  const data =
    useFootballRealtimeStore(
      (state: any) =>
        state.data
    );

  const bestPrediction =
    data?.bestPrediction;

  const danger =
    useMemo(() => {

      if (!bestPrediction) {

        return 30;
      }

      return Math.min(
        100,
        Math.max(
          0,
          100 - bestPrediction.risk
        )
      );

    }, [bestPrediction]);

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

      <div className="
        absolute
        bottom-0
        right-0
        w-40
        h-40
        bg-red-500/10
        blur-3xl
      " />

      <div className="
        relative
        z-10
      ">

        <div className="
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
              ☢️ Danger Meter
            </h2>

            <p className="
              text-sm
              text-slate-400
              mt-1
            ">
              Volatility intelligence
            </p>

          </div>

          <div className="
            text-4xl
          ">
            🚨
          </div>

        </div>

        <div className="
          flex
          items-end
          justify-center
          h-[220px]
          gap-3
        ">

          {
            [25, 45, 65, 85, danger].map(
              (
                value,
                index
              ) => (

                <div
                  key={index}
                  className="
                    flex-1
                    rounded-t-3xl
                    bg-gradient-to-t
                    from-red-600
                    to-orange-400
                    transition-all
                    duration-500
                  "
                  style={{
                    height: `${value}%`
                  }}
                />
              )
            )
          }

        </div>

        <div className="
          mt-6
          text-center
        ">

          <p className="
            text-5xl
            font-black
            text-red-400
          ">
            {danger}%
          </p>

          <p className="
            text-sm
            text-slate-400
            mt-2
          ">
            Neural risk pressure
          </p>

        </div>

      </div>

    </div>
  );
}