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

  // 🚀 AUMENTADO
  timeout: 60000,
});

// =====================================
// REQUEST INTERCEPTOR
// =====================================

api.interceptors.request.use(

  (config) => {

    const token =
      getAccessToken();

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    config.headers['Content-Type'] =
      'application/json';

    console.log(
      '🚀 REQUEST:',
      config.url
    );

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

  (response) => {

    console.log(
      '✅ RESPONSE:',
      response.config.url
    );

    return response;
  },

  async (error) => {

    const originalRequest =
      error.config;

    // =====================================
    // TOKEN EXPIRED
    // =====================================

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry
    ) {

      originalRequest._retry = true;

      try {

        const refresh =
          getRefreshToken();

        if (!refresh) {

          throw new Error(
            'Refresh token inexistente'
          );
        }

        const response =
          await refreshToken(refresh);

        saveTokens(
          response.accessToken,
          response.refreshToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${response.accessToken}`;

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
    // TIMEOUT
    // =====================================

    if (
      error.code === 'ECONNABORTED'
    ) {

      console.error(
        '⏳ TIMEOUT ERROR'
      );
    }

    // =====================================
    // SERVER
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