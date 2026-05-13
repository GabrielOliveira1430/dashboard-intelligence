import {
  useFootballRealtimeStore
} from '../../store/footballRealtime.store';

export default function FootballAlerts() {

  const data =
    useFootballRealtimeStore(
      (state: any) =>
        state.data
    );

  const predictions =
    data?.predictions || [];

  const alerts =
    predictions
      .filter(
        (item: any) =>
          item.confidence >= 80
      )
      .slice(0, 5);

  return (

    <div className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-yellow-500/10
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
        bg-yellow-500/10
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
            🚨 AI Alerts
          </h2>

          <p className="
            text-sm
            text-slate-400
            mt-1
          ">
            High confidence detections
          </p>

        </div>

        <div className="
          flex
          flex-col
          gap-4
        ">

          {
            alerts.map(
              (
                item: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-yellow-500/20
                    bg-yellow-500/10
                    p-4
                  "
                >

                  <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  ">

                    <div>

                      <p className="
                        font-black
                      ">
                        {item.homeTeam} vs {item.awayTeam}
                      </p>

                      <p className="
                        text-sm
                        text-slate-300
                        mt-1
                      ">
                        {item.market}
                      </p>

                    </div>

                    <div className="
                      text-yellow-400
                      font-black
                      text-xl
                    ">
                      {item.confidence}%
                    </div>

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