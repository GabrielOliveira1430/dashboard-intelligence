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

export default function Strategies() {

  const [strategies, setStrategies] =
    useState<Strategy[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [lastUpdate, setLastUpdate] =
    useState('');

  const [error, setError] =
    useState('');


  // =====================================
  // LOAD
  // =====================================

  async function loadStrategies(
    firstLoad = false
  ) {

    try {

      setError('');

      if (firstLoad) {

        setLoading(true);

      } else {

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

    } catch (err: any) {

      console.error(
        '❌ STRATEGIES ERROR:',
        err
      );

      setError(
        'Erro ao carregar estratégias'
      );

    } finally {

      setLoading(false);

      setRefreshing(false);
    }
  }


  // =====================================
  // AUTO REFRESH
  // =====================================

  useEffect(() => {

    loadStrategies(true);

    const interval =
      setInterval(() => {

        loadStrategies();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);


  // =====================================
  // CHART DATA
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
  // BEST STRATEGY
  // =====================================

  const bestStrategy =
    strategies?.[0];


  // =====================================
  // METRICS
  // =====================================

  const avgAccuracy =
    strategies.length > 0

      ? Math.round(

          strategies.reduce(
            (acc, item) =>
              acc + item.accuracy,
            0
          ) / strategies.length
        )

      : 0;

  const avgCoverage =
    strategies.length > 0

      ? Math.round(

          strategies.reduce(
            (acc, item) =>
              acc + item.coverage,
            0
          ) / strategies.length
        )

      : 0;

  const avgDiversity =
    strategies.length > 0

      ? Math.round(

          strategies.reduce(
            (acc, item) =>
              acc + item.diversity,
            0
          ) / strategies.length
        )

      : 0;


  // =====================================
  // LOADING
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
              Inicializando inteligência...
            </p>

          </div>

        </div>

      </MainLayout>
    );
  }


  // =====================================
  // ERROR
  // =====================================

  if (error) {

    return (

      <MainLayout>

        <div className="
          flex
          items-center
          justify-center
          h-[70vh]
        ">

          <div className="
            text-center
            rounded-3xl
            border
            border-red-500/20
            bg-red-500/10
            p-10
          ">

            <h2 className="
              text-3xl
              font-black
              text-red-400
              mb-4
            ">
              ❌ Erro
            </h2>

            <p className="text-slate-300">
              {error}
            </p>

          </div>

        </div>

      </MainLayout>
    );
  }


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

            AI STRATEGY ENGINE

          </div>

          <h1 className="
            text-5xl
            font-black
            tracking-tight
            mb-3
          ">
            Strategy Intelligence
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
            onClick={() =>
              loadStrategies()
            }
            className="
              px-6
              py-4
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              text-black
              font-black
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Atualizar
          </button>

        </div>

      </div>


      {/* METRICS */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-10
      ">

        <LiveMetricCard
          title="Strategies"
          value={strategies.length}
          icon="🧠"
        />

        <LiveMetricCard
          title="Avg Accuracy"
          value={`${avgAccuracy}%`}
          icon="🎯"
          color="emerald"
        />

        <LiveMetricCard
          title="Coverage"
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

      </div>


      {/* BEST STRATEGY */}

      {
        bestStrategy && (

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
              w-72
              h-72
              bg-cyan-500/10
              blur-3xl
            " />

            <div className="relative z-10">

              <div className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-2xl
                bg-cyan-500/10
                border
                border-cyan-500/20
                text-cyan-400
                font-black
                mb-6
              ">
                👑 TOP STRATEGY
              </div>

              <h2 className="
                text-5xl
                font-black
                mb-6
              ">
                {bestStrategy.strategy}
              </h2>

              <div className="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-6
              ">

                <div>

                  <p className="
                    text-slate-400
                    mb-2
                  ">
                    Accuracy
                  </p>

                  <h3 className="
                    text-4xl
                    font-black
                    text-cyan-400
                  ">
                    {bestStrategy.accuracy}%
                  </h3>

                </div>

                <div>

                  <p className="
                    text-slate-400
                    mb-2
                  ">
                    Coverage
                  </p>

                  <h3 className="
                    text-4xl
                    font-black
                    text-emerald-400
                  ">
                    {bestStrategy.coverage}%
                  </h3>

                </div>

                <div>

                  <p className="
                    text-slate-400
                    mb-2
                  ">
                    Diversity
                  </p>

                  <h3 className="
                    text-4xl
                    font-black
                    text-violet-400
                  ">
                    {bestStrategy.diversity}%
                  </h3>

                </div>

                <div>

                  <p className="
                    text-slate-400
                    mb-2
                  ">
                    Score
                  </p>

                  <h3 className="
                    text-4xl
                    font-black
                    text-orange-400
                  ">
                    {bestStrategy.score}
                  </h3>

                </div>

              </div>

            </div>

          </div>
        )
      }


      {/* CHART */}

      <div className="mb-10">

        <StrategyChart
          data={chartData}
        />

      </div>


      {/* EMPTY */}

      {
        strategies.length === 0 && (

          <div className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-16
            text-center
          ">

            <h2 className="
              text-3xl
              font-black
              mb-4
            ">
              Nenhuma estratégia encontrada
            </h2>

            <p className="text-slate-400">
              O orchestrator ainda não retornou estratégias.
            </p>

          </div>
        )
      }


      {/* GRID */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-8
      ">

        {
          strategies.map((item, index) => (

            <div
              key={item.strategy}
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                p-8
                transition-all
                duration-300
                hover:border-cyan-500/20
                hover:-translate-y-1
              "
            >

              <div className="
                absolute
                top-0
                right-0
                w-60
                h-60
                bg-cyan-500/10
                blur-3xl
              " />

              <div className="relative z-10">

                <div className="
                  flex
                  items-center
                  justify-between
                  mb-6
                ">

                  <div className="
                    flex
                    items-center
                    gap-4
                  ">

                    <div className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-cyan-500/10
                      border
                      border-cyan-500/20
                      flex
                      items-center
                      justify-center
                      text-3xl
                    ">

                      {
                        index === 0
                          ? '🥇'
                          : index === 1
                          ? '🥈'
                          : index === 2
                          ? '🥉'
                          : '🎯'
                      }

                    </div>

                    <div>

                      <p className="
                        text-slate-500
                        text-sm
                      ">
                        Rank #{index + 1}
                      </p>

                      <h2 className="
                        text-2xl
                        font-black
                      ">
                        {item.strategy}
                      </h2>

                    </div>

                  </div>

                  <div className="
                    px-4
                    py-2
                    rounded-2xl
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    text-cyan-400
                    font-black
                  ">
                    {item.score}
                  </div>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </MainLayout>
  );
}