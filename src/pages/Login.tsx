import { useState } from 'react';

import {
  login
} from '../auth/auth.service';

import Verify2FA from './Verify2FA';

export default function Login() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [show2FA, setShow2FA] =
    useState(false);

  const [error, setError] =
    useState('');

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError('');

      await login({
        email,
        password
      });

      setShow2FA(true);

    } catch (err: any) {

      setError(
        err?.message ||
        'Login inválido'
      );

    } finally {

      setLoading(false);
    }
  }

  if (show2FA) {

    return (
      <Verify2FA email={email} />
    );
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

      {/* GRID */}
      <div className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)]
        bg-[size:40px_40px]
      " />

      {/* CARD */}
      <form
        onSubmit={handleLogin}
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

        {/* TOP */}
        <div className="mb-10">

          <div className="
            w-20
            h-20
            rounded-3xl
            bg-gradient-to-br
            from-cyan-400
            to-blue-500
            flex
            items-center
            justify-center
            text-4xl
            mb-7
            shadow-2xl
            shadow-cyan-500/30
          ">
            🧠
          </div>

          <h1 className="
            text-5xl
            font-black
            tracking-tight
            text-white
            mb-3
          ">
            Intelligence
          </h1>

          <p className="
            text-slate-400
            leading-7
          ">
            Plataforma avançada de análise,
            estratégias e inteligência artificial.
          </p>

        </div>

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

        {/* EMAIL */}
        <div className="mb-5">

          <label className="
            block
            text-sm
            text-slate-300
            mb-3
            font-medium
          ">
            Email
          </label>

          <input
            type="email"
            placeholder="Digite seu email"
            className="
              w-full
              p-4
              rounded-2xl
              bg-slate-950/60
              border
              border-slate-800
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              duration-300
              focus:border-cyan-400
              focus:ring-4
              focus:ring-cyan-500/10
              focus:bg-slate-950
            "
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-8">

          <label className="
            block
            text-sm
            text-slate-300
            mb-3
            font-medium
          ">
            Senha
          </label>

          <input
            type="password"
            placeholder="Digite sua senha"
            className="
              w-full
              p-4
              rounded-2xl
              bg-slate-950/60
              border
              border-slate-800
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              duration-300
              focus:border-cyan-400
              focus:ring-4
              focus:ring-cyan-500/10
              focus:bg-slate-950
            "
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="
            w-full
            p-4
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
            ? 'Entrando...'
            : 'Entrar'
          }

        </button>

      </form>

    </div>
  );
}