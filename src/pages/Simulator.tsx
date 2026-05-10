// src/pages/Simulator.tsx

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import MainLayout from '../components/layout/MainLayout';

import LiveMetricCard from '../components/cards/LiveMetricCard';
import NeuralActivityCard from '../components/cards/NeuralActivityCard';

import {
  getStrategies
} from '../services/strategy.service';

import {
  getOrchestrator
} from '../services/orchestrator.service';

type Strategy = {
  strategy: string;
  accuracy: number;
  coverage: number;
  diversity: number;
  score: number;
};

type GeneratedNumber = {
  number: string;
  confidence: number;
  source: string;
  cluster?: string;
};

export default function Simulator() {

  const [strategies, setStrategies] =
    useState<Strategy[]>([]);

  const [generatedNumbers, setGeneratedNumbers] =
    useState<GeneratedNumber[]>([]);

  const [orchestratorHealth, setOrchestratorHealth] =
    useState(0);

  const [neuralPower, setNeuralPower] =
    useState(0);

  const [aiConfidence, setAiConfidence] =
    useState(0);

  const [predictionStability, setPredictionStability] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [lastUpdate, setLastUpdate] =
    useState('');

  const [logs, setLogs] =
    useState<string[]>([]);

  // =====================================
  // LOAD
  // =====================================

  async function load(
    firstLoad = false
  ) {

    try {

      if (!firstLoad) {

        setRefreshing(true);
      }

      addLog(
        '🚀 Connecting orchestrator...'
      );

      const [
        strategiesData,
        orchestrator
      ] = await Promise.all([

        getStrategies(),

        getOrchestrator()
      ]);

      setStrategies(
        strategiesData
      );

      const generated =
        orchestrator
          ?.generated
          ?.numbers || [];

      setGeneratedNumbers(
        generated
      );

      const health =
        orchestrator
          ?.summary
          ?.systemHealth || 0;

      setOrchestratorHealth(
        health
      );

      const bestScore =
        orchestrator
          ?.summary
          ?.bestScore || 0;

      const bestAccuracy =
        orchestrator
          ?.summary
          ?.bestAccuracy || 0;

      const diversity =
        orchestrator
          ?.summary
          ?.bestDiversity || 0;

      setNeuralPower(
        Math.min(
          100,
          Math.round(
            bestScore * 10
          )
        )
      );

      setAiConfidence(
        Math.min(
          100,
          Math.round(
            bestAccuracy
          )
        )
      );

      setPredictionStability(
        Math.min(
          100,
          Math.round(
            diversity
          )
        )
      );

      addLog(
        `🧠 ${strategiesData.length} strategies loaded`
      );

      addLog(
        '⚡ Neural engine synchronized'
      );

      addLog(
        `🎲 ${generated.length} numbers generated`
      );

      addLog(
        `📊 System health ${health}%`
      );

      addLog(
        '🤖 Evolution engine online'
      );

      setLastUpdate(
        new Date().toLocaleTimeString()
      );

    } catch (error) {

      console.error(error);

      addLog(
        '❌ Simulation error'
      );

    } finally {

      setLoading(false);

      setRefreshing(false);
    }
  }

  // =====================================
  // LOG SYSTEM
  // =====================================

  function addLog(
    text: string
  ) {

    setLogs((prev) => [

      `[${new Date()
        .toLocaleTimeString()}] ${text}`,

      ...prev.slice(0, 7)
    ]);
  }

  // =====================================
  // AUTO REFRESH
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
  // BEST STRATEGY
  // =====================================

  const bestStrategy =
    useMemo(() => {

      return strategies[0];

    }, [strategies]);

  // =====================================
  // TOTAL SCORE
  // =====================================

  const totalScore =
    useMemo(() => {

      return strategies.reduce(
        (acc, item) =>
          acc + item.score,
        0
      );

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

            <p className="
              text-slate-400
              text-lg
            ">
              Inicializando IA...
            </p>

          </div>

        </div>

      </MainLayout>
    );
  }

  // =====================================
  // RENDER
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
            px-4
            py-2
            rounded-2xl
            bg-cyan-500/10
            border
            border-cyan-500/20
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

            AI SIMULATOR PRO

          </div>

          <h1 className="
            text-5xl
            font-black
            tracking-tight
            mb-3
          ">
            Neural Simulator
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
              px-6
              py-4
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              text-black
              font-black
              transition-all
            "
          >
            Executar
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
          color="cyan"
        />

        <LiveMetricCard
          title="Best Accuracy"
          value={`${bestStrategy?.accuracy || 0}%`}
          icon="🎯"
          color="emerald"
        />

        <LiveMetricCard
          title="Total Score"
          value={totalScore}
          icon="⚡"
          color="orange"
        />

        <LiveMetricCard
          title="AI Status"
          value="ONLINE"
          icon="🤖"
          color="violet"
        />

      </div>

      {/* NEURAL METRICS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-10
      ">

        <NeuralActivityCard
          title="Neural Power"
          value={neuralPower}
          color="cyan"
        />

        <NeuralActivityCard
          title="AI Confidence"
          value={aiConfidence}
          color="emerald"
        />

        <NeuralActivityCard
          title="Prediction Stability"
          value={predictionStability}
          color="violet"
        />

        <NeuralActivityCard
          title="Orchestrator Health"
          value={orchestratorHealth}
          color="orange"
        />

      </div>

      {/* MAIN GRID */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-8
      ">

        {/* TERMINAL */}

        <div className="
          xl:col-span-2
          relative
          overflow-hidden
          rounded-3xl
          border
          border-cyan-500/20
          bg-white/[0.04]
          backdrop-blur-xl
          p-8
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
              flex
              items-center
              justify-between
              mb-8
            ">

              <div>

                <h2 className="
                  text-4xl
                  font-black
                  mb-2
                ">
                  🧠 AI Terminal
                </h2>

                <p className="
                  text-slate-400
                ">
                  Neural orchestrator activity
                </p>

              </div>

              <div className="
                px-4
                py-2
                rounded-2xl
                bg-green-500/10
                border
                border-green-500/20
                text-green-400
                font-bold
              ">
                ACTIVE
              </div>

            </div>

            <div className="
              rounded-3xl
              border
              border-white/10
              bg-black/40
              p-6
              font-mono
              text-sm
              min-h-[400px]
            ">

              <div className="space-y-4">

                {
                  logs.map((log, index) => (

                    <p
                      key={index}
                      className="
                        text-cyan-400
                        break-all
                      "
                    >
                      {log}
                    </p>
                  ))
                }

              </div>

            </div>

          </div>

        </div>

        {/* SIDE PANEL */}

        <div className="
          space-y-8
        ">

          {/* TOP STRATEGY */}

          <div className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-8
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">
              👑 Top Strategy
            </h2>

            <div className="
              p-5
              rounded-2xl
              bg-cyan-500/10
              border
              border-cyan-500/20
            ">

              <p className="
                text-slate-400
                mb-2
              ">
                Strategy
              </p>

              <h3 className="
                text-2xl
                font-black
                mb-5
              ">
                {
                  bestStrategy?.strategy ||
                  'none'
                }
              </h3>

              <div className="
                flex
                items-center
                justify-between
              ">

                <span className="
                  text-slate-400
                ">
                  Accuracy
                </span>

                <span className="
                  text-emerald-400
                  font-black
                  text-xl
                ">
                  {
                    bestStrategy?.accuracy || 0
                  }%
                </span>

              </div>

            </div>

          </div>

          {/* LIVE GENERATED NUMBERS */}

          <div className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-8
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">
              🎲 Live Generated
            </h2>

            <div className="
              space-y-4
            ">

              {
                generatedNumbers
                  .slice(0, 6)
                  .map((item) => (

                    <div
                      key={item.number}
                      className="
                        flex
                        items-center
                        justify-between
                        p-4
                        rounded-2xl
                        border
                        border-cyan-500/10
                        bg-black/20
                      "
                    >

                      <div>

                        <h3 className="
                          text-2xl
                          font-black
                        ">
                          {item.number}
                        </h3>

                        <p className="
                          text-xs
                          text-slate-500
                        ">
                          {item.source}
                        </p>

                      </div>

                      <div className="
                        text-right
                      ">

                        <p className="
                          text-cyan-400
                          font-black
                        ">
                          {item.confidence}%
                        </p>

                        <p className="
                          text-xs
                          text-slate-500
                        ">
                          confidence
                        </p>

                      </div>

                    </div>
                  ))
              }

            </div>

          </div>

          {/* LIVE FEED */}

          <div className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-8
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">
              ⚡ Neural Feed
            </h2>

            <div className="
              space-y-4
            ">

              {
                strategies.map((item) => (

                  <div
                    key={item.strategy}
                    className="
                      p-4
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/20
                    "
                  >

                    <div className="
                      flex
                      items-center
                      justify-between
                      mb-3
                    ">

                      <h3 className="
                        font-bold
                      ">
                        {item.strategy}
                      </h3>

                      <span className="
                        text-cyan-400
                        font-black
                      ">
                        {item.score}
                      </span>

                    </div>

                    <div className="
                      h-2
                      rounded-full
                      bg-white/5
                      overflow-hidden
                    ">

                      <div
                        className="
                          h-full
                          rounded-full
                          bg-gradient-to-r
                          from-cyan-400
                          to-blue-500
                        "
                        style={{
                          width:
                            `${item.accuracy}%`
                        }}
                      />

                    </div>

                  </div>
                ))
              }

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}