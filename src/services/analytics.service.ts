import { api } from '../api/client';

// =====================================
// TYPES
// =====================================

export type AnalyticsData = {
  hotNumbers?: any[];
  coldNumbers?: any[];
  generated?: any;
  summary?: any;
};

// =====================================
// GET ANALYTICS
// =====================================

export async function getAnalytics():
Promise<AnalyticsData> {

  try {

    const response =
      await api.get('/analytics');

    const data =
      response.data.data ||
      response.data.result ||
      response.data;

    console.log(
      '📊 ANALYTICS SUCCESS:',
      data
    );

    return data;

  } catch (error: any) {

    console.error(
      '❌ ANALYTICS ERROR:',
      error
    );

    // 🔥 fallback seguro
    return {
      hotNumbers: [],
      coldNumbers: [],
      generated: {},
      summary: {},
    };
  }
}