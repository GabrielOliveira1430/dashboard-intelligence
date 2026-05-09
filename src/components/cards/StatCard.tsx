type Props = {
  title: string;
  value: string | number;
};

export default function StatCard({
  title,
  value
}: Props) {

  return (

    <div className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
      shadow-2xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-cyan-500/20
      hover:bg-cyan-500/[0.03]
    ">

      {/* Glow */}
      <div className="
        absolute
        top-0
        right-0
        w-32
        h-32
        bg-cyan-500/10
        blur-3xl
        opacity-0
        transition-all
        duration-500
        group-hover:opacity-100
      " />

      {/* Border Glow */}
      <div className="
        absolute
        inset-0
        rounded-3xl
        opacity-0
        transition-all
        duration-500
        group-hover:opacity-100
        bg-gradient-to-br
        from-cyan-500/5
        to-transparent
      " />

      <div className="relative z-10">

        <div className="
          inline-flex
          items-center
          rounded-xl
          bg-white/[0.05]
          border
          border-white/10
          px-3
          py-2
          mb-5
        ">

          <h2 className="
            text-slate-400
            text-xs
            uppercase
            tracking-[0.25em]
            font-bold
          ">
            {title}
          </h2>

        </div>

        <p className="
          text-4xl
          xl:text-5xl
          font-black
          tracking-tight
          text-white
          break-words
        ">
          {value}
        </p>

      </div>

    </div>
  );
}