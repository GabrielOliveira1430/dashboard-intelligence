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

import {
  env
} from '../config/env';

// =====================================
// 🔒 REFRESH CONTROL
// =====================================

let isRefreshing = false;

let pendingRequests: Array<
  (token: string) => void
> = [];

// =====================================
// 🚀 API
// =====================================

export const api = axios.create({

  baseURL: env.api.http,

  timeout: 30000,

  headers: {
    'Content-Type':
      'application/json'
  }
});

// =====================================
// 🚀 REQUEST INTERCEPTOR
// =====================================

api.interceptors.request.use(

  (config) => {

    const token =
      getAccessToken();

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

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
// ✅ RESPONSE INTERCEPTOR
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
    // 🚫 SEM RESPONSE
    // =====================================

    if (!error.response) {

      console.error(
        '🌐 NETWORK ERROR'
      );

      return Promise.reject(error);
    }

    // =====================================
    // 🔒 TOKEN EXPIRED
    // =====================================

    if (
      error.response.status === 401 &&
      !originalRequest?._retry
    ) {

      originalRequest._retry = true;

      // =====================================
      // 🔥 AGUARDAR REFRESH
      // =====================================

      if (isRefreshing) {

        return new Promise((resolve) => {

          pendingRequests.push(
            (token: string) => {

              originalRequest.headers.Authorization =
                `Bearer ${token}`;

              resolve(
                api(originalRequest)
              );
            }
          );
        });
      }

      isRefreshing = true;

      try {

        const refresh =
          getRefreshToken();

        if (!refresh) {

          throw new Error(
            'Refresh token inexistente'
          );
        }

        console.log(
          '🔄 REFRESH TOKEN'
        );

        const response =
          await refreshToken(refresh);

        saveTokens(
          response.accessToken,
          response.refreshToken
        );

        // =====================================
        // 🚀 LIBERA FILA
        // =====================================

        pendingRequests.forEach(
          (callback) =>
            callback(
              response.accessToken
            )
        );

        pendingRequests = [];

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

        return Promise.reject(
          refreshError
        );

      } finally {

        isRefreshing = false;
      }
    }

    // =====================================
    // ⏳ TIMEOUT
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