import { useEffect, useMemo, useState } from 'react';

import MainLayout from '../components/layout/MainLayout';
import StatCard from '../components/cards/StatCard';
import StrategyChart from '../components/charts/StrategyChart';

import {
  getOrchestrator
} from '../services/orchestrator.service';

export default function Dashboard() {

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [lastUpdate, setLastUpdate] =
    useState('');


  // =====================================
  // 🚀 LOAD
  // =====================================

  async function load(
    showLoading = false
  ) {

    try {

      if (showLoading) {

        setLoading(true);

      } else {

        setRefreshing(true);
      }

      const result =
        await getOrchestrator();

      console.log(
        '🔥 DASHBOARD:',
        result
      );

      setData(result);

      setLastUpdate(
        new Date().toLocaleTimeString()
      );

    } catch (err) {

      console.error(
        'Erro dashboard:',
        err
      );

    } finally {

      setLoading(false);

      setRefreshing(false);
    }
  }


  // =====================================
  // ⚡ AUTO REFRESH
  // =====================================

  useEffect(() => {

    load(true);

    const interval =
      setInterval(() => {

        load();

      }, 10000);

    return () =>
      clearInterval(interval);

  }, []);


  // =====================================
  // 📊 SAFE DATA
  // =====================================

  const analytics =
    data?.analytics || {};

  const summary =
    data?.summary || {};

  const system =
    data?.system || {};

  const generated =
    data?.generated?.numbers ||
    data?.generated ||
    [];

  const mutations =
    data?.mutations?.created ||
    [];

  const evolution =
    data?.evolution || {};

  const recommendations =
    system?.recommendations || [];

  const hotNumbers =
    analytics?.hotNumbers || [];

  const coldNumbers =
    analytics?.coldNumbers || [];


  // =====================================
  // 📈 CHART DATA
  // =====================================

  const chartData = useMemo(() => {

    return hotNumbers.map(
      (item: any) => ({

        number:
          item.number,

        score:
          Number(item.score) || 0
      })
    );

  }, [hotNumbers]);


  // =====================================
  // ⏳ LOADING
  // =====================================

  if (loading && !data) {

    return (

      <MainLayout>

        <div className="
          flex
          items-center
          justify-center
          h-[70vh]
        ">

          <div className="text-center">

            <div className="
              w-14
              h-14
              border-4
              border-cyan-500
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              mb-5
            " />

            <p className="text-slate-400">
              Inicializando IA...
            </p>

          </div>

        </div>

      </MainLayout>
    );
  }


  // =====================================
  // 🚀 RENDER
  // =====================================

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="
        flex
        flex-col
        xl:flex-row
        xl:items-center
        xl:justify-between
        gap-6
        mb-8
      ">

        <div>

          <div className="
            flex
            items-center
            gap-3
            mb-4
          ">

            <div className="
              px-3
              py-1.5
              rounded-xl
              bg-cyan-500/10
              border
              border-cyan-500/20
              text-cyan-400
              text-xs
              font-bold
              tracking-wide
            ">
              AI EVOLUTION SYSTEM
            </div>

            {
              refreshing && (

                <div className="
                  flex
                  items-center
                  gap-2
                  text-yellow-400
                  text-xs
                  font-semibold
                ">

                  <div className="
                    w-2
                    h-2
                    rounded-full
                    bg-yellow-400
                    animate-pulse
                  " />

                  Atualizando...

                </div>
              )
            }

          </div>

          <h1 className="
            text-4xl
            md:text-5xl
            font-black
            tracking-tight
            mb-3
          ">
            Intelligence Dashboard
          </h1>

          <p className="text-slate-400">
            Última atualização às {lastUpdate}
          </p>

        </div>

        <button
          onClick={() => load()}
          className="
            h-fit
            px-6
            py-3
            rounded-2xl
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            font-black
            transition-all
            duration-300
            hover:scale-[1.02]
            shadow-lg
            shadow-cyan-500/20
          "
        >
          Atualizar
        </button>

      </div>


      {/* STATS */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-6
        gap-5
        mb-8
      ">

        <StatCard
          title="Best Strategy"
          value={
            summary.bestStrategy ||
            'none'
          }
        />

        <StatCard
          title="Best Score"
          value={
            summary.bestScore || 0
          }
        />

        <StatCard
          title="Generated"
          value={
            generated.length || 0
          }
        />

        <StatCard
          title="Mode"
          value={
            summary.mode ||
            'balanced'
          }
        />

        <StatCard
          title="Mutations"
          value={
            mutations.length || 0
          }
        />

        <StatCard
          title="Health"
          value={
            `${summary.systemHealth || 0}%`
          }
        />

      </div>


      {/* SYSTEM STATUS */}

      <div className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-6
        mb-8
      ">

        <div className="
          flex
          items-center
          justify-between
          mb-6
        ">

          <h2 className="
            text-2xl
            font-black
          ">
            🤖 AI System Status
          </h2>

          <div className="
            px-4
            py-2
            rounded-xl
            bg-cyan-500/10
            border
            border-cyan-500/20
            text-cyan-400
            text-sm
            font-bold
          ">
            {system.alertLevel || 'LOW'}
          </div>

        </div>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
        ">

          <div className="
            rounded-2xl
            bg-white/[0.03]
            p-5
          ">

            <p className="
              text-slate-400
              text-sm
              mb-2
            ">
              Status
            </p>

            <h3 className="
              text-2xl
              font-black
            ">
              {system.status || 'online'}
            </h3>

          </div>

          <div className="
            rounded-2xl
            bg-white/[0.03]
            p-5
          ">

            <p className="
              text-slate-400
              text-sm
              mb-2
            ">
              Exploration
            </p>

            <h3 className="
              text-2xl
              font-black
            ">
              {summary.exploration || 0}%
            </h3>

          </div>

          <div className="
            rounded-2xl
            bg-white/[0.03]
            p-5
          ">

            <p className="
              text-slate-400
              text-sm
              mb-2
            ">
              Exploitation
            </p>

            <h3 className="
              text-2xl
              font-black
            ">
              {summary.exploitation || 0}%
            </h3>

          </div>

        </div>

      </div>


      {/* CHART */}

      <div className="mb-8">

        <StrategyChart
          data={chartData}
        />

      </div>


      {/* HOT / COLD */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        mb-8
      ">

        {/* HOT */}

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-6
        ">

          <h2 className="
            text-2xl
            font-black
            mb-6
          ">
            🔥 Hot Numbers
          </h2>

          <div className="space-y-3">

            {
              hotNumbers
                ?.slice(0, 10)
                ?.map((item: any) => (

                  <div
                    key={item.number}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      bg-white/[0.03]
                      border
                      border-white/5
                      px-4
                      py-4
                    "
                  >

                    <div>

                      <p className="
                        text-xl
                        font-black
                      ">
                        {item.number}
                      </p>

                      <p className="
                        text-xs
                        text-slate-500
                        mt-1
                      ">
                        Número quente
                      </p>

                    </div>

                    <div className="
                      text-cyan-400
                      font-black
                      text-lg
                    ">
                      {item.score}
                    </div>

                  </div>
                ))
            }

          </div>

        </div>


        {/* COLD */}

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-6
        ">

          <h2 className="
            text-2xl
            font-black
            mb-6
          ">
            ❄️ Cold Numbers
          </h2>

          <div className="space-y-3">

            {
              coldNumbers
                ?.slice(0, 10)
                ?.map((item: any) => (

                  <div
                    key={item.number}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      bg-white/[0.03]
                      border
                      border-white/5
                      px-4
                      py-4
                    "
                  >

                    <div>

                      <p className="
                        text-xl
                        font-black
                      ">
                        {item.number}
                      </p>

                      <p className="
                        text-xs
                        text-slate-500
                        mt-1
                      ">
                        Número frio
                      </p>

                    </div>

                    <div className="
                      text-cyan-400
                      font-black
                      text-lg
                    ">
                      {item.score}
                    </div>

                  </div>
                ))
            }

          </div>

        </div>

      </div>


      {/* GENERATED + RECOMMENDATIONS */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        mb-8
      ">

        {/* GENERATED */}

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-6
        ">

          <h2 className="
            text-2xl
            font-black
            mb-6
          ">
            🎲 Generated Numbers
          </h2>

          <div className="space-y-3">

            {
              generated
                ?.slice(0, 10)
                ?.map((item: any, index: number) => (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      bg-white/[0.03]
                      border
                      border-white/5
                      px-4
                      py-4
                    "
                  >

                    <div>

                      <p className="
                        text-xl
                        font-black
                      ">
                        {
                          item.number ||
                          item.value ||
                          '----'
                        }
                      </p>

                      <p className="
                        text-xs
                        text-slate-500
                        mt-1
                      ">
                        {
                          item.source ||
                          'AI Generated'
                        }
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="
                        text-cyan-400
                        font-black
                      ">
                        {
                          item.confidence || 0
                        }%
                      </p>

                    </div>

                  </div>
                ))
            }

          </div>

        </div>


        {/* RECOMMENDATIONS */}

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-6
        ">

          <h2 className="
            text-2xl
            font-black
            mb-6
          ">
            ⚡ AI Recommendations
          </h2>

          <div className="space-y-4">

            {
              recommendations
                ?.slice(0, 10)
                ?.map((item: any, index: number) => (

                  <div
                    key={index}
                    className="
                      rounded-2xl
                      border
                      border-cyan-500/10
                      bg-cyan-500/[0.03]
                      p-4
                    "
                  >

                    <p className="
                      text-sm
                      text-slate-300
                      leading-relaxed
                    ">
                      {item}
                    </p>

                  </div>
                ))
            }

          </div>

        </div>

      </div>


      {/* EVOLUTION */}

      <div className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-6
      ">

        <h2 className="
          text-2xl
          font-black
          mb-6
        ">
          🧬 Strategy Evolution
        </h2>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
        ">

          <div className="
            rounded-2xl
            bg-white/[0.03]
            p-5
          ">

            <p className="
              text-slate-400
              text-sm
              mb-2
            ">
              Evolved Strategies
            </p>

            <h3 className="
              text-4xl
              font-black
            ">
              {
                evolution?.bestStrategies
                  ?.length || 0
              }
            </h3>

          </div>

          <div className="
            rounded-2xl
            bg-white/[0.03]
            p-5
          ">

            <p className="
              text-slate-400
              text-sm
              mb-2
            ">
              Mutations Created
            </p>

            <h3 className="
              text-4xl
              font-black
            ">
              {mutations.length}
            </h3>

          </div>

          <div className="
            rounded-2xl
            bg-white/[0.03]
            p-5
          ">

            <p className="
              text-slate-400
              text-sm
              mb-2
            ">
              Retired Strategies
            </p>

            <h3 className="
              text-4xl
              font-black
            ">
              {
                summary.retiredStrategies || 0
              }
            </h3>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}