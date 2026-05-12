import type {
  WSEventsMap
} from './ws.types.events';

// ==========================================
// 📡 CALLBACK
// ==========================================

type EventCallback<
  K extends keyof WSEventsMap
> = (
  payload: WSEventsMap[K]
) => void;

// ==========================================
// 🚀 EMITTER
// ==========================================

class WSEmitter {

  private listeners = new Map<
    keyof WSEventsMap,
    Set<(payload: any) => void>
  >();

  // ==========================================
  // 📡 ON
  // ==========================================

  on<
    K extends keyof WSEventsMap
  >(
    event: K,
    callback: EventCallback<K>
  ) {

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

    // ==========================================
    // 🔥 UNSUBSCRIBE
    // ==========================================

    return () => {

      this.listeners
        .get(event)
        ?.delete(callback);

      if (
        this.listeners
          .get(event)
          ?.size === 0
      ) {

        this.listeners.delete(
          event
        );
      }
    };
  }

  // ==========================================
  // 📤 EMIT
  // ==========================================

  emit<
    K extends keyof WSEventsMap
  >(
    event: K,
    payload?: WSEventsMap[K]
  ) {

    const callbacks =
      this.listeners.get(event);

    if (!callbacks) {
      return;
    }

    callbacks.forEach(
      (callback) => {

        try {

          callback(payload);

        } catch (error) {

          console.error(
            '❌ WS EMITTER ERROR:',
            error
          );
        }
      }
    );
  }

  // ==========================================
  // 🧹 CLEAR
  // ==========================================

  clear() {

    this.listeners.clear();
  }
}

export const wsEmitter =
  new WSEmitter();