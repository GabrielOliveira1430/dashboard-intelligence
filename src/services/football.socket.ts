class FootballSocket {

  private ws: WebSocket | null = null;
  private listeners: ((data: any) => void)[] = [];

  connect() {

    this.ws = new WebSocket('ws://localhost:3000');

    this.ws.onmessage = (event) => {

      const msg = JSON.parse(event.data);

      if (msg.event === 'football:update') {
        this.listeners.forEach(cb => cb(msg.data));
      }
    };
  }

  onUpdate(cb: (data: any) => void) {
    this.listeners.push(cb);
  }
}

export const footballSocket = new FootballSocket();