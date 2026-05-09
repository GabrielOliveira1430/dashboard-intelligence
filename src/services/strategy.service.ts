import { api } from '../api/client';

// =====================================
// TYPES
// =====================================

export type Strategy = {
  strategy: string;
  accuracy: number;
  coverage: number;
  diversity: number;
  score: number;
};

// =====================================
// GET STRATEGIES
// =====================================

export async function getStrategies():
Promise<Strategy[]> {

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

    console.log(
      '🔥 ORCHESTRATOR RAW:',
      response.data
    );

    const data =
      response.data?.data ||
      response.data?.result ||
      response.data;

    const strategies =
      data?.decision?.ranking ||
      data?.strategies ||
      [];

    console.log(
      '🧠 STRATEGIES:',
      strategies
    );

    return strategies;

  } catch (error: any) {

    console.error(
      '❌ STRATEGIES ERROR:',
      error
    );

    return [];
  }
}