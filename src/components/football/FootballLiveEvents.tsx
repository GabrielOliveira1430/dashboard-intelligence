import {
  useFootballRealtimeStore
} from '../../store/footballRealtime.store';

export default function FootballLiveEvents() {

  const data =
    useFootballRealtimeStore(
      (state: any) =>
        state.data
    );

  const matches =
    data?.matches || [];

  return (

    <div className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-emerald-500/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
    ">

      <div className="
        absolute
        top-0
        left-0
        w-40
        h-40
        bg-emerald-500/10
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
            📡 Live Events
          </h2>

          <p className="
            text-sm
            text-slate-400
            mt-1
          ">
            Match realtime feed
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
            matches.map(
              (
                match: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.03]
                    p-4
                  "
                >

                  <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    mb-3
                  ">

                    <p className="
                      font-black
                    ">
                      {match.homeTeam} vs {match.awayTeam}
                    </p>

                    <span className="
                      text-xs
                      px-2
                      py-1
                      rounded-lg
                      bg-emerald-500/10
                      border
                      border-emerald-500/20
                      text-emerald-400
                      font-black
                    ">
                      {match.status}
                    </span>

                  </div>

                  <div className="
                    flex
                    items-center
                    justify-between
                    text-sm
                    text-slate-400
                  ">

                    <span>
                      Minute: {match.minute || 0}'
                    </span>

                    <span>
                      {match.homeScore || 0} x {match.awayScore || 0}
                    </span>

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