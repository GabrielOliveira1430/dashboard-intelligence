import { api } from '../api/client';

// =====================================
// TYPES
// =====================================

type OrchestratorResponse = any;

// =====================================
// SERVICE
// =====================================

export async function getOrchestrator():
Promise<OrchestratorResponse> {

  try {

    const response =
      await api.post(
        '/orchestrator/run',
        {
          history: [
            '1234',
            '5678',
            '9999',
            '1111',
            '2222',
            '3333',
            '4444',
          ],
        }
      );

    // 🔥 suporta múltiplos formatos
    const data =
      response.data.data ||
      response.data.result ||
      response.data;

    console.log(
      '🔥 ORCHESTRATOR SUCCESS:',
      data
    );

    return data;

  } catch (error: any) {

    console.error(
      '❌ ORCHESTRATOR ERROR:',
      error
    );

    throw new Error(
      error?.response?.data?.message ||
      'Erro ao carregar orchestrator'
    );
  }
}