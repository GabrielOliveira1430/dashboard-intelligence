// src/services/football.service.ts

import { api } from '../api/client';

import type {
  FootballResponse
} from '../types/football.types';

// =====================================
// ⚽ SERVICE
// =====================================

export async function getFootballData():
Promise<FootballResponse> {

  try {

    const response =
      await api.get('/football/live');

    const data: FootballResponse =

      response.data?.data ||

      response.data;

    // =====================================
    // 🧠 SAFE NORMALIZATION
    // =====================================

    const normalized: FootballResponse = {

      success:
        data?.success || false,

      matches:
        data?.matches || [],

      totalMatches:
        data?.totalMatches || 0,

      analytics:
        data?.analytics || [],

      topTeams:
        data?.topTeams || [],

      hottestTeam:
        data?.hottestTeam || null,

      predictions:
        data?.predictions || [],

      bestPrediction:
        data?.bestPrediction || null,

      odds:
        data?.odds || [],

      totalPredictions:
        data?.totalPredictions || 0,

      totalOdds:
        data?.totalOdds || 0,

      updatedAt:
        data?.updatedAt || ''
    };

    console.log(
      '⚽ FOOTBALL:',
      normalized
    );

    return normalized;

  } catch (error: any) {

    console.error(
      '❌ FOOTBALL ERROR:',
      error
    );

    throw new Error(

      error?.response?.data?.message ||

      'Erro ao carregar futebol'
    );
  }
}