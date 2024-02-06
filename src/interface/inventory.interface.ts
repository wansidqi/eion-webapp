import { UserCardInterface } from '.';
import { User } from '../store/slices/user.slice';

export interface InventoryInterface {
  id: string;
  user: Partial<User>;
  cards: UserCardInterface[];
}
