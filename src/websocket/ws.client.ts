// src/websocket/ws.client.ts

import {
  env
} from '../config/env';

import {
  getAccessToken
} from '../auth/auth.storage';

import {
  useWSConnectionStore
} from '../store/ws.connection.store';

import {
  wsEmitter
} from './ws.emitter';

import {
  WS_EVENTS,
  isWSMessage
} from './ws.events';

import type {
  WSEventsMap
} from './ws.types.events';

import {
  WSHeartbeat
} from '../realtime/ws.heartbeat';

import {
  WSReconnect
} from '../realtime/ws.reconnect';

import {
  WS_CONFIG
} from '../realtime/ws.constants';

// ==========================================
// 📡 GENERIC WS MESSAGE
// ==========================================

type WSIncomingMessage = {

  type: keyof WSEventsMap;

  data?: unknown;

  timestamp?: number;
};

// ==========================================
// 🚀 WS CLIENT
// ==========================================

class WSClient {

  private ws:
    WebSocket | null = null;

  private connecting = false;

  private manualClose = false;

  private heartbeat =
    new WSHeartbeat();

  private reconnect =
    new WSReconnect();

  // ==========================================
  // 🧠 STORE
  // ==========================================

  private connectionStore =
    useWSConnectionStore.getState();

  // ==========================================
  // 🚀 CONNECT
  // ==========================================

  connect() {

    // ==========================================
    // 🔒 ALREADY CONNECTING
    // ==========================================

    if (
      this.connecting
    ) {
      return;
    }

    // ==========================================
    // 🔒 ALREADY CONNECTED
    // ==========================================

    if (
      this.ws &&
      (
        this.ws.readyState ===
          WebSocket.OPEN ||

        this.ws.readyState ===
          WebSocket.CONNECTING
      )
    ) {
      return;
    }

    // ==========================================
    // 🔑 TOKEN
    // ==========================================

    const token =
      getAccessToken();

    if (!token) {

      console.log(
        '⚠️ WS sem token'
      );

      return;
    }

    // ==========================================
    // ⚡ STATE
    // ==========================================

    this.connecting = true;

    this.manualClose = false;

    // ==========================================
    // 🌐 URL
    // ==========================================

    const url =
      `${env.api.ws}?token=${token}`;

    console.log(
      '⚡ WS CONNECTING:',
      url
    );

    // ==========================================
    // 🔌 SOCKET
    // ==========================================

    this.ws =
      new WebSocket(url);

    // ==========================================
    // ✅ OPEN
    // ==========================================

    this.ws.onopen = () => {

      console.log(
        '🟢 WS CONNECTED'
      );

      this.connecting = false;

      this.reconnect.reset();

      // ==========================================
      // 🧠 STORE
      // ==========================================

      this.connectionStore
        .setConnected(true);

      this.connectionStore
        .setReconnecting(false);

      this.connectionStore
        .setReconnectAttempts(0);

      // ==========================================
      // 📡 EVENTS
      // ==========================================

      wsEmitter.emit(
        WS_EVENTS.CONNECTED
      );

      wsEmitter.emit(
        WS_EVENTS.CONNECT
      );

      // ==========================================
      // ❤️ HEARTBEAT
      // ==========================================

      this.heartbeat.start(

        () => {

          this.send(
            WS_EVENTS.PING,
            {
              timestamp:
                Date.now()
            }
          );

          this.connectionStore
            .updateHeartbeat();

        },

        WS_CONFIG.heartbeatInterval
      );
    };

    // ==========================================
    // 📨 MESSAGE
    // ==========================================

    this.ws.onmessage = (
      event
    ) => {

      try {

        const parsed:
          WSIncomingMessage =
            JSON.parse(
              event.data
            );

        // ==========================================
        // 🛡️ SAFE VALIDATION
        // ==========================================

        if (
          !isWSMessage(parsed)
        ) {
          return;
        }

        // ==========================================
        // ❤️ PONG
        // ==========================================

        if (
          parsed.type ===
          WS_EVENTS.PONG
        ) {

          return;
        }

        // ==========================================
        // 📡 EMIT EVENT
        // ==========================================

        wsEmitter.emit(
          parsed.type,
          parsed.data as never
        );

      } catch (error) {

        console.error(
          '❌ WS MESSAGE ERROR:',
          error
        );
      }
    };

    // ==========================================
    // ❌ ERROR
    // ==========================================

    this.ws.onerror = (
      error
    ) => {

      console.error(
        '🔴 WS ERROR:',
        error
      );
    };

    // ==========================================
    // 🔌 CLOSE
    // ==========================================

    this.ws.onclose = () => {

      console.log(
        '🔌 WS DISCONNECTED'
      );

      // ==========================================
      // 🧹 RESET
      // ==========================================

      this.connecting = false;

      this.ws = null;

      this.heartbeat.stop();

      // ==========================================
      // 🧠 STORE
      // ==========================================

      this.connectionStore
        .setConnected(false);

      // ==========================================
      // 📡 EVENTS
      // ==========================================

      wsEmitter.emit(
        WS_EVENTS.DISCONNECTED
      );

      wsEmitter.emit(
        WS_EVENTS.DISCONNECT
      );

      // ==========================================
      // 🛑 MANUAL CLOSE
      // ==========================================

      if (
        this.manualClose
      ) {

        return;
      }

      // ==========================================
      // 🚫 LIMIT
      // ==========================================

      if (
        !this.reconnect.canReconnect()
      ) {

        console.log(
          '🚫 WS reconnect limit'
        );

        return;
      }

      // ==========================================
      // 🔄 RECONNECT
      // ==========================================

      this.connectionStore
        .setReconnecting(true);

      const delay =
        this.reconnect.nextDelay();

      this.connectionStore
        .setReconnectAttempts(delay);

      console.log(
        `🔄 WS RECONNECT IN ${delay}ms`
      );

      setTimeout(
        () => {

          this.connect();

        },
        delay
      );
    };
  }

  // ==========================================
  // 📡 SUBSCRIBE
  // ==========================================

  subscribe<
    K extends keyof WSEventsMap
  >(
    event: K,
    callback: (
      payload: WSEventsMap[K]
    ) => void
  ) {

    this.connect();

    return wsEmitter.on(
      event,
      callback
    );
  }

  // ==========================================
  // 📤 SEND
  // ==========================================

  send<
    K extends keyof WSEventsMap
  >(
    type: K,
    data?: WSEventsMap[K]
  ) {

    // ==========================================
    // 🛑 SOCKET CLOSED
    // ==========================================

    if (
      !this.ws ||
      this.ws.readyState !==
        WebSocket.OPEN
    ) {

      return;
    }

    try {

      this.ws.send(
        JSON.stringify({

          type,

          data,

          timestamp:
            Date.now()
        })
      );

    } catch (error) {

      console.error(
        '❌ WS SEND ERROR:',
        error
      );
    }
  }

  // ==========================================
  // 📶 STATUS
  // ==========================================

  isConnected() {

    return (
      this.ws?.readyState ===
      WebSocket.OPEN
    );
  }

  // ==========================================
  // ❌ DISCONNECT
  // ==========================================

  disconnect() {

    this.manualClose = true;

    this.heartbeat.stop();

    this.ws?.close();

    this.ws = null;

    this.connecting = false;

    wsEmitter.clear();

    console.log(
      '🛑 WS MANUAL DISCONNECT'
    );
  }
}

// ==========================================
// 🚀 EXPORT
// ==========================================

export const wsClient =
  new WSClient();