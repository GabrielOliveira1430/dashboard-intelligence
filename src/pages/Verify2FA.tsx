import { useState } from 'react';

import {
  verify2FA
} from '../auth/auth.service';

import {
  saveTokens
} from '../auth/auth.storage';

import {
  useNavigate
} from 'react-router-dom';

type Props = {
  email: string;
};

export default function Verify2FA({
  email
}: Props) {

  const navigate =
    useNavigate();

  const [code, setCode] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  async function handleVerify(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError('');

      const response =
        await verify2FA({
          email,
          code
        });

      const accessToken =
        response?.data?.accessToken ||
        response?.accessToken;

      const refreshToken =
        response?.data?.refreshToken ||
        response?.refreshToken;

      if (
        !accessToken ||
        !refreshToken
      ) {

        throw new Error(
          'Tokens inválidos'
        );
      }

      saveTokens(
        accessToken,
        refreshToken
      );

      navigate('/');

    } catch (error: any) {

      console.error(error);

      setError(
        error?.message ||
        'Código inválido'
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#020817]
      flex
      items-center
      justify-center
      px-6
    ">

      {/* BACKGROUND */}
      <div className="
        absolute
        top-[-250px]
        left-[-180px]
        w-[500px]
        h-[500px]
        bg-cyan-500/20
        rounded-full
        blur-3xl
        animate-pulse
      " />

      <div className="
        absolute
        bottom-[-250px]
        right-[-180px]
        w-[500px]
        h-[500px]
        bg-blue-500/20
        rounded-full
        blur-3xl
        animate-pulse
      " />

      {/* CARD */}
      <form
        onSubmit={handleVerify}
        className="
          relative
          z-10
          w-full
          max-w-md
          p-10
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
          shadow-[0_0_80px_rgba(6,182,212,0.08)]
        "
      >

        <div className="
          w-24
          h-24
          rounded-[28px]
          bg-gradient-to-br
          from-cyan-400
          to-blue-500
          flex
          items-center
          justify-center
          text-5xl
          mb-8
          shadow-2xl
          shadow-cyan-500/30
        ">

          🔐

        </div>

        <h1 className="
          text-5xl
          font-black
          text-white
          mb-4
          tracking-tight
        ">
          Verificação 2FA
        </h1>

        <p className="
          text-slate-400
          mb-8
          leading-7
        ">
          Digite o código de autenticação
          para acessar sua conta com segurança.
        </p>

        {/* ERROR */}
        {error && (

          <div className="
            mb-6
            p-4
            rounded-2xl
            bg-red-500/10
            border
            border-red-500/20
            text-red-300
            text-sm
          ">

            {error}

          </div>
        )}

        <input
          type="text"
          placeholder="000000"
          maxLength={6}
          className="
            w-full
            p-5
            mb-8
            rounded-2xl
            bg-slate-950/60
            border
            border-slate-800
            text-white
            text-2xl
            font-bold
            tracking-[10px]
            text-center
            outline-none
            transition-all
            duration-300
            focus:border-cyan-400
            focus:ring-4
            focus:ring-cyan-500/10
          "
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
        />

        <button
          disabled={loading}
          className="
            w-full
            p-5
            rounded-2xl
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
            hover:scale-[1.02]
            active:scale-[0.99]
            text-black
            font-black
            text-lg
            transition-all
            duration-300
            shadow-2xl
            shadow-cyan-500/30
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >

          {loading
            ? 'Verificando...'
            : 'Verificar'
          }

        </button>

      </form>

    </div>
  );
}