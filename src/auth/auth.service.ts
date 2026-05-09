import { api } from '../api/client';

// =====================================
// TYPES
// =====================================

type LoginPayload = {

  email: string;

  password: string;
};

type VerifyPayload = {

  email: string;

  code: string;
};

type TokenResponse = {

  accessToken: string;

  refreshToken: string;
};

// =====================================
// 🔐 LOGIN
// =====================================

export async function login(
  data: LoginPayload
) {

  try {

    const response =
      await api.post(
        '/auth/login',
        data
      );

    console.log(
      '🔐 LOGIN SUCCESS'
    );

    return response.data;

  } catch (error: any) {

    console.error(
      '❌ LOGIN ERROR:',
      error
    );

    throw new Error(
      error?.response?.data?.message ||
      'Erro ao realizar login'
    );
  }
}

// =====================================
// 🔐 VERIFY 2FA
// =====================================

export async function verify2FA(
  data: VerifyPayload
) {

  try {

    const response =
      await api.post(
        '/auth/verify-2fa',
        data
      );

    console.log(
      '✅ 2FA SUCCESS'
    );

    return response.data;

  } catch (error: any) {

    console.error(
      '❌ 2FA ERROR:',
      error
    );

    throw new Error(
      error?.response?.data?.message ||
      'Código inválido'
    );
  }
}

// =====================================
// 🔄 REFRESH TOKEN
// =====================================

export async function refreshToken(
  refreshTokenValue: string
): Promise<TokenResponse> {

  try {

    const response =
      await api.post(
        '/auth/refresh',
        {
          refreshToken:
            refreshTokenValue
        }
      );

    const data =
      response.data?.data ||
      response.data;

    console.log(
      '🔄 TOKEN REFRESH SUCCESS'
    );

    return data;

  } catch (error: any) {

    console.error(
      '❌ REFRESH TOKEN ERROR:',
      error
    );

    throw new Error(
      'Sessão expirada'
    );
  }
}