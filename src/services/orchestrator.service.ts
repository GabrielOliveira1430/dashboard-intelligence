
// src/services/orchestrator.service.ts

import { api } from '../api/client';

import type {
  OrchestratorResponse
} from '../types/orchestrator.types';


// =====================================
// 🚀 SERVICE
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


    // =====================================
    // 🔥 FLEXIBLE RESPONSE
    // =====================================

    const data: OrchestratorResponse =

      response.data?.data ||

      response.data?.result ||

      response.data;


    // =====================================
    // 🧠 DEBUG
    // =====================================

    console.log(
      '🔥 ORCHESTRATOR SUCCESS:',
      data
    );


    // =====================================
    // 🚀 RETURN
    // =====================================

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

