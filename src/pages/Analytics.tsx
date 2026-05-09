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

export default function Analytics() {

  const [strategies, setStrategies] =
    useState<Strategy[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD
  // =====================================

  async function load() {

    try {

      const data =
        await getStrategies();

      setStrategies(data);

    } catch (error) {

      console.error(
        'ANALYTICS ERROR:',
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

    load();

    const interval =
      setInterval(() => {

        load();

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
  // BEST STRATEGY
  // =====================================

  const bestStrategy =
    strategies[0];

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
              Carregando analytics...
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

          📊 REAL TIME ANALYTICS

        </div>

        <h1 className="
          text-5xl
          font-black
          tracking-tight
          mb-3
        ">
          Analytics
        </h1>

        <p className="text-slate-400 text-lg">
          Monitoramento inteligente das estratégias da IA
        </p>

      </div>

      {/* STATS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-10
      ">

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-6
        ">

          <p className="text-slate-400 mb-2">
            Melhor Estratégia
          </p>

          <h2 className="
            text-3xl
            font-black
            text-cyan-400
          ">
            {bestStrategy?.strategy || 'none'}
          </h2>

        </div>

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-6
        ">

          <p className="text-slate-400 mb-2">
            Accuracy
          </p>

          <h2 className="
            text-3xl
            font-black
            text-green-400
          ">
            {bestStrategy?.accuracy || 0}%
          </h2>

        </div>

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-6
        ">

          <p className="text-slate-400 mb-2">
            Total Strategies
          </p>

          <h2 className="
            text-3xl
            font-black
            text-purple-400
          ">
            {strategies.length}
          </h2>

        </div>

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-6
        ">

          <p className="text-slate-400 mb-2">
            Auto Refresh
          </p>

          <h2 className="
            text-3xl
            font-black
            text-yellow-400
          ">
            5s
          </h2>

        </div>

      </div>

      {/* CHART */}

      <div className="w-full min-w-0">

        <StrategyChart
          data={chartData}
        />

      </div>

    </MainLayout>
  );
}