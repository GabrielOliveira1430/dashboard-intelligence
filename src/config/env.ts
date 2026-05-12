const protocol =
  window.location.protocol === 'https:'
    ? 'wss'
    : 'ws';

const host =
  window.location.hostname;

export const env = {

  api: {

    http:
      `http://${host}:3000/api/v1`,

    ws:
      `${protocol}://${host}:3000/ws`
  }
};