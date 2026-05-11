import { WebSocketServer } from 'ws';

type Client = any;

class WSServer {
  private wss: WebSocketServer;
  private clients: Set<Client> = new Set();

  constructor(server: any) {
    this.wss = new WebSocketServer({ server });

    this.wss.on('connection', (ws) => {
      this.clients.add(ws);

      ws.on('close', () => {
        this.clients.delete(ws);
      });
    });
  }

  broadcast(event: string, data: any) {
    const payload = JSON.stringify({
      event,
      data,
      timestamp: Date.now(),
    });

    this.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(payload);
      }
    });
  }
}

export default WSServer;