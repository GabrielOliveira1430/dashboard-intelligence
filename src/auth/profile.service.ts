import { api } from '../api/client';

export async function getProfile() {

  const response =
    await api.get('/auth/me');

  // 🔥 compatibilidade backend
  return (
    response.data.data ||
    response.data.user ||
    response.data.profile ||
    response.data
  );
}