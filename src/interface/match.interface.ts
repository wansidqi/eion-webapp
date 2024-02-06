import { TeamInterface, GameInterface } from ".";
import { MatchStatus } from "../types";

export interface MatchInterface {
  id: string;
  team1: TeamInterface;
  team2: TeamInterface;
  country: string;
  status: MatchStatus;
  games: GameInterface[];
  dateTime: Date;
}
