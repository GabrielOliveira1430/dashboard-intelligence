import {
  env
} from '../config/env';

type WSCallback =
  (data: any) => void;

class WSClient {

  private ws: WebSocket | null = null;

  private reconnectAttempts = 0;

  private isConnecting = false;

  private manualClose = false;

  private heartbeatInterval:
    number | null = null;

  private listeners = new Map<
    string,
    Set<WSCallback>
  >();

  // ==========================================
  // 🚀 CONNECT
  // ==========================================

  connect() {

    // ==========================================
    // 🛡️ SAFE CONNECT
    // ==========================================

    if (
      this.ws &&
      (
        this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING
      )
    ) {
      return;
    }

    if (this.isConnecting) {
      return;
    }

    this.manualClose = false;

    this.isConnecting = true;

    // ==========================================
    // 🔐 TOKEN
    // ==========================================

    const token =
      localStorage.getItem('access_token') ||
      localStorage.getItem('accessToken');

    if (!token) {

      console.log(
        '⚠️ WS sem token'
      );

      this.isConnecting = false;

      return;
    }

    // ==========================================
    // 🌐 URL
    // ==========================================

    const url =
      `${env.api.ws}?token=${token}`;

    console.log(
      '⚡ WS CONNECTING:',
      url
    );

    this.ws =
      new WebSocket(url);

    // ==========================================
    // ✅ OPEN
    // ==========================================

    this.ws.onopen = () => {

      console.log(
        '🟢 WS CONNECTED'
      );

      this.reconnectAttempts = 0;

      this.isConnecting = false;

      this.startHeartbeat();
    };

    // ==========================================
    // 📨 MESSAGE
    // ==========================================

    this.ws.onmessage = (
      event
    ) => {

      try {

        const msg =
          JSON.parse(event.data);

        const type =
          msg?.type;

        const payload =
          msg?.data ?? msg;

        // ❤️ HEARTBEAT

        if (type === 'pong') {
          return;
        }

        if (!type) {
          return;
        }

        const callbacks =
          this.listeners.get(type);

        if (!callbacks) {
          return;
        }

        callbacks.forEach(cb => {

          try {

            cb(payload);

          } catch (error) {

            console.error(
              '❌ WS CALLBACK ERROR:',
              error
            );
          }
        });

      } catch (error) {

        console.error(
          '❌ WS PARSE ERROR:',
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

      this.stopHeartbeat();

      this.isConnecting = false;

      this.ws = null;

      if (this.manualClose) {
        return;
      }

      const timeout = Math.min(
        1000 * 2 ** this.reconnectAttempts,
        10000
      );

      this.reconnectAttempts++;

      console.log(
        `🔄 WS RECONNECT IN ${timeout}ms`
      );

      setTimeout(() => {
        this.connect();
      }, timeout);
    };
  }

  // ==========================================
  // ❤️ HEARTBEAT
  // ==========================================

  private startHeartbeat() {

    this.stopHeartbeat();

    this.heartbeatInterval =
      window.setInterval(() => {

        if (
          this.ws?.readyState ===
          WebSocket.OPEN
        ) {

          this.ws.send(
            JSON.stringify({
              type: 'ping',
              timestamp: Date.now()
            })
          );
        }

      }, 30000);
  }

  private stopHeartbeat() {

    if (this.heartbeatInterval) {

      clearInterval(
        this.heartbeatInterval
      );

      this.heartbeatInterval =
        null;
    }
  }

  // ==========================================
  // 📡 SUBSCRIBE
  // ==========================================

  subscribe(
    event: string,
    callback: WSCallback
  ) {

    this.connect();

    if (
      !this.listeners.has(event)
    ) {

      this.listeners.set(
        event,
        new Set()
      );
    }

    this.listeners
      .get(event)
      ?.add(callback);

    console.log(
      `📡 WS SUBSCRIBED: ${event}`
    );

    // ==========================================
    // 🔥 UNSUBSCRIBE
    // ==========================================

    return () => {

      this.listeners
        .get(event)
        ?.delete(callback);

      console.log(
        `❌ WS UNSUBSCRIBED: ${event}`
      );

      // 🧹 REMOVE EMPTY SET

      if (
        this.listeners
          .get(event)
          ?.size === 0
      ) {

        this.listeners.delete(event);
      }
    };
  }

  // ==========================================
  // ❌ DISCONNECT
  // ==========================================

  disconnect() {

    console.log(
      '🛑 WS MANUAL DISCONNECT'
    );

    this.manualClose = true;

    this.stopHeartbeat();

    this.ws?.close();

    this.ws = null;
  }
}

// ==========================================
// 🚀 SINGLETON
// ==========================================

export const wsClient =
  new WSClient();