const ACCESS_TOKEN_KEY =
  'access_token';

const REFRESH_TOKEN_KEY =
  'refresh_token';

// =====================================
// 🔥 SAVE TOKENS
// =====================================

export function saveTokens(
  accessToken: string,
  refreshToken: string
) {

  try {

    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      accessToken
    );

    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      refreshToken
    );

  } catch (error) {

    console.error(
      '❌ STORAGE SAVE ERROR:',
      error
    );
  }
}

// =====================================
// 🔥 GET ACCESS TOKEN
// =====================================

export function getAccessToken() {

  try {

    return localStorage.getItem(
      ACCESS_TOKEN_KEY
    );

  } catch {

    return null;
  }
}

// =====================================
// 🔥 GET REFRESH TOKEN
// =====================================

export function getRefreshToken() {

  try {

    return localStorage.getItem(
      REFRESH_TOKEN_KEY
    );

  } catch {

    return null;
  }
}

// =====================================
// 🔥 REMOVE TOKENS
// =====================================

export function removeTokens() {

  try {

    localStorage.removeItem(
      ACCESS_TOKEN_KEY
    );

    localStorage.removeItem(
      REFRESH_TOKEN_KEY
    );

  } catch (error) {

    console.error(
      '❌ STORAGE REMOVE ERROR:',
      error
    );
  }
}

// =====================================
// 🔥 AUTH CHECK
// =====================================

export function isAuthenticated() {

  return !!getAccessToken();
}