let ws: WebSocket | null = null;
let reconnectAttempts = 0;
let isManuallyClosed = false;

// ==========================================
// ⚡ CONNECT WS (ROBUSTO)
// ==========================================

export function connectOrchestratorWS(onMessage: (data: any) => void) {

  const url = 'ws://localhost:3000/ws';

  function connect() {

    ws = new WebSocket(url);

    ws.onopen = () => {

      console.log('⚡ WS conectado');

      reconnectAttempts = 0;
    };

    ws.onmessage = (event) => {

      try {

        const msg = JSON.parse(event.data);

        const data = msg.data ?? msg;

        onMessage(data);

      } catch (err) {
        console.error('WS parse error:', err);
      }
    };

    ws.onerror = (err) => {
      console.error('WS error:', err);
    };

    ws.onclose = () => {

      console.log('🔌 WS desconectado');

      if (isManuallyClosed) return;

      // 🔥 backoff exponencial (IMPORTANTE)
      const timeout = Math.min(1000 * 2 ** reconnectAttempts, 15000);

      reconnectAttempts++;

      setTimeout(() => {
        console.log('♻️ Reconectando WS...');
        connect();
      }, timeout);
    };
  }

  connect();

  return {
    close: () => {
      isManuallyClosed = true;
      ws?.close();
    }
  };
}