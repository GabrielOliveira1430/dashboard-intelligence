import { useEffect, useMemo, useState } from 'react';

import MainLayout from '../components/layout/MainLayout';

import StrategyChart from '../components/charts/StrategyChart';

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

  // =====================================
  // LOAD STRATEGIES
  // =====================================

  async function loadStrategies() {

    try {

      const data =
        await getStrategies();

      setStrategies(data);

    } catch (error) {

      console.error(
        'STRATEGIES PAGE ERROR:',
        error
      );

    } finally {

      setLoading(false);
    }
  }

  // =====================================
  // AUTO REFRESH
  // =====================================

  useEffect(() => {

    loadStrategies();

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
        item.accuracy

    }));

  }, [strategies]);

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

            <p className="text-slate-400 text-lg">
              Carregando estratégias...
            </p>

          </div>

        </div>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="mb-10">

        <div className="
          inline-flex
          items-center
          gap-2
          bg-cyan-500/10
          border
          border-cyan-500/20
          text-cyan-400
          px-4
          py-2
          rounded-2xl
          font-bold
          mb-6
        ">

          🧠 AI STRATEGIES

        </div>

        <h1 className="
          text-5xl
          font-black
          tracking-tight
          mb-3
        ">
          Strategies
        </h1>

        <p className="text-slate-400 text-lg">
          Estratégias inteligentes em tempo real
        </p>

      </div>

      {/* CHART */}

      <div className="
        w-full
        min-w-0
        mb-10
      ">

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
            p-12
            text-center
          ">

            <div className="text-6xl mb-6">
              ⚠️
            </div>

            <h2 className="
              text-3xl
              font-black
              mb-4
            ">
              Nenhuma estratégia encontrada
            </h2>

            <p className="text-slate-400">
              Sua API não retornou strategies.
            </p>

          </div>
        )
      }

      {/* GRID */}

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
        min-w-0
      ">

        {
          strategies.map((item) => (

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
                shadow-2xl
                min-w-0
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

                <div className="text-5xl mb-6">
                  🎯
                </div>

                <h2 className="
                  text-3xl
                  font-black
                  mb-6
                  break-words
                ">
                  {item.strategy}
                </h2>

                <div className="space-y-5">

                  <div>

                    <div className="
                      flex
                      items-center
                      justify-between
                      mb-2
                    ">

                      <span className="text-slate-400">
                        Accuracy
                      </span>

                      <span className="
                        text-cyan-400
                        font-black
                      ">
                        {item.accuracy}%
                      </span>

                    </div>

                    <div className="
                      h-3
                      rounded-full
                      bg-slate-800
                      overflow-hidden
                    ">

                      <div
                        className="
                          h-full
                          rounded-full
                          bg-cyan-400
                        "
                        style={{
                          width: `${item.accuracy}%`
                        }}
                      />

                    </div>

                  </div>

                  <div className="
                    grid
                    grid-cols-3
                    gap-4
                    pt-4
                  ">

                    <div>

                      <p className="text-slate-500 text-sm">
                        Coverage
                      </p>

                      <h3 className="
                        text-xl
                        font-black
                      ">
                        {item.coverage}%
                      </h3>

                    </div>

                    <div>

                      <p className="text-slate-500 text-sm">
                        Diversity
                      </p>

                      <h3 className="
                        text-xl
                        font-black
                      ">
                        {item.diversity}%
                      </h3>

                    </div>

                    <div>

                      <p className="text-slate-500 text-sm">
                        Score
                      </p>

                      <h3 className="
                        text-xl
                        font-black
                        text-green-400
                      ">
                        {item.score}
                      </h3>

                    </div>

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