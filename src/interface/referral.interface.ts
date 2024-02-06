export interface ReferralInterface {
  points: number;
  referee: Referee[];
}

interface Referee {
  id: number | string;
  referrerId: string;
  refereeId: string;
  points: number;
}
