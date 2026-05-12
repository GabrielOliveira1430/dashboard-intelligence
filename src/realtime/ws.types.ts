export type WSEventType =
  | 'football'
  | 'orchestrator'
  | 'system'
  | 'pong';

export type WSMessage<T = any> = {
  type: WSEventType;
  data: T;
  timestamp?: number;
};

export type WSListener<T = any> =
  (payload: T) => void;