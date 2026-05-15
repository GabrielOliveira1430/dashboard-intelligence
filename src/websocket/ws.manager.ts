// src/websocket/ws.manager.ts

import { wsClient } from './ws.client';

import { WS_EVENTS } from './ws.events';

import {
  useFootballStore
} from '../store/football.store';

import {
  useFootballRealtimeStore
} from '../store/footballRealtime.store';

import {
  useFootballQuantumStore
} from '../store/footballQuantum.store';

import {
  useFootballTacticalStore
} from '../store/footballTactical.store';

// ==========================================
// ⚽ WS MANAGER
// ==========================================

class WSManager {

  // ==========================================
  // 🚀 START
  // ==========================================

  start() {

    // ==========================================
    // ⚽ SNAPSHOT
    // ==========================================

    wsClient.subscribe(
      WS_EVENTS.FOOTBALL_SNAPSHOT,
      (payload: any) => {

        console.log(
          '📸 FOOTBALL SNAPSHOT:',
          payload
        );

        if (!payload) {
          return;
        }

        // ==========================================
        // MAIN STORE
        // ==========================================

        useFootballStore
          .getState()
          .setFootballData(payload);

        // ==========================================
        // REALTIME STORE
        // ==========================================

        useFootballRealtimeStore
          .getState()
          .setSnapshot(payload);

        // ==========================================
        // QUANTUM
        // ==========================================

        useFootballQuantumStore
          .getState()
          .setQuantum(
            payload.quantum || []
          );

        // ==========================================
        // TACTICAL
        // ==========================================

        useFootballTacticalStore
          .getState()
          .setTactical(
            payload.tactical || []
          );
      }
    );

    // ==========================================
    // ⚽ UPDATE
    // ==========================================

    wsClient.subscribe(
      WS_EVENTS.FOOTBALL_UPDATE,
      (payload: any) => {

        console.log(
          '⚡ FOOTBALL UPDATE:',
          payload
        );

        if (!payload) {
          return;
        }

        useFootballStore
          .getState()
          .setFootballData(payload);

        useFootballRealtimeStore
          .getState()
          .setSnapshot(payload);

        if (payload.quantum) {

          useFootballQuantumStore
            .getState()
            .setQuantum(
              payload.quantum
            );
        }

        if (payload.tactical) {

          useFootballTacticalStore
            .getState()
            .setTactical(
              payload.tactical
            );
        }
      }
    );

    // ==========================================
    // 🚨 ALERT
    // ==========================================

    wsClient.subscribe(
      WS_EVENTS.FOOTBALL_ALERT,
      (payload: any) => {

        if (!payload) {
          return;
        }

        useFootballRealtimeStore
          .getState()
          .addAlert(payload);
      }
    );

    // ==========================================
    // 🧠 MOMENTUM
    // ==========================================

    wsClient.subscribe(
      WS_EVENTS.FOOTBALL_MOMENTUM,
      (payload: any) => {

        if (!payload) {
          return;
        }

        useFootballRealtimeStore
          .getState()
          .addNeural(payload);
      }
    );

    // ==========================================
    // ⚛️ QUANTUM
    // ==========================================

    wsClient.subscribe(
      WS_EVENTS.FOOTBALL_QUANTUM,
      (payload: any) => {

        if (!payload) {
          return;
        }

        const current =
          useFootballQuantumStore
            .getState()
            .quantum;

        useFootballQuantumStore
          .getState()
          .setQuantum([
            payload,
            ...current
          ].slice(0, 20));

        useFootballRealtimeStore
          .getState()
          .addQuantum(payload);
      }
    );

    // ==========================================
    // 🧠 TACTICAL
    // ==========================================

    wsClient.subscribe(
      WS_EVENTS.FOOTBALL_NEURAL,
      (payload: any) => {

        if (!payload) {
          return;
        }

        const current =
          useFootballTacticalStore
            .getState()
            .tactical;

        useFootballTacticalStore
          .getState()
          .setTactical([
            payload,
            ...current
          ].slice(0, 20));
      }
    );

    // ==========================================
    // 🕒 TIMELINE
    // ==========================================

    wsClient.subscribe(
      WS_EVENTS.FOOTBALL_TIMELINE,
      (payload: any) => {

        if (!payload) {
          return;
        }

        useFootballRealtimeStore
          .getState()
          .addTimeline(payload);
      }
    );

    // ==========================================
    // 🔥 LIVE EVENT
    // ==========================================

    wsClient.subscribe(
      WS_EVENTS.FOOTBALL_LIVE_EVENT,
      (payload: any) => {

        if (!payload) {
          return;
        }

        useFootballRealtimeStore
          .getState()
          .addEvent(payload);
      }
    );

    // ==========================================
    // 💻 TERMINAL
    // ==========================================

    wsClient.subscribe(
      WS_EVENTS.FOOTBALL_TERMINAL,
      (payload: any) => {

        if (!payload) {
          return;
        }

        useFootballRealtimeStore
          .getState()
          .addTerminalLog(payload);
      }
    );

    // ==========================================
    // 🚀 CONNECT
    // ==========================================

    wsClient.connect();
  }

  // ==========================================
  // ❌ STOP
  // ==========================================

  stop() {

    wsClient.disconnect();
  }
}

export const wsManager =
  new WSManager(); 