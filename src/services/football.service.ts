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

    console.log(
      '⚽ FOOTBALL:',
      data
    );

    return data;

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