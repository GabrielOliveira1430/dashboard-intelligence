import { useEffect, useMemo, useState } from 'react';

import MainLayout from '../components/layout/MainLayout';
import StatCard from '../components/cards/StatCard';

import { getFootballData } from '../services/football.service';

import type { FootballResponse } from '../types/football.types';

export default function Football() {

  const [data, setData] = useState<FootballResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  const [connected, setConnected] = useState(false);

  // ==========================================
  // 📡 LOAD INITIAL (HTTP fallback)
  // ==========================================

  async function load(firstLoad = false) {

    try {

      if (!firstLoad) setRefreshing(true);

      const result = await getFootballData();

      setData(result);

      setLastUpdate(new Date().toLocaleTimeString());

    } catch (error) {
      console.error('FOOTBALL ERROR:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }


  // ==========================================
  // ⚡ WEBSOCKET REALTIME
  // ==========================================

  useEffect(() => {

    load(true);

    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('⚡ WebSocket conectado');
      setConnected(true);
    };

    ws.onmessage = (event) => {

      try {

        const message = JSON.parse(event.data);

        if (message.type === 'football_update') {

          setData(message.data);

          setLastUpdate(new Date().toLocaleTimeString());
        }

      } catch (error) {
        console.error('WS ERROR:', error);
      }
    };

    ws.onclose = () => {
      console.log('🔌 WebSocket desconectado');
      setConnected(false);
    };

    ws.onerror = (err) => {
      console.error('WS ERROR:', err);
      setConnected(false);
    };

    return () => {
      ws.close();
    };

  }, []);


  const bestPrediction = data?.bestPrediction;
  const hottestTeam = data?.hottestTeam;
  const topTeams = useMemo(() => data?.topTeams || [], [data]);


  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <p className="text-slate-400">Carregando Football AI...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      {/* HEADER */}
      <div className="flex justify-between mb-10">
        <div>
          <h1 className="text-5xl font-black">⚽ Football AI</h1>

          <p className="text-slate-400">
            Última atualização: {lastUpdate}
          </p>

          <p className={`text-sm ${connected ? 'text-green-400' : 'text-red-400'}`}>
            {connected ? '🟢 Realtime conectado' : '🔴 Offline'}
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
          value={data?.totalPredictions || 0}
        />

        <StatCard
          title="Best Confidence"
          value={`${bestPrediction?.confidence || 0}%`}
        />

        <StatCard
          title="Fair Odd"
          value={bestPrediction?.fairOdd || 0}
        />

      </div>

      {/* HOT TEAM */}
      {hottestTeam && (
        <div className="mb-10 p-6 rounded-3xl border border-cyan-500/20">
          <h2 className="text-2xl font-black mb-4">
            👑 Hottest Team
          </h2>

          <p className="text-3xl font-bold">
            {hottestTeam.team}
          </p>

          <p className="text-cyan-400">
            Performance: {hottestTeam.performance}%
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
            <div key={index} className="p-4 rounded-xl bg-white/5">
              <div className="flex justify-between">
                <span>{team.team}</span>
                <span className="text-cyan-400">
                  {team.performance}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MATCHES */}
      <div>
        <h2 className="text-2xl font-black mb-4">
          ⚽ Matches
        </h2>

        <div className="space-y-3">
          {data?.matches?.slice(0, 15).map((match, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5">
              <div className="flex justify-between">
                <span>
                  {match.homeTeam} vs {match.awayTeam}
                </span>
                <span className="text-slate-400">
                  {match.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </MainLayout>
  );
}