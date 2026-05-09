import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import type {
  ReactNode
} from 'react';

import { login } from './auth.service';

import {
  saveTokens,
  removeTokens,
  isAuthenticated
} from './auth.storage';

type AuthContextType = {

  authenticated: boolean;

  loading: boolean;

  signIn: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children
}: AuthProviderProps) {

  const [authenticated, setAuthenticated] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // 🔥 INIT SESSION
  // =====================================

  useEffect(() => {

    const auth =
      isAuthenticated();

    setAuthenticated(auth);

    setLoading(false);

  }, []);

  // =====================================
  // 🔥 LOGIN
  // =====================================

  async function signIn(
    email: string,
    password: string
  ) {

    const response =
      await login({
        email,
        password
      });

    saveTokens(
      response.accessToken,
      response.refreshToken
    );

    setAuthenticated(true);
  }

  // =====================================
  // 🔥 LOGOUT
  // =====================================

  function logout() {

    removeTokens();

    setAuthenticated(false);
  }

  // =====================================
  // 🔥 MEMO
  // =====================================

  const value =
    useMemo(() => ({
      authenticated,
      loading,
      signIn,
      logout
    }), [
      authenticated,
      loading
    ]);

  // =====================================
  // 🔥 LOADING SCREEN
  // =====================================

  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#020817]
      ">

        <div className="text-center">

          <div className="
            w-16
            h-16
            border-4
            border-cyan-500
            border-t-transparent
            rounded-full
            animate-spin
            mx-auto
            mb-6
          " />

          <h2 className="
            text-2xl
            font-black
            text-white
            mb-2
          ">
            Intelligence
          </h2>

          <p className="text-slate-400">
            Carregando sessão...
          </p>

        </div>

      </div>
    );
  }

  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuth() {

  return useContext(
    AuthContext
  );
}