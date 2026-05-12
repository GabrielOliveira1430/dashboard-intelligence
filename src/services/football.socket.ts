import { wsClient } from '../websocket/ws.client';

class FootballSocket {

  connect() {
    wsClient.connect();
  }

  onUpdate(
    cb: (data: any) => void
  ) {

    return wsClient.subscribe(
      'football',
      cb
    );
  }
}

export const footballSocket =
  new FootballSocket();