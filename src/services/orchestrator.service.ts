// src/services/orchestrator.service.ts

import { api } from '../api/client';
import type {
  OrchestratorResponse,
  GeneratedNumber
} from '../types/orchestrator.types';

// =====================================
// 🧠 LOCAL MEMORY (AUTO-LEARNING FRONT)
// =====================================

const memory = {
  lastConfidenceAvg: 0,
  lastTopNumbers: [] as GeneratedNumber[],
  patterns: [] as string[],
};

// =====================================
// 🔧 SAFE NORMALIZER (NUNCA QUEBRA TYPESCRIPT)
// =====================================

function normalize(raw: any): OrchestratorResponse {

  const analytics = raw?.analytics || {};

  const generated = raw?.generated || {};

  const decision = raw?.decision || {};

  const summary = raw?.summary || {};

  const evolution = raw?.evolution || {};

  return {
    analytics: {
      hotNumbers: analytics.hotNumbers || [],
      coldNumbers: analytics.coldNumbers || [],
    },

    generated: {
      total: generated.total || 0,
      numbers: (generated.numbers || []).map((n: any) => ({
        number: String(n.number ?? '0'),
        confidence: Number(n.confidence ?? 0),
        source: n.source ?? 'unknown',
        cluster: n.cluster ?? 'default',
        patternScore: Number(n.patternScore ?? 0),
        patternTags: n.patternTags ?? [],
      })),
    },

    decision: {
      bestStrategy: decision.bestStrategy || 'unknown',
      ranking: decision.ranking || [],
    },

    evolution: {
      mutationsCreated: evolution.mutationsCreated || 0,
      evolvedStrategies: evolution.evolvedStrategies || [],
      recommendations: evolution.recommendations || [],
    },

    summary: {
      bestStrategy: summary.bestStrategy || 'unknown',
      totalStrategies: summary.totalStrategies || 0,
      bestScore: summary.bestScore || 0,
      bestAccuracy: summary.bestAccuracy || 0,
      bestCoverage: summary.bestCoverage || 0,
      bestDiversity: summary.bestDiversity || 0,
      systemHealth: summary.systemHealth || 0,
      exploration: summary.exploration || 0,
      exploitation: summary.exploitation || 0,
      mode: summary.mode || 'stable',
      retiredStrategies: summary.retiredStrategies || 0,
    },
  };
}

// =====================================
// 🧠 AUTO-LEARNING UPDATE
// =====================================

function updateMemory(data: OrchestratorResponse) {

  const numbers = data.generated?.numbers || [];

  const top = [...numbers]
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  memory.lastTopNumbers = top;

  const avg =
    numbers.reduce((acc, n) => acc + n.confidence, 0) /
    Math.max(1, numbers.length);

  memory.lastConfidenceAvg = Math.round(avg);

  memory.patterns = numbers
    .map(n => `${n.cluster}-${Math.round(n.patternScore)}`)
    .slice(0, 10);
}

// =====================================
// 🚀 SERVICE PRINCIPAL
// =====================================

export async function getOrchestrator(): Promise<OrchestratorResponse> {

  try {

    const response = await api.post(
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
        learning: memory,
      }
    );

    const raw =
      response.data?.data ??
      response.data?.result ??
      response.data;

    const normalized = normalize(raw);

    updateMemory(normalized);

    console.log('🧠 ORCHESTRATOR AI:', {
      bestStrategy: normalized.summary.bestStrategy,
      systemHealth: normalized.summary.systemHealth,
      avgConfidence: memory.lastConfidenceAvg,
    });

    return normalized;

  } catch (error: any) {

    console.error('❌ ORCHESTRATOR ERROR:', error);

    throw new Error(
      error?.response?.data?.message ||
      'Erro ao carregar orchestrator'
    );
  }
}