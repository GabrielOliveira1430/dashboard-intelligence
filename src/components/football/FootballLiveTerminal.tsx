import {
  useFootballRealtimeStore
} from '../../store/footballRealtime.store';

export default function FootballLiveTerminal() {

  const logs =
    useFootballRealtimeStore(
      s => s.terminalLogs
    );

  return (

    <div className="
      rounded-3xl
      border
      border-cyan-500/20
      bg-black
      p-6
      h-[420px]
      overflow-auto
      font-mono
      text-sm
    ">

      <div className="
        flex
        items-center
        gap-2
        mb-4
      ">

        <div className="
          w-3
          h-3
          rounded-full
          bg-green-400
          animate-pulse
        " />

        <h2 className="
          font-black
          text-green-400
        ">
          LIVE AI TERMINAL
        </h2>

      </div>

      <div className="space-y-2">

        {
          logs.map((log, i) => (

            <div
              key={i}
              className="
                text-green-400
                opacity-90
              "
            >
              {log}
            </div>
          ))
        }

      </div>

    </div>
  );
}