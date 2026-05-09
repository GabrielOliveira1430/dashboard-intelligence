import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {
  ReactNode,
} from 'react';

import {
  getProfile,
} from './profile.service';

import {
  getAccessToken
} from './auth.storage';

type User = {

  id: number;

  name: string;

  email: string;

  role: string;

  plan: string;
};

type ProfileContextType = {

  user: User | null;

  loading: boolean;

  reloadProfile: () => Promise<void>;
};

const ProfileContext =
  createContext(
    {} as ProfileContextType
  );

export function ProfileProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // 🔥 LOAD PROFILE
  // =====================================

  async function loadProfile() {

    try {

      const token =
        getAccessToken();

      // 🔥 evita request sem token
      if (!token) {

        setUser(null);

        return;
      }

      const profile =
        await getProfile();

      setUser(profile);

    } catch (error) {

      console.error(
        'PROFILE ERROR:',
        error
      );

      setUser(null);

    } finally {

      setLoading(false);
    }
  }

  // =====================================
  // 🔥 RELOAD
  // =====================================

  async function reloadProfile() {

    setLoading(true);

    await loadProfile();
  }

  // =====================================
  // 🔥 INIT
  // =====================================

  useEffect(() => {

    loadProfile();

  }, []);

  // =====================================
  // 🔥 MEMO
  // =====================================

  const value =
    useMemo(() => ({
      user,
      loading,
      reloadProfile,
    }), [
      user,
      loading
    ]);

  // =====================================
  // 🔥 GLOBAL LOADING
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
            relative
            w-20
            h-20
            mx-auto
            mb-6
          ">

            <div className="
              absolute
              inset-0
              rounded-full
              border-4
              border-cyan-500/20
            " />

            <div className="
              absolute
              inset-0
              rounded-full
              border-4
              border-cyan-400
              border-t-transparent
              animate-spin
            " />

          </div>

          <h2 className="
            text-3xl
            font-black
            text-white
            mb-3
          ">
            Loading Profile
          </h2>

          <p className="
            text-slate-400
            text-lg
          ">
            Sincronizando usuário...
          </p>

        </div>

      </div>
    );
  }

  return (

    <ProfileContext.Provider
      value={value}
    >

      {children}

    </ProfileContext.Provider>
  );
}

export function useProfile() {

  return useContext(
    ProfileContext
  );
}