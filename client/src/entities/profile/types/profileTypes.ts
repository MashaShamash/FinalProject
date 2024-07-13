import type { UserId } from '../../user/types/userTypes';

export type Profile = {
  id: number;
  pseudonym: string;
  biography: string;
  userId: UserId;
};
export type ProfileWithoutId = Omit<Profile, 'id'>;
