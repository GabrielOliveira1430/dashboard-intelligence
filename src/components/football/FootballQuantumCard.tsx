import {
  useFootballRealtimeStore
} from '../../store/footballRealtime.store';

export default function FootballQuantumCard() {

  const quantum =
    useFootballRealtimeStore(
      s => s.quantumPredictions
    );

  const latest =
    quantum?.[0];

  return (

    <div className="
      rounded-3xl
      border
      border-violet-500/20
      bg-violet-500/5
      p-6
    ">

      <h2 className="
        text-2xl
        font-black
        mb-4
      ">
        ⚛️ Quantum Engine
      </h2>

      {
        latest ? (

          <>

            <p className="
              text-3xl
              font-black
              text-violet-400
            ">
              {latest.match}
            </p>

            <p className="
              mt-4
              text-slate-300
            ">
              Confidence:
              {' '}
              {latest.confidence}%
            </p>

          </>

        ) : (

          <p className="text-slate-400">
            Waiting realtime...
          </p>
        )
      }

    </div>
  );
}