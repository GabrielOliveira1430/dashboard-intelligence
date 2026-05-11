import { useEffect, useState } from 'react';

import MainLayout from '../components/layout/MainLayout';
import StrategyChart from '../components/charts/StrategyChart';
import LiveMetricCard from '../components/cards/LiveMetricCard';

import type {
  OrchestratorResponse,
  GeneratedNumber
} from '../types/orchestrator.types';

import { connectOrchestratorWS } from '../websocket/orchestrator.socket';

export default function Dashboard() {

  const [data, setData] = useState<OrchestratorResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');

  // =====================================
  // WEBSOCKET REALTIME
  // =====================================

  useEffect(() => {

    const connection = connectOrchestratorWS((update) => {

      setData(update);
      setLoading(false);
      setLastUpdate(new Date().toLocaleTimeString());

    });

    return () => {
      connection.close();
    };

  }, []);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

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
  // BEST GENERATED
  // =====================================

  const bestGenerated: GeneratedNumber | undefined =
    data?.generated?.numbers?.length
      ? [...data.generated.numbers]
          .sort((a, b) => b.confidence - a.confidence)[0]
      : undefined;

  // =====================================
  // HOT CHART DATA
  // =====================================

  const hotChartData =
    data?.analytics?.hotNumbers?.map((item) => ({
      number: item.number,
      score: item.score
    })) || [];

  return (
    <MainLayout>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-5xl font-black">⚡ AI TRADING DASHBOARD</h1>
        <p className="text-slate-400">
          Live stream: {lastUpdate}
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <LiveMetricCard
          title="Strategy"
          value={data?.summary?.bestStrategy || '---'}
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
        <div className="p-8 rounded-3xl border border-cyan-500/20 mb-10">

          <h2 className="text-6xl font-black">
            {bestGenerated.number}
          </h2>

          <p className="text-cyan-400">
            Confidence: {bestGenerated.confidence}%
          </p>

        </div>
      )}

      {/* CHART */}
      <StrategyChart data={hotChartData} />

      {/* GENERATED LIST */}
      <div className="mt-10 grid grid-cols-3 gap-4">

        {data?.generated?.numbers?.map((item, index) => (
          <div
            key={`${item.number}-${index}`}
            className="p-4 rounded-xl bg-white/5"
          >
            <h3 className="text-3xl font-black">
              {item.number}
            </h3>

            <p className="text-cyan-400">
              {item.confidence}%
            </p>
          </div>
        ))}

      </div>

    </MainLayout>
  );
}