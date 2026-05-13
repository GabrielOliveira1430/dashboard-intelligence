import { wsClient } from '../websocket/ws.client';

class WSManager {

  private initialized = false;

  initialize() {

    if (this.initialized) {
      return;
    }

    this.initialized = true;

    console.log(
      '🚀 WS MANAGER STARTED'
    );

    wsClient.connect();
  }
}

export const wsManager =
  new WSManager();