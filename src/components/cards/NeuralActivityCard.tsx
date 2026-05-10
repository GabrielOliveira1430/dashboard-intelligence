type Props = {

  title: string;

  value: number;

  color?:
    | 'cyan'
    | 'emerald'
    | 'violet'
    | 'orange';
};

export default function NeuralActivityCard({

  title,

  value,

  color = 'cyan'

}: Props) {

  const colors = {

    cyan: {

      text:
        'text-cyan-400',

      bg:
        'from-cyan-500 to-blue-500',

      border:
        'border-cyan-500/20',

      glow:
        'bg-cyan-500/10'
    },

    emerald: {

      text:
        'text-emerald-400',

      bg:
        'from-emerald-500 to-green-500',

      border:
        'border-emerald-500/20',

      glow:
        'bg-emerald-500/10'
    },

    violet: {

      text:
        'text-violet-400',

      bg:
        'from-violet-500 to-purple-500',

      border:
        'border-violet-500/20',

      glow:
        'bg-violet-500/10'
    },

    orange: {

      text:
        'text-orange-400',

      bg:
        'from-orange-500 to-yellow-500',

      border:
        'border-orange-500/20',

      glow:
        'bg-orange-500/10'
    }
  };

  const theme =
    colors[color];

  return (

    <div className="
      relative
      overflow-hidden
      rounded-3xl
      border
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
    ">

      <div className={`
        absolute
        top-0
        right-0
        w-32
        h-32
        blur-3xl
        ${theme.glow}
      `} />

      <div className="relative z-10">

        <div className="
          flex
          items-center
          justify-between
          mb-5
        ">

          <div>

            <p className="
              text-slate-400
              text-sm
              mb-1
            ">
              {title}
            </p>

            <h3 className={`
              text-4xl
              font-black
              ${theme.text}
            `}>
              {value}%
            </h3>

          </div>

          <div className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            text-2xl
            border
            ${theme.border}
          `}>

            🧠

          </div>

        </div>

        {/* BARS */}

        <div className="
          flex
          items-end
          gap-1
          h-16
        ">

          {
            Array.from({
              length: 20
            }).map((_, index) => {

              const random =
                Math.max(
                  10,
                  Math.min(
                    100,
                    value +
                    Math.random() * 30 -
                    15
                  )
                );

              return (

                <div
                  key={index}
                  className={`
                    flex-1
                    rounded-full
                    bg-gradient-to-t
                    ${theme.bg}
                    animate-pulse
                  `}
                  style={{
                    height:
                      `${random}%`,
                    animationDelay:
                      `${index * 0.05}s`
                  }}
                />
              );
            })
          }

        </div>

      </div>

    </div>
  );
}