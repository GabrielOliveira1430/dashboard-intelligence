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
  // 🔥 LOAD DATA
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
        '🔥 DASHBOARD DATA:',
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
  // 🚀 AUTO REFRESH
  // =====================================

  useEffect(() => {

    load(true);

    const interval =
      setInterval(() => {

        load();

      }, 15000);

    return () =>
      clearInterval(interval);

  }, []);

  // =====================================
  // 📊 SAFE DATA
  // =====================================

  const strategies =
    data?.decision?.ranking ||
    data?.strategies ||
    [];

  const analytics =
    data?.analytics || {};

  const summary =
    data?.summary || {

      totalStrategies:
        strategies.length,

      bestStrategy:
        strategies?.[0]?.strategy ||
        'none',

      bestScore:
        strategies?.[0]?.score || 0,

      bestCoverage:
        strategies?.[0]?.coverage || 0
    };

  // =====================================
  // 📈 HOT NUMBERS CHART
  // =====================================

  const chartData = useMemo(() => {

    return (
      analytics?.hotNumbers || []
    ).map((item: any) => ({

      number:
        item.number,

      score:
        Number(item.score) || 0

    }));

  }, [analytics]);

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
              Carregando dashboard...
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

          <div className="flex items-center gap-3 mb-4">

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
              AI POWERED
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
            text-3xl
            md:text-4xl
            font-black
            tracking-tight
            mb-2
          ">
            AI Intelligence Dashboard
          </h1>

          <p className="text-slate-400 text-sm md:text-base">
            Última atualização às {lastUpdate}
          </p>

        </div>

        <button
          onClick={() => load()}
          className="
            h-fit
            px-5
            py-3
            rounded-2xl
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            text-sm
            font-black
            transition-all
            duration-300
            shadow-lg
            shadow-cyan-500/20
            hover:scale-[1.02]
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
        xl:grid-cols-5
        gap-5
        mb-8
      ">

        <StatCard
          title="Best Strategy"
          value={
            summary.bestStrategy || 'none'
          }
        />

        <StatCard
          title="Strategies"
          value={
            summary.totalStrategies || 0
          }
        />

        <StatCard
          title="Generated"
          value={
            data?.generated?.total || 0
          }
        />

        <StatCard
          title="Best Score"
          value={
            summary.bestScore || 0
          }
        />

        <StatCard
          title="Coverage"
          value={
            `${summary.bestCoverage || 0}%`
          }
        />

      </div>

      {/* HOT NUMBERS CHART */}

      <div className="mb-8 min-w-0 overflow-hidden">

        <StrategyChart
          data={chartData}
        />

      </div>

      {/* HOT / COLD */}

      <div className="
        grid
        grid-cols-1
        2xl:grid-cols-2
        gap-6
        mb-8
      ">

        {/* HOT */}

        <div className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-6
          shadow-2xl
        ">

          <div className="flex items-center justify-between mb-6">

            <h2 className="
              text-xl
              md:text-2xl
              font-black
            ">
              🔥 Hot Numbers
            </h2>

            <span className="
              text-[10px]
              font-bold
              text-orange-400
              bg-orange-500/10
              border
              border-orange-500/20
              px-2.5
              py-1.5
              rounded-lg
            ">
              HIGH TREND
            </span>

          </div>

          <div className="space-y-3">

            {
              analytics?.hotNumbers
                ?.slice(0, 10)
                ?.map((item: any) => (

                  <div
                    key={item.number}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-white/5
                      bg-white/[0.03]
                      px-4
                      py-3
                      transition-all
                      duration-300
                      hover:border-cyan-500/20
                      hover:bg-cyan-500/5
                    "
                  >

                    <div>

                      <p className="
                        text-lg
                        md:text-xl
                        font-black
                      ">
                        {item.number}
                      </p>

                      <p className="
                        text-slate-500
                        text-xs
                        mt-1
                      ">
                        Número em alta
                      </p>

                    </div>

                    <span className="
                      text-cyan-400
                      font-black
                      text-base
                    ">
                      {item.score}
                    </span>

                  </div>
                ))
            }

          </div>

        </div>

        {/* COLD */}

        <div className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-6
          shadow-2xl
        ">

          <div className="flex items-center justify-between mb-6">

            <h2 className="
              text-xl
              md:text-2xl
              font-black
            ">
              ❄️ Cold Numbers
            </h2>

            <span className="
              text-[10px]
              font-bold
              text-blue-400
              bg-blue-500/10
              border
              border-blue-500/20
              px-2.5
              py-1.5
              rounded-lg
            ">
              LOW TREND
            </span>

          </div>

          <div className="space-y-3">

            {
              analytics?.coldNumbers
                ?.slice(0, 10)
                ?.map((item: any) => (

                  <div
                    key={item.number}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-white/5
                      bg-white/[0.03]
                      px-4
                      py-3
                      transition-all
                      duration-300
                      hover:border-cyan-500/20
                      hover:bg-cyan-500/5
                    "
                  >

                    <div>

                      <p className="
                        text-lg
                        md:text-xl
                        font-black
                      ">
                        {item.number}
                      </p>

                      <p className="
                        text-slate-500
                        text-xs
                        mt-1
                      ">
                        Número frio
                      </p>

                    </div>

                    <span className="
                      text-cyan-400
                      font-black
                      text-base
                    ">
                      {item.score}
                    </span>

                  </div>
                ))
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
}