import { ScoreBreakdown } from './score.interface';

interface ResultTeam {
  fp?: number;
  lp?: number;
  name?: number;
  prediction?: number;
  winner?: number;
}

export interface ResultInterface {
  leader?: ScoreBreakdown;
  support1?: ScoreBreakdown;
  support2?: ScoreBreakdown;
  support3?: ScoreBreakdown;
  player1?: ScoreBreakdown;
  player2?: ScoreBreakdown;
  player3?: ScoreBreakdown;
  player4?: ScoreBreakdown;
  player5?: ScoreBreakdown;
  skill1?: ScoreBreakdown;
  skill2?: ScoreBreakdown;
  skill3?: ScoreBreakdown;
  skill4?: ScoreBreakdown;
  skill5?: ScoreBreakdown;
  teamLose?: ResultTeam;
  teamWin?: ResultTeam;
  // shortcut for skin
  baseLeader?: ScoreBreakdown;
  baseSupport1?: ScoreBreakdown;
  baseSupport2?: ScoreBreakdown;
  baseSupport3?: ScoreBreakdown;
  basePlayer1?: ScoreBreakdown;
  basePlayer2?: ScoreBreakdown;
  basePlayer3?: ScoreBreakdown;
  basePlayer4?: ScoreBreakdown;
  basePlayer5?: ScoreBreakdown;
  baseSkill1?: ScoreBreakdown;
  baseSkill2?: ScoreBreakdown;
  baseSkill3?: ScoreBreakdown;
  baseSkill4?: ScoreBreakdown;
  baseSkill5?: ScoreBreakdown;
  [key: string]: ScoreBreakdown | number | undefined | ResultTeam;
}
