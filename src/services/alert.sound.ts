// ==========================================
// 🔊 ALERT SOUND ENGINE
// ==========================================

class AlertSoundEngine {

  private enabled = true;

  // ==========================================
  // 🔊 PLAY
  // ==========================================

  play(type: string) {

    if (!this.enabled) {
      return;
    }

    try {

      const audio = new Audio(
        this.resolve(type)
      );

      audio.volume = 0.4;

      audio.play();

    } catch (error) {

      console.error(
        '🔇 SOUND ERROR:',
        error
      );
    }
  }

  // ==========================================
  // 🎵 RESOLVE
  // ==========================================

  private resolve(type: string) {

    switch (type) {

      case 'PRESSURE_GOAL':
        return '/sounds/goal-alert.mp3';

      case 'ODD_ERROR':
        return '/sounds/danger.mp3';

      case 'VALUE_BET':
        return '/sounds/cash.mp3';

      default:
        return '/sounds/notification.mp3';
    }
  }

  // ==========================================
  // ⚙️ ENABLE
  // ==========================================

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }
}

export const alertSoundEngine =
  new AlertSoundEngine();