import {
  useFootballRealtimeStore
} from '../../store/footballRealtime.store';

export default function FootballHeatIndex() {

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
      border-orange-500/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
    ">

      <div className="
        absolute
        top-0
        right-0
        w-40
        h-40
        bg-orange-500/10
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
            🔥 Heat Index
          </h2>

          <p className="
            text-sm
            text-slate-400
            mt-1
          ">
            Neural pressure zones
          </p>

        </div>

        <div className="
          flex
          flex-col
          gap-4
        ">

          {
            predictions.slice(0, 6).map(
              (
                item: any,
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
                    mb-3
                  ">

                    <p className="
                      font-black
                      text-sm
                    ">
                      {item.homeTeam}
                    </p>

                    <p className="
                      text-orange-400
                      font-black
                    ">
                      {item.confidence}%
                    </p>

                  </div>

                  <div className="
                    h-3
                    rounded-full
                    overflow-hidden
                    bg-[#0f172a]
                  ">

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-orange-400
                        to-red-500
                      "
                      style={{
                        width: `${item.confidence}%`
                      }}
                    />

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