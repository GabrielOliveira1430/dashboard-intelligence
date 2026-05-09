import axios from 'axios';

import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  removeTokens
} from '../auth/auth.storage';

import {
  refreshToken
} from '../auth/auth.service';

// =====================================
// API
// =====================================

export const api = axios.create({

  baseURL:
    'http://localhost:3000/api/v1',

  timeout: 15000,
});

// =====================================
// REQUEST INTERCEPTOR
// =====================================

api.interceptors.request.use(

  (config) => {

    const token =
      getAccessToken();

    // 🔥 AUTH HEADER
    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    // 🔥 JSON HEADER
    config.headers['Content-Type'] =
      'application/json';

    return config;
  },

  (error) => {

    console.error(
      '❌ REQUEST ERROR:',
      error
    );

    return Promise.reject(error);
  }
);

// =====================================
// RESPONSE INTERCEPTOR
// =====================================

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    // =====================================
    // 🔥 TOKEN EXPIRED
    // =====================================

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry
    ) {

      originalRequest._retry = true;

      try {

        const refresh =
          getRefreshToken();

        // 🔥 sem refresh token
        if (!refresh) {

          throw new Error(
            'Refresh token inexistente'
          );
        }

        const response =
          await refreshToken(refresh);

        // 🔥 salva novos tokens
        saveTokens(
          response.accessToken,
          response.refreshToken
        );

        // 🔥 atualiza header
        originalRequest.headers.Authorization =
          `Bearer ${response.accessToken}`;

        // 🔥 retry request
        return api(originalRequest);

      } catch (refreshError) {

        console.error(
          '❌ REFRESH ERROR:',
          refreshError
        );

        removeTokens();

        window.location.href =
          '/login';
      }
    }

    // =====================================
    // 🔥 NETWORK ERROR
    // =====================================

    if (
      error.code === 'ECONNABORTED'
    ) {

      console.error(
        '⏳ TIMEOUT ERROR'
      );
    }

    // =====================================
    // 🔥 SERVER ERROR
    // =====================================

    if (
      error.response?.status >= 500
    ) {

      console.error(
        '🔥 SERVER ERROR'
      );
    }

    return Promise.reject(error);
  }
);