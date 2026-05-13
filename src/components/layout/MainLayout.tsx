// src/components/layout/MainLayout.tsx

import type {
  ReactNode
} from 'react';

import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  removeTokens
} from '../../auth/auth.storage';

import {
  useProfile
} from '../../auth/ProfileContext';

import {
  useFootballAlertsStore
} from '../../store/footballAlerts.store';

import {
  useWSConnectionStore
} from '../../store/ws.connection.store';

type Props = {
  children: ReactNode;
};

export default function MainLayout({
  children
}: Props) {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const { user } =
    useProfile();

  const alerts =
    useFootballAlertsStore(
      (state) => state.alerts
    );

  const wsConnected =
    useWSConnectionStore(
      (state) => state.connected
    );

  function isActive(path: string) {

    return (
      location.pathname === path
    );
  }

  function handleLogout() {

    removeTokens();

    navigate('/login');
  }

  const menuItems = [

    {
      path: '/',
      label: 'Dashboard',
      icon: '🧠'
    },

    {
      path: '/analytics',
      label: 'Analytics',
      icon: '📊'
    },

    {
      path: '/strategies',
      label: 'Strategies',
      icon: '⚡'
    },

    {
      path: '/simulator',
      label: 'Simulator',
      icon: '🎯'
    },

    {
      path: '/football',
      label: 'Football AI',
      icon: '⚽'
    },

    {
      path: '/command-center',
      label: 'AI Command',
      icon: '🧠'
    }
  ];

  return (

    <div className="
      relative
      min-h-screen
      flex
      bg-[#020617]
      text-white
      overflow-hidden
    ">

      {/* GLOBAL BACKGROUND */}

      <div className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
      ">

        <div className="
          absolute
          top-[-200px]
          left-[-100px]
          w-[500px]
          h-[500px]
          bg-cyan-500/10
          blur-3xl
          rounded-full
        " />

        <div className="
          absolute
          bottom-[-200px]
          right-[-100px]
          w-[500px]
          h-[500px]
          bg-blue-500/10
          blur-3xl
          rounded-full
        " />

      </div>

      {/* SIDEBAR */}

      <aside className="
        relative
        hidden
        lg:flex
        w-[310px]
        flex-col
        border-r
        border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        p-6
        z-20
      ">

        {/* LOGO */}

        <div className="mb-10">

          <div className="
            relative
            w-20
            h-20
            rounded-[28px]
            bg-gradient-to-br
            from-cyan-400
            via-blue-500
            to-violet-600
            flex
            items-center
            justify-center
            text-4xl
            mb-6
            shadow-2xl
            shadow-cyan-500/30
          ">

            🧠

            <div className="
              absolute
              inset-0
              rounded-[28px]
              animate-pulse
              bg-cyan-400/20
            " />

          </div>

          <h1 className="
            text-4xl
            font-black
            tracking-tight
            leading-none
          ">
            Intelligence
          </h1>

          <p className="
            text-slate-400
            mt-3
            leading-relaxed
          ">
            Evolution AI Platform
          </p>

        </div>

        {/* USER CARD */}

        <div className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-5
          mb-8
        ">

          <div className="
            absolute
            top-0
            right-0
            w-32
            h-32
            bg-cyan-500/10
            blur-3xl
          " />

          <div className="
            relative
            z-10
            flex
            items-center
            gap-4
            mb-5
          ">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-br
              from-cyan-400
              to-blue-500
              flex
              items-center
              justify-center
              text-black
              text-2xl
              font-black
              shadow-xl
              shadow-cyan-500/20
            ">

              {user?.name?.charAt(0) || 'U'}

            </div>

            <div className="min-w-0">

              <h2 className="
                font-black
                text-lg
                truncate
              ">
                {user?.name || 'Usuário'}
              </h2>

              <p className="
                text-sm
                text-slate-400
                truncate
              ">
                {user?.email || 'email@email.com'}
              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            <span className="
              px-3
              py-1.5
              rounded-xl
              text-xs
              font-black
              bg-cyan-500/10
              border
              border-cyan-500/20
              text-cyan-400
            ">
              {user?.role || 'USER'}
            </span>

            <span className="
              px-3
              py-1.5
              rounded-xl
              text-xs
              font-black
              bg-green-500/10
              border
              border-green-500/20
              text-green-400
            ">
              {user?.plan || 'FREE'}
            </span>

          </div>

        </div>

        {/* MENU */}

        <nav className="
          flex
          flex-col
          gap-3
        ">

          {
            menuItems.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                className={`
                  group
                  relative
                  overflow-hidden
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  hover:translate-x-1
                  ${
                    isActive(item.path)

                      ? `
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-500
                        text-black
                        border-cyan-300
                        shadow-xl
                        shadow-cyan-500/20
                      `

                      : `
                        bg-white/[0.03]
                        border-white/5
                        hover:bg-white/[0.06]
                        hover:border-cyan-500/20
                      `
                  }
                `}
              >

                <span className="
                  text-2xl
                  transition-transform
                  duration-300
                  group-hover:scale-110
                ">
                  {item.icon}
                </span>

                <span className="
                  font-bold
                  tracking-wide
                ">
                  {item.label}
                </span>

              </Link>
            ))
          }

        </nav>

        {/* AI STATUS */}

        <div className="
          mt-8
          rounded-3xl
          border
          border-emerald-500/20
          bg-emerald-500/10
          p-5
        ">

          <div className="
            flex
            items-center
            gap-3
            mb-3
          ">

            <div className="
              w-3
              h-3
              rounded-full
              bg-emerald-400
              animate-pulse
            " />

            <p className="
              text-sm
              font-black
              text-emerald-400
              uppercase
              tracking-wider
            ">
              AI ONLINE
            </p>

          </div>

          <p className="
            text-sm
            text-slate-300
            leading-relaxed
          ">
            Sistema evolutivo ativo e monitorando estratégias em tempo real.
          </p>

        </div>

        {/* FOOTBALL STATUS */}

        <div className="
          mt-5
          rounded-3xl
          border
          border-cyan-500/20
          bg-cyan-500/10
          p-5
        ">

          <div className="
            flex
            items-center
            gap-3
            mb-3
          ">

            <div className="
              w-3
              h-3
              rounded-full
              bg-cyan-400
              animate-pulse
            " />

            <p className="
              text-sm
              font-black
              text-cyan-400
              uppercase
              tracking-wider
            ">
              FOOTBALL AI
            </p>

          </div>

          <p className="
            text-sm
            text-slate-300
            leading-relaxed
          ">
            Predições esportivas em tempo real com análise inteligente.
          </p>

        </div>

        {/* LIVE ALERT STATUS */}

        <div className="
          mt-5
          rounded-3xl
          border
          border-red-500/20
          bg-red-500/10
          p-5
        ">

          <div className="
            flex
            items-center
            justify-between
            mb-3
          ">

            <div className="
              flex
              items-center
              gap-3
            ">

              <div className={`
                w-3
                h-3
                rounded-full
                ${
                  wsConnected
                    ? 'bg-green-400 animate-pulse'
                    : 'bg-red-400'
                }
              `} />

              <p className="
                text-sm
                font-black
                uppercase
                tracking-wider
              ">
                LIVE ALERTS
              </p>

            </div>

            <span className="
              text-red-400
              font-black
              text-xl
            ">
              {alerts.length}
            </span>

          </div>

          <p className="
            text-sm
            text-slate-300
            leading-relaxed
          ">
            Sistema realtime monitorando oportunidades ao vivo.
          </p>

        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="
            mt-auto
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            px-5
            py-4
            text-red-400
            font-black
            transition-all
            duration-300
            hover:bg-red-500
            hover:text-white
          "
        >
          Logout
        </button>

      </aside>

      {/* CONTENT */}

      <main className="
        relative
        z-10
        flex-1
        overflow-auto
        p-4
        md:p-8
      ">

        <div className="
          animate-in
          fade-in
          duration-500
        ">

          {children}

        </div>

      </main>

    </div>
  );
}