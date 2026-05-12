import { useEffect, useState } from 'react';

import MainLayout from '../components/layout/MainLayout';
import StatCard from '../components/cards/StatCard';

import FootballPerformanceChart
from '../components/charts/FootballPerformanceChart';

import FootballPredictionChart
from '../components/charts/FootballPredictionChart';

import FootballLiveChart
from '../components/charts/FootballLiveChart';

import FootballMatchCard
from '../components/football/FootballMatchCard';

import { getFootballData } from '../services/football.service';

import {
  footballSocket
} from '../services/football.socket';

import {

  useFootballData,

  useFootballConnected,

  useFootballLastUpdate,

  useFootballPredictions,

  useBestPrediction,

  useTopTeams,

  useFootballMatches

} from '../store/football.selectors';

import {
  useFootballStore
} from '../store/football.store';

export default function Football() {

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [liveChartData, setLiveChartData] =
    useState<
      {
        time: string;
        confidence: number;
      }[]
    >([]);

  // ==========================================
  // 🧠 GLOBAL STORE
  // ==========================================

  const data =
    useFootballData();

  const connected =
    useFootballConnected();

  const lastUpdate =
    useFootballLastUpdate();

  const validPredictions =
    useFootballPredictions();

  const bestPrediction =
    useBestPrediction();

  const topTeams =
    useTopTeams();

  const matches =
    useFootballMatches();

  const setFootballData =
    useFootballStore(
      (state) => state.setFootballData
    );

  const setConnected =
    useFootballStore(
      (state) => state.setConnected
    );

  // ==========================================
  // 📡 LOAD INITIAL
  // ==========================================

  async function load(
    firstLoad = false
  ) {

    try {

      if (!firstLoad) {
        setRefreshing(true);
      }

      const result =
        await getFootballData();

      setFootballData(result);

      // ==========================================
      // 📈 INITIAL LIVE DATA
      // ==========================================

      const initialConfidence =
        result?.bestPrediction?.confidence || 0;

      setLiveChartData([
        {
          time:
            new Date().toLocaleTimeString(),
          confidence:
            initialConfidence
        }
      ]);

    } catch (error) {

      console.error(
        'FOOTBALL ERROR:',
        error
      );

    } finally {

      setLoading(false);

      setRefreshing(false);
    }
  }

  // ==========================================
  // ⚡ REALTIME
  // ==========================================

  useEffect(() => {

    load(true);

    footballSocket.connect();

    // ==========================================
    // 🟢 CONNECTED
    // ==========================================

    const unsubscribeConnected =
      footballSocket.onConnected(
        () => {

          console.log(
            '🟢 FOOTBALL WS CONNECTED'
          );

          setConnected(true);
        }
      );

    // ==========================================
    // 🔴 DISCONNECTED
    // ==========================================

    const unsubscribeDisconnected =
      footballSocket.onDisconnected(
        () => {

          console.log(
            '🔴 FOOTBALL WS DISCONNECTED'
          );

          setConnected(false);
        }
      );

    // ==========================================
    // ⚽ REALTIME UPDATE
    // ==========================================

    const unsubscribeFootball =
      footballSocket.onUpdate(
        (payload) => {

          console.log(
            '⚽ FOOTBALL REALTIME:',
            payload
          );

          setFootballData(payload);

          const confidence =
            payload?.bestPrediction
              ?.confidence || 0;

          setLiveChartData(
            (prev) => {

              const next = [
                ...prev,
                {
                  time:
                    new Date()
                      .toLocaleTimeString(),

                  confidence
                }
              ];

              return next.slice(-12);
            }
          );
        }
      );

    return () => {

      unsubscribeConnected();

      unsubscribeDisconnected();

      unsubscribeFootball();
    };

  }, []);

  // ==========================================
  // 🧠 SAFE DATA
  // ==========================================

  const hottestTeam =
    data?.hottestTeam;

  // ==========================================
  // ⏳ LOADING
  // ==========================================

  if (loading) {

    return (

      <MainLayout>

        <div className="flex items-center justify-center h-[70vh]">

          <div className="text-center">

            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />

            <p className="text-slate-400">
              Carregando Football AI...
            </p>

          </div>

        </div>

      </MainLayout>
    );
  }

  // ==========================================
  // 🚀 UI
  // ==========================================

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="flex justify-between mb-10">

        <div>

          <h1 className="text-5xl font-black">
            ⚽ Football AI
          </h1>

          <p className="text-slate-400">
            Última atualização:
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

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Matches"
          value={data?.totalMatches || 0}
        />

        <StatCard
          title="Predictions"
          value={validPredictions.length}
        />

        <StatCard
          title="Best Confidence"
          value={
            bestPrediction
              ? `${bestPrediction.confidence}%`
              : '--'
          }
        />

        <StatCard
          title="Fair Odd"
          value={
            bestPrediction
              ? bestPrediction.fairOdd
              : '--'
          }
        />

      </div>

      {/* HOT TEAM */}

      {hottestTeam && (

        <div className="mb-10 p-6 rounded-3xl border border-cyan-500/20 bg-white/5">

          <h2 className="text-2xl font-black mb-4">
            👑 Hottest Team
          </h2>

          <p className="text-3xl font-bold">
            {hottestTeam.team}
          </p>

          <p className="text-cyan-400 mt-2">
            Performance:
            {' '}
            {hottestTeam.performance}%
          </p>

        </div>
      )}

      {/* TOP TEAMS */}

      <div className="mb-10">

        <h2 className="text-2xl font-black mb-4">
          🏆 Top Teams
        </h2>

        <div className="space-y-3">

          {topTeams.map((team, index) => (

            <div
              key={index}
              className="p-4 rounded-xl bg-white/5 border border-white/5"
            >

              <div className="flex justify-between">

                <span>
                  {team.team}
                </span>

                <span className="text-cyan-400">
                  {team.performance}%
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* BEST PREDICTION */}

      {bestPrediction && (

        <div className="mb-10 p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5">

          <h2 className="text-2xl font-black mb-4">
            🎯 Best Prediction
          </h2>

          <p className="text-3xl font-bold mb-2">

            {bestPrediction.homeTeam}
            {' '}vs{' '}
            {bestPrediction.awayTeam}

          </p>

          <div className="space-y-2 text-slate-300">

            <p>
              Winner:
              {' '}
              <span className="text-emerald-400">
                {bestPrediction.winner}
              </span>
            </p>

            <p>
              Confidence:
              {' '}
              <span className="text-cyan-400">
                {bestPrediction.confidence}%
              </span>
            </p>

            <p>
              Market:
              {' '}
              <span className="text-violet-400">
                {bestPrediction.market}
              </span>
            </p>

            <p>
              Recommendation:
              {' '}
              <span className="text-orange-400">
                {bestPrediction.recommendation}
              </span>
            </p>

          </div>

        </div>
      )}

      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10 w-full min-w-0">

        <FootballPerformanceChart
          data={
            topTeams.map(team => ({
              team: team.team,
              performance: team.performance
            }))
          }
        />

        <FootballPredictionChart
          data={
            validPredictions
              .slice(0, 10)
              .map(prediction => ({
                match:
                  `${prediction.homeTeam} x ${prediction.awayTeam}`,
                confidence:
                  prediction.confidence
              }))
          }
        />

      </div>

      {/* LIVE REALTIME CHART */}

      <div className="mb-10 min-w-0">

        <FootballLiveChart
          data={liveChartData}
        />

      </div>

      {/* MATCHES */}

      <div>

        <h2 className="text-2xl font-black mb-4">
          ⚽ Matches
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {matches
            ?.slice(0, 12)
            .map((match, i) => {

              const prediction =
                validPredictions.find(
                  p =>
                    p.homeTeam === match.homeTeam &&
                    p.awayTeam === match.awayTeam
                );

              return (

                <FootballMatchCard
                  key={i}
                  match={match}
                  prediction={prediction}
                />

              );
            })}

        </div>

      </div>

    </MainLayout>
  );
}