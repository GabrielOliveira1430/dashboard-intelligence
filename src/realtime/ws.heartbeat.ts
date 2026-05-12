// ==========================================
// ❤️ HEARTBEAT
// ==========================================

export class WSHeartbeat {

  private interval:
    number | null = null;

  // ==========================================
  // ▶️ START
  // ==========================================

  start(
    send: () => void,
    ms: number
  ) {

    this.stop();

    this.interval =
      window.setInterval(() => {

        send();

      }, ms);
  }

  // ==========================================
  // ⏹️ STOP
  // ==========================================

  stop() {

    if (
      this.interval !== null
    ) {

      clearInterval(
        this.interval
      );

      this.interval = null;
    }
  }
}