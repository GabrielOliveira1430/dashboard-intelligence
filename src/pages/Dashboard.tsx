import { useEffect } from 'react';

import MainLayout from '../components/layout/MainLayout';
import StrategyChart from '../components/charts/StrategyChart';
import LiveMetricCard from '../components/cards/LiveMetricCard';

import type {
  GeneratedNumber,
  OrchestratorResponse
} from '../types/orchestrator.types';

import {
  connectOrchestratorWS
} from '../websocket/orchestrator.socket';

import {
  useOrchestratorStore
} from '../store/orchestrator.store';

export default function Dashboard() {

  // =====================================
  // 🧠 GLOBAL STORE
  // =====================================

  const {
    data,
    connected,
    lastUpdate,
    setData,
    setConnected
  } = useOrchestratorStore();

  // =====================================
  // ⚡ WEBSOCKET REALTIME
  // =====================================

  useEffect(() => {

    const connection =
      connectOrchestratorWS((update: OrchestratorResponse) => {

        console.log(
          '🧠 ORCHESTRATOR REALTIME:',
          update
        );

        setConnected(true);

        setData(update);
      });

    return () => {
      connection.close();
    };

  }, []);

  // =====================================
  // LOADING
  // =====================================

  if (!data) {

    return (

      <MainLayout>

        <div className="flex items-center justify-center h-[70vh]">

          <div className="text-center">

            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />

            <p className="text-slate-400">
              Conectando IA em tempo real...
            </p>

          </div>

        </div>

      </MainLayout>
    );
  }

  // =====================================
  // GENERATED SAFE
  // =====================================

  const generatedNumbers: GeneratedNumber[] =
    (data?.generated?.numbers || []).map((item: any) => ({

      number: item.number || '---',

      confidence:
        Number(item.confidence || 0),

      source:
        item.source || 'AI',

      cluster:
        item.cluster || 'default',

      patternScore:
        Number(item.patternScore || 0),

      patternTags:
        Array.isArray(item.patternTags)
          ? item.patternTags
          : []
    }));

  // =====================================
  // BEST GENERATED
  // =====================================

  const bestGenerated =
    generatedNumbers.length

      ? [...generatedNumbers]
          .sort(
            (a, b) =>
              b.confidence - a.confidence
          )[0]

      : undefined;

  // =====================================
  // CHART DATA
  // =====================================

  const hotChartData =

    data?.analytics?.hotNumbers?.map(
      (item) => ({

        number: item.number,

        score: item.score
      })

    ) || [];

  // =====================================
  // UI
  // =====================================

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-5xl font-black">
          ⚡ AI TRADING DASHBOARD
        </h1>

        <p className="text-slate-400">

          Live stream:
          {' '}
          {lastUpdate}

        </p>

        <p
          className={`text-sm mt-2 ${
            connected
              ? 'text-green-400'
              : 'text-red-400'
          }`}
        >

          {connected
            ? '🟢 Realtime conectado'
            : '🔴 Offline'}

        </p>

      </div>

      {/* METRICS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <LiveMetricCard
          title="Strategy"
          value={
            data?.summary?.bestStrategy || '---'
          }
          icon="🧠"
        />

        <LiveMetricCard
          title="Health"
          value={`${data?.summary?.systemHealth || 0}%`}
          icon="💚"
          color="emerald"
        />

        <LiveMetricCard
          title="Explore"
          value={`${data?.summary?.exploration || 0}%`}
          icon="🚀"
          color="violet"
        />

        <LiveMetricCard
          title="Exploit"
          value={`${data?.summary?.exploitation || 0}%`}
          icon="⚡"
          color="orange"
        />

      </div>

      {/* BEST NUMBER */}

      {bestGenerated && (

        <div className="p-8 rounded-3xl border border-cyan-500/20 mb-10 bg-white/5">

          <h2 className="text-6xl font-black">

            {bestGenerated.number}

          </h2>

          <p className="text-cyan-400 mt-2">

            Confidence:
            {' '}
            {bestGenerated.confidence}%

          </p>

          <div className="mt-4 space-y-1 text-sm text-slate-300">

            <p>
              Source:
              {' '}
              <span className="text-cyan-400">
                {bestGenerated.source}
              </span>
            </p>

            <p>
              Cluster:
              {' '}
              <span className="text-violet-400">
                {bestGenerated.cluster}
              </span>
            </p>

            <p>
              Pattern Score:
              {' '}
              <span className="text-orange-400">
                {bestGenerated.patternScore}
              </span>
            </p>

          </div>

        </div>
      )}

      {/* CHART */}

      <StrategyChart
        data={hotChartData}
      />

      {/* GENERATED LIST */}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

        {generatedNumbers.map(
          (item, index) => (

            <div
              key={`${item.number}-${index}`}
              className="p-4 rounded-xl bg-white/5 border border-white/5"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-3xl font-black">

                  {item.number}

                </h3>

                <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">

                  {item.source}

                </span>

              </div>

              <p className="text-cyan-400 mt-2">

                {item.confidence}%

              </p>

              <div className="mt-3 text-xs text-slate-400">

                <p>
                  Cluster:
                  {' '}
                  {item.cluster}
                </p>

                <p>
                  Pattern:
                  {' '}
                  {item.patternScore}
                </p>

              </div>

            </div>
          ))}

      </div>

    </MainLayout>
  );
}