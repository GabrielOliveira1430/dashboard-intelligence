import {
  useFootballRealtimeStore
} from '../../store/footballRealtime.store';

export default function FootballTimeline() {

  const data =
    useFootballRealtimeStore(
      (state: any) =>
        state.data
    );

  const predictions =
    data?.predictions || [];

  return (

    <div className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-violet-500/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
    ">

      <div className="
        absolute
        bottom-0
        left-0
        w-40
        h-40
        bg-violet-500/10
        blur-3xl
      " />

      <div className="
        relative
        z-10
      ">

        <div className="mb-6">

          <h2 className="
            text-2xl
            font-black
          ">
            🕒 Match Timeline
          </h2>

          <p className="
            text-sm
            text-slate-400
            mt-1
          ">
            Realtime neural events
          </p>

        </div>

        <div className="
          flex
          flex-col
          gap-4
          max-h-[420px]
          overflow-auto
          pr-2
        ">

          {
            predictions.slice(0, 8).map(
              (
                item: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="
                    flex
                    gap-4
                  "
                >

                  <div className="
                    flex
                    flex-col
                    items-center
                  ">

                    <div className="
                      w-4
                      h-4
                      rounded-full
                      bg-violet-400
                      shadow-lg
                      shadow-violet-500/40
                    " />

                    <div className="
                      w-[2px]
                      flex-1
                      bg-white/10
                    " />

                  </div>

                  <div className="
                    flex-1
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.03]
                    p-4
                  ">

                    <div className="
                      flex
                      items-center
                      justify-between
                      gap-3
                      mb-2
                    ">

                      <p className="
                        font-black
                      ">
                        {item.homeTeam} vs {item.awayTeam}
                      </p>

                      <span className="
                        text-xs
                        px-2
                        py-1
                        rounded-lg
                        bg-violet-500/10
                        border
                        border-violet-500/20
                        text-violet-400
                        font-black
                      ">
                        {item.confidence}%
                      </span>

                    </div>

                    <p className="
                      text-sm
                      text-slate-400
                    ">
                      {item.recommendation}
                    </p>

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}