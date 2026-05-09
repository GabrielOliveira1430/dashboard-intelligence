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
      icon: '📊'
    },

    {
      path: '/analytics',
      label: 'Analytics',
      icon: '📈'
    },

    {
      path: '/strategies',
      label: 'Strategies',
      icon: '🧠'
    },

    {
      path: '/simulator',
      label: 'Simulator',
      icon: '🎯'
    }
  ];

  return (

    <div className="
      min-h-screen
      flex
      bg-[#020817]
      text-white
      overflow-hidden
    ">

      {/* SIDEBAR */}
      <aside className="
        relative
        hidden
        lg:flex
        w-[300px]
        flex-col
        border-r
        border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        p-6
      ">

        {/* GLOW */}
        <div className="
          absolute
          top-0
          left-0
          w-full
          h-40
          bg-cyan-500/10
          blur-3xl
          pointer-events-none
        " />

        {/* LOGO */}
        <div className="relative z-10 mb-10">

          <div className="
            w-16
            h-16
            rounded-3xl
            bg-gradient-to-br
            from-cyan-400
            to-blue-500
            flex
            items-center
            justify-center
            text-3xl
            mb-6
            shadow-xl
            shadow-cyan-500/30
          ">
            🧠
          </div>

          <h1 className="
            text-4xl
            font-black
            tracking-tight
          ">
            Intelligence
          </h1>

          <p className="
            text-slate-400
            mt-2
          ">
            AI Dashboard Platform
          </p>

        </div>

        {/* USER */}
        <div className="
          relative
          z-10
          mb-8
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          p-5
        ">

          <div className="
            flex
            items-center
            gap-4
            mb-4
          ">

            <div className="
              w-14
              h-14
              rounded-2xl
              bg-gradient-to-br
              from-cyan-400
              to-blue-500
              flex
              items-center
              justify-center
              text-black
              font-black
              text-xl
            ">

              {user?.name?.charAt(0) || 'U'}

            </div>

            <div className="min-w-0">

              <p className="
                font-bold
                text-lg
                truncate
              ">
                {user?.name || 'Usuário'}
              </p>

              <p className="
                text-sm
                text-slate-400
                truncate
              ">
                {user?.email || 'email@email.com'}
              </p>

            </div>

          </div>

          <div className="flex gap-2">

            <span className="
              px-3
              py-1
              rounded-xl
              text-xs
              font-bold
              bg-cyan-500/10
              text-cyan-400
              border
              border-cyan-500/20
            ">
              {user?.role || 'USER'}
            </span>

            <span className="
              px-3
              py-1
              rounded-xl
              text-xs
              font-bold
              bg-green-500/10
              text-green-400
              border
              border-green-500/20
            ">
              {user?.plan || 'FREE'}
            </span>

          </div>

        </div>

        {/* MENU */}
        <nav className="
          relative
          z-10
          flex
          flex-col
          gap-3
        ">

          {menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`
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
                      hover:bg-white/[0.05]
                      hover:border-cyan-500/20
                    `
                }
              `}
            >

              <span className="text-2xl">
                {item.icon}
              </span>

              <span className="
                font-semibold
                text-[15px]
              ">
                {item.label}
              </span>

            </Link>
          ))}

        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            relative
            z-10
            mt-auto
            p-4
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            text-red-400
            font-bold
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
        flex-1
        overflow-auto
        p-4
        md:p-8
      ">

        <div className="fade-in">

          {children}

        </div>

      </main>

    </div>
  );
}