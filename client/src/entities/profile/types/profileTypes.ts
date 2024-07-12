import type { UserId } from '../../users/types/userTypes';

export type Profile = {
  id: number;
  pseudonym: string;
  biography: string;
  userId: UserId;
};
