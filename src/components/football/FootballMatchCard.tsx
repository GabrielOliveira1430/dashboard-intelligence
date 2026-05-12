import type {

  FootballMatch,

  FootballPrediction

} from '../../types/football.types';

// ==========================================
// 🧠 TYPES
// ==========================================

type Props = {

  match: FootballMatch;

  prediction?:
    FootballPrediction;
};

// ==========================================
// 🎨 STATUS STYLE
// ==========================================

function getStatusStyle(
  status: string
) {

  switch (status) {

    case 'LIVE':

      return `
        bg-green-500/20
        text-green-400
        border-green-500/20
        animate-pulse
      `;

    case 'HT':

      return `
        bg-yellow-500/20
        text-yellow-400
        border-yellow-500/20
      `;

    case 'FT':

      return `
        bg-slate-500/20
        text-slate-300
        border-slate-500/20
      `;

    default:

      return `
        bg-cyan-500/10
        text-cyan-300
        border-cyan-500/10
      `;
  }
}

// ==========================================
// 🎨 CONFIDENCE STYLE
// ==========================================

function getConfidenceColor(
  confidence: number
) {

  if (confidence >= 80) {
    return 'bg-emerald-400';
  }

  if (confidence >= 60) {
    return 'bg-cyan-400';
  }

  if (confidence >= 40) {
    return 'bg-yellow-400';
  }

  return 'bg-red-400';
}

// ==========================================
// ⚽ CARD
// ==========================================

export default function FootballMatchCard({
  match,
  prediction
}: Props) {

  const confidence =
    prediction?.confidence || 0;

  return (

    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-500/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-400/30
      "
    >

      {/* BG GLOW */}

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

      {/* HEADER */}

      <div className="
        relative
        z-10
        flex
        items-start
        justify-between
        gap-4
        mb-5
      ">

        <div className="min-w-0">

          <h3 className="
            text-lg
            md:text-xl
            font-black
            leading-tight
            break-words
          ">

            {match.homeTeam}
            {' '}vs{' '}
            {match.awayTeam}

          </h3>

          <p className="
            text-xs
            md:text-sm
            text-slate-500
            mt-2
          ">
            {match.league}
          </p>

        </div>

        <span
          className={`
            shrink-0
            px-3
            py-1.5
            rounded-xl
            border
            text-xs
            font-black
            tracking-wide
            ${getStatusStyle(
              match.status
            )}
          `}
        >

          {match.status}

        </span>

      </div>

      {/* CONFIDENCE */}

      <div className="
        relative
        z-10
        mb-5
      ">

        <div className="
          flex
          items-center
          justify-between
          mb-2
          text-sm
        ">

          <span className="
            text-slate-400
            font-medium
          ">
            AI Confidence
          </span>

          <span className="
            text-cyan-400
            font-black
          ">
            {confidence}%
          </span>

        </div>

        <div className="
          h-3
          w-full
          overflow-hidden
          rounded-full
          bg-white/10
        ">

          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-1000
              ${getConfidenceColor(
                confidence
              )}
            `}
            style={{
              width:
                `${confidence}%`
            }}
          />

        </div>

      </div>

      {/* INFO */}

      <div className="
        relative
        z-10
        space-y-3
      ">

        <InfoRow
          label="Winner"
          value={
            prediction?.winner ||
            '--'
          }
          color="text-emerald-400"
        />

        <InfoRow
          label="Market"
          value={
            prediction?.market ||
            '--'
          }
          color="text-violet-400"
        />

        <InfoRow
          label="Recommendation"
          value={
            prediction?.recommendation ||
            '--'
          }
          color="text-orange-400"
        />

      </div>

    </div>
  );
}

// ==========================================
// 🧩 INFO ROW
// ==========================================

type InfoRowProps = {

  label: string;

  value: string;

  color: string;
};

function InfoRow({
  label,
  value,
  color
}: InfoRowProps) {

  return (

    <div className="
      flex
      items-center
      justify-between
      gap-3
      text-sm
    ">

      <span className="
        text-slate-400
      ">
        {label}
      </span>

      <span
        className={`
          font-bold
          text-right
          break-words
          ${color}
        `}
      >
        {value}
      </span>

    </div>
  );
}