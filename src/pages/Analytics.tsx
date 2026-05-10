import { useEffect, useMemo, useState } from 'react';

import MainLayout from '../components/layout/MainLayout';

import StrategyChart from '../components/charts/StrategyChart';

import LiveMetricCard from '../components/cards/LiveMetricCard';

import {
  getStrategies
} from '../services/strategy.service';

type Strategy = {
  strategy: string;
  accuracy: number;
  coverage: number;
  diversity: number;
  score: number;
};

export default function Analytics() {

  const [strategies, setStrategies] =
    useState<Strategy[]>([]);

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
    firstLoad = false
  ) {

    try {

      if (!firstLoad) {

        setRefreshing(true);
      }

      const data =
        await getStrategies();

      const sorted =
        [...data].sort(
          (a, b) =>
            b.score - a.score
        );

      setStrategies(sorted);

      setLastUpdate(
        new Date().toLocaleTimeString()
      );

    } catch (error) {

      console.error(
        'ANALYTICS ERROR:',
        error
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

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);


  // =====================================
  // 📊 CHART DATA
  // =====================================

  const chartData = useMemo(() => {

    return strategies.map((item) => ({

      number:
        item.strategy,

      score:
        Number(item.score || 0)

    }));

  }, [strategies]);


  // =====================================
  // 🏆 BEST STRATEGY
  // =====================================

  const bestStrategy =
    strategies?.[0];


  // =====================================
  // 📈 GLOBAL METRICS
  // =====================================

  const avgAccuracy =
    strategies.length > 0

      ? (
          strategies.reduce(
            (acc, item) =>
              acc + item.accuracy,
            0
          ) / strategies.length
        ).toFixed(1)

      : 0;

  const avgCoverage =
    strategies.length > 0

      ? (
          strategies.reduce(
            (acc, item) =>
              acc + item.coverage,
            0
          ) / strategies.length
        ).toFixed(1)

      : 0;

  const avgDiversity =
    strategies.length > 0

      ? (
          strategies.reduce(
            (acc, item) =>
              acc + item.diversity,
            0
          ) / strategies.length
        ).toFixed(1)

      : 0;


  // =====================================
  // ⏳ LOADING
  // =====================================

  if (loading) {

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
              w-16
              h-16
              border-4
              border-cyan-500
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              mb-6
            " />

            <p className="
              text-slate-400
              text-lg
            ">
              Inicializando analytics...
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
        mb-10
      ">

        <div>

          <div className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-cyan-500/10
            border
            border-cyan-500/20
            px-4
            py-2
            text-cyan-400
            font-black
            mb-5
          ">

            <div className="
              w-2
              h-2
              rounded-full
              bg-cyan-400
              animate-pulse
            " />

            REAL TIME ANALYTICS

          </div>

          <h1 className="
            text-5xl
            font-black
            tracking-tight
            mb-3
          ">
            AI Analytics
          </h1>

          <p className="
            text-slate-400
            text-lg
          ">
            Última atualização às {lastUpdate}
          </p>

        </div>

        <div className="
          flex
          items-center
          gap-4
        ">

          {
            refreshing && (

              <div className="
                flex
                items-center
                gap-2
                text-yellow-400
                text-sm
                font-bold
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

          <button
            onClick={() => load()}
            className="
              px-5
              py-3
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              text-black
              font-black
              transition-all
              duration-300
            "
          >
            Atualizar
          </button>

        </div>

      </div>


      {/* LIVE METRICS */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-10
      ">

        <LiveMetricCard
          title="Best Accuracy"
          value={`${bestStrategy?.accuracy || 0}%`}
          icon="🎯"
          color="emerald"
        />

        <LiveMetricCard
          title="Avg Coverage"
          value={`${avgCoverage}%`}
          icon="📡"
          color="cyan"
        />

        <LiveMetricCard
          title="Diversity"
          value={`${avgDiversity}%`}
          icon="🧬"
          color="violet"
        />

        <LiveMetricCard
          title="Strategies"
          value={strategies.length}
          icon="⚡"
          color="orange"
        />

      </div>


      {/* BEST STRATEGY */}

      <div className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-500/20
        bg-gradient-to-br
        from-cyan-500/10
        to-blue-500/10
        backdrop-blur-xl
        p-8
        mb-10
      ">

        <div className="
          absolute
          top-0
          right-0
          w-64
          h-64
          bg-cyan-500/10
          blur-3xl
        " />

        <div className="relative z-10">

          <div className="
            flex
            items-center
            gap-3
            mb-5
          ">

            <div className="
              px-4
              py-2
              rounded-2xl
              bg-cyan-500/20
              border
              border-cyan-500/20
              text-cyan-300
              font-black
              text-sm
            ">
              🏆 TOP STRATEGY
            </div>

          </div>

          <h2 className="
            text-5xl
            font-black
            mb-4
          ">
            {bestStrategy?.strategy || 'none'}
          </h2>

          <div className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-5
          ">

            <div>

              <p className="
                text-slate-400
                text-sm
                mb-1
              ">
                Accuracy
              </p>

              <h3 className="
                text-3xl
                font-black
                text-emerald-400
              ">
                {bestStrategy?.accuracy || 0}%
              </h3>

            </div>

            <div>

              <p className="
                text-slate-400
                text-sm
                mb-1
              ">
                Coverage
              </p>

              <h3 className="
                text-3xl
                font-black
                text-cyan-400
              ">
                {bestStrategy?.coverage || 0}%
              </h3>

            </div>

            <div>

              <p className="
                text-slate-400
                text-sm
                mb-1
              ">
                Diversity
              </p>

              <h3 className="
                text-3xl
                font-black
                text-violet-400
              ">
                {bestStrategy?.diversity || 0}%
              </h3>

            </div>

            <div>

              <p className="
                text-slate-400
                text-sm
                mb-1
              ">
                Score
              </p>

              <h3 className="
                text-3xl
                font-black
                text-orange-400
              ">
                {bestStrategy?.score || 0}
              </h3>

            </div>

          </div>

        </div>

      </div>


      {/* CHART */}

      <div className="mb-10">

        <StrategyChart
          data={chartData}
        />

      </div>


      {/* STRATEGIES TABLE */}

      <div className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        overflow-hidden
      ">

        <div className="
          flex
          items-center
          justify-between
          p-6
          border-b
          border-white/10
        ">

          <div>

            <h2 className="
              text-3xl
              font-black
              mb-2
            ">
              ⚡ Strategy Ranking
            </h2>

            <p className="
              text-slate-400
            ">
              Ranking inteligente das estratégias
            </p>

          </div>

          <div className="
            px-4
            py-2
            rounded-2xl
            bg-cyan-500/10
            border
            border-cyan-500/20
            text-cyan-400
            font-bold
            text-sm
          ">
            LIVE DATA
          </div>

        </div>

        <div className="overflow-auto">

          <table className="w-full">

            <thead>

              <tr className="
                border-b
                border-white/5
                text-left
              ">

                <th className="p-5 text-slate-400">
                  #
                </th>

                <th className="p-5 text-slate-400">
                  Strategy
                </th>

                <th className="p-5 text-slate-400">
                  Accuracy
                </th>

                <th className="p-5 text-slate-400">
                  Coverage
                </th>

                <th className="p-5 text-slate-400">
                  Diversity
                </th>

                <th className="p-5 text-slate-400">
                  Score
                </th>

              </tr>

            </thead>

            <tbody>

              {
                strategies.map((item, index) => (

                  <tr
                    key={item.strategy}
                    className="
                      border-b
                      border-white/5
                      transition-all
                      duration-300
                      hover:bg-cyan-500/[0.03]
                    "
                  >

                    <td className="
                      p-5
                      font-black
                    ">

                      {
                        index === 0
                          ? '🥇'
                          : index === 1
                          ? '🥈'
                          : index === 2
                          ? '🥉'
                          : `#${index + 1}`
                      }

                    </td>

                    <td className="
                      p-5
                      font-bold
                    ">
                      {item.strategy}
                    </td>

                    <td className="p-5">

                      <div className="
                        flex
                        items-center
                        gap-3
                      ">

                        <div className="
                          w-full
                          max-w-[140px]
                          h-3
                          rounded-full
                          bg-white/5
                          overflow-hidden
                        ">

                          <div
                            className="
                              h-full
                              rounded-full
                              bg-gradient-to-r
                              from-emerald-400
                              to-cyan-400
                            "
                            style={{
                              width: `${item.accuracy}%`
                            }}
                          />

                        </div>

                        <span className="
                          text-emerald-400
                          font-black
                        ">
                          {item.accuracy}%
                        </span>

                      </div>

                    </td>

                    <td className="
                      p-5
                      text-cyan-400
                      font-bold
                    ">
                      {item.coverage}%
                    </td>

                    <td className="
                      p-5
                      text-violet-400
                      font-bold
                    ">
                      {item.diversity}%
                    </td>

                    <td className="
                      p-5
                      text-orange-400
                      font-black
                    ">
                      {item.score}
                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}