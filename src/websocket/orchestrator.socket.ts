import { wsClient } from './ws.client';

// ==========================================
// 🧠 ORCHESTRATOR WS
// ==========================================

export function connectOrchestratorWS(
  onMessage: (data: any) => void
) {

  console.log(
    '🧠 ORCHESTRATOR SUBSCRIBED'
  );

  const unsubscribe =
    wsClient.subscribe(
      'orchestrator',
      (payload) => {

        console.log(
          '🧠 ORCHESTRATOR REALTIME:',
          payload
        );

        onMessage(payload);
      }
    );

  return {

    close: () => {

      console.log(
        '🔌 ORCHESTRATOR UNSUBSCRIBED'
      );

      unsubscribe();
    }
  };
}