import MainLayout
from '../components/layout/MainLayout';

import FootballAlertsFeed
from '../components/football/FootballAlertsFeed';

import FootballLiveTerminal
from '../components/football/FootballLiveTerminal';

import FootballQuantumCard
from '../components/football/FootballQuantumCard';

import FootballMomentumCard
from '../components/football/FootballMomentumCard';

import FootballHeatIndex
from '../components/football/FootballHeatIndex';

import FootballDangerMeter
from '../components/football/FootballDangerMeter';

import FootballTimeline
from '../components/football/FootballTimeline';

import FootballLiveEvents
from '../components/football/FootballLiveEvents';

import FootballNeuralVisualizer
from '../components/football/FootballNeuralVisualizer';

import FootballDangerRadar
from '../components/football/tactical/FootballDangerRadar';

import FootballMomentumFlow
from '../components/football/tactical/FootballMomentumFlow';

import FootballPressureZones
from '../components/football/tactical/FootballPressureZones';

import FootballTacticalLegend
from '../components/football/tactical/FootballTacticalLegend';

export default function CommandCenter() {

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="
          text-5xl
          font-black
          mb-4
        ">
          🧠 AI Command Center
        </h1>

        <p className="
          text-slate-400
          text-lg
        ">
          Neural realtime sports intelligence
        </p>

      </div>

      {/* TOP GRID */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-4
        gap-6
        mb-6
      ">

        <FootballQuantumCard />

        <FootballMomentumCard />

        <FootballDangerMeter />

        <FootballDangerRadar />

      </div>

      {/* MID */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        mb-6
      ">

        <FootballHeatIndex />

        <FootballTimeline />

      </div>

      {/* FLOW */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        mb-6
      ">

        <FootballMomentumFlow />

        <FootballPressureZones />

      </div>

      {/* EVENTS */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        mb-6
      ">

        <FootballAlertsFeed />

        <FootballLiveEvents />

      </div>

      {/* LEGEND */}

      <div className="mb-6">

        <FootballTacticalLegend />

      </div>

      {/* NEURAL VISUALIZER */}

      <div className="mb-6">

        <FootballNeuralVisualizer />

      </div>

      {/* TERMINAL */}

      <div className="mb-6">

        <FootballLiveTerminal />

      </div>

    </MainLayout>
  );
}