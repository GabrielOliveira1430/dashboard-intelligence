import {
  useFootballRealtimeStore
} from '../../../store/footballRealtime.store';

export default function FootballPressureZones() {

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
        bottom-0
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
              🔥 Pressure Zones
            </h2>

            <p className="
              text-sm
              text-slate-400
              mt-1
            ">
              Offensive heat sectors
            </p>

          </div>

          <div className="
            text-orange-400
            font-black
            text-sm
          ">
            AI MAP
          </div>

        </div>

        <div className="
          grid
          grid-cols-3
          gap-4
        ">

          {
            predictions
              .slice(0, 9)
              .map(
                (
                  item: any,
                  index: number
                ) => {

                  const pressure =
                    item.pressure
                      ?.goalProbability || 40;

                  return (

                    <div
                      key={index}
                      className="
                        relative
                        rounded-2xl
                        border
                        border-white/5
                        overflow-hidden
                        bg-[#020617]
                        h-[120px]
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <div
                        className="
                          absolute
                          inset-0
                          transition-all
                          duration-700
                        "
                        style={{
                          background: `
                            radial-gradient(
                              circle,
                              rgba(249,115,22,${
                                pressure / 100
                              }),
                              transparent 70%
                            )
                          `
                        }}
                      />

                      <div className="
                        relative
                        z-10
                        text-center
                      ">

                        <p className="
                          text-sm
                          font-black
                        ">
                          {pressure}%
                        </p>

                        <p className="
                          text-[10px]
                          text-slate-400
                          mt-1
                        ">
                          Zone {index + 1}
                        </p>

                      </div>

                    </div>
                  );
                }
              )
          }

        </div>

      </div>

    </div>
  );
}