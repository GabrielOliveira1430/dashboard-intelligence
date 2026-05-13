import {
  useFootballRealtimeStore
} from '../../store/footballRealtime.store';

export default function FootballAlertsFeed() {

  const alerts =
    useFootballRealtimeStore(
      s => s.alerts
    );

  return (

    <div className="
      rounded-3xl
      border
      border-red-500/20
      bg-red-500/5
      p-6
      h-[400px]
      overflow-auto
    ">

      <h2 className="
        text-2xl
        font-black
        mb-6
      ">
        🚨 AI Alerts
      </h2>

      <div className="space-y-4">

        {
          alerts.map((alert, i) => (

            <div
              key={i}
              className="
                p-4
                rounded-2xl
                bg-white/5
                border
                border-white/5
              "
            >

              <p className="
                font-bold
                text-red-400
              ">
                {alert.title}
              </p>

              <p className="
                text-sm
                text-slate-300
                mt-1
              ">
                {alert.message}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
}