type Props = {
  title: string;
  value: string | number;
  color?: 'cyan' | 'emerald' | 'orange' | 'red' | 'violet' | 'blue';
  icon?: string;
};

const colorVariants = {

  cyan: {
    border: 'border-cyan-500/20',
    glow: 'bg-cyan-500/10',
    badge: 'text-cyan-400'
  },

  emerald: {
    border: 'border-emerald-500/20',
    glow: 'bg-emerald-500/10',
    badge: 'text-emerald-400'
  },

  orange: {
    border: 'border-orange-500/20',
    glow: 'bg-orange-500/10',
    badge: 'text-orange-400'
  },

  red: {
    border: 'border-red-500/20',
    glow: 'bg-red-500/10',
    badge: 'text-red-400'
  },

  violet: {
    border: 'border-violet-500/20',
    glow: 'bg-violet-500/10',
    badge: 'text-violet-400'
  },

  blue: {
    border: 'border-blue-500/20',
    glow: 'bg-blue-500/10',
    badge: 'text-blue-400'
  }

};

export default function LiveMetricCard({
  title,
  value,
  color = 'cyan',
  icon = '📊'
}: Props) {

  const styles =
    colorVariants[color];

  return (

    <div className={`
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      ${styles.border}
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
      shadow-2xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:bg-white/[0.06]
    `}>

      {/* GLOW */}

      <div className={`
        absolute
        top-0
        right-0
        w-40
        h-40
        ${styles.glow}
        blur-3xl
        opacity-70
        transition-all
        duration-500
        group-hover:scale-125
      `} />

      {/* BORDER EFFECT */}

      <div className="
        absolute
        inset-0
        rounded-3xl
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-500
        bg-gradient-to-br
        from-white/[0.04]
        to-transparent
      " />

      <div className="relative z-10">

        {/* ICON */}

        <div className="
          flex
          items-center
          justify-between
          mb-5
        ">

          <div className="
            text-4xl
            transition-transform
            duration-300
            group-hover:scale-110
          ">
            {icon}
          </div>

          <div className={`
            text-xs
            font-black
            uppercase
            tracking-widest
            ${styles.badge}
          `}>
            LIVE
          </div>

        </div>

        {/* TITLE */}

        <p className="
          text-slate-400
          text-xs
          uppercase
          tracking-[0.25em]
          font-bold
          mb-3
        ">
          {title}
        </p>

        {/* VALUE */}

        <h2 className="
          text-4xl
          xl:text-5xl
          font-black
          tracking-tight
          text-white
          break-words
        ">
          {value}
        </h2>

      </div>

    </div>
  );
}