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
// CACHE
// =====================================

let cachedStrategies:
  Strategy[] | null = null;

let lastFetch = 0;

const CACHE_TIME =
  5000;

// =====================================
// GET STRATEGIES
// =====================================

export async function getStrategies():
Promise<Strategy[]> {

  try {

    // =====================================
    // CACHE
    // =====================================

    const now =
      Date.now();

    if (

      cachedStrategies &&

      now - lastFetch <
      CACHE_TIME

    ) {

      console.log(
        '⚡ USING CACHE'
      );

      return cachedStrategies;
    }

    console.log(
      '🚀 CALLING ORCHESTRATOR'
    );

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
      '🔥 FULL RESPONSE:',
      response
    );

    const raw =
      response.data;

    console.log(
      '🔥 RESPONSE DATA:',
      raw
    );

    const data =

      raw?.data ||

      raw?.result ||

      raw;

    console.log(
      '🧠 EXTRACTED DATA:',
      data
    );

    const strategies =

      data?.decision?.ranking ||

      data?.strategies ||

      [];

    console.log(
      '✅ FINAL STRATEGIES:',
      strategies
    );

    // =====================================
    // SAVE CACHE
    // =====================================

    cachedStrategies =
      strategies;

    lastFetch =
      now;

    return strategies;

  } catch (error: any) {

    console.error(
      '❌ STRATEGIES ERROR:',
      error
    );

    return [];
  }
}