export type TacticalZone = {

  zone: string;

  homePressure: number;

  awayPressure: number;

  danger: number;
};

export type TacticalFlow = {

  minute: number;

  homeMomentum: number;

  awayMomentum: number;
};

export type TacticalSnapshot = {

  match: string;

  homeTeam: string;

  awayTeam: string;

  homeDanger: number;

  awayDanger: number;

  possessionHome: number;

  possessionAway: number;

  intensity: number;

  zones: TacticalZone[];

  momentumFlow: TacticalFlow[];
};