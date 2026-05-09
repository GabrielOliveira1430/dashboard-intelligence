type Props = {
  title: string;
  value: string | number;
  color?: string;
  icon?: string;
};

export default function LiveMetricCard({
  title,
  value,
  color = 'cyan',
  icon = '📊'
}: Props) {

  return (

    <div className={`
      relative
      overflow-hidden
      rounded-3xl
      border
      border-${color}-500/20
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
      shadow-2xl
    `}>

      <div className={`
        absolute
        top-0
        right-0
        w-40
        h-40
        bg-${color}-500/10
        blur-3xl
      `} />

      <div className="relative z-10">

        <div className="text-4xl mb-4">
          {icon}
        </div>

        <p className="
          text-slate-400
          text-sm
          uppercase
          tracking-widest
          mb-2
        ">
          {title}
        </p>

        <h2 className="
          text-4xl
          font-black
          text-white
        ">
          {value}
        </h2>

      </div>

    </div>
  );
}