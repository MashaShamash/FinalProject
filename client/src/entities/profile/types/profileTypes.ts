import { UserId } from "../../auth/types/userTypes";


export type Profile = {
  id: number;
  name: string,
  lastName: string,
  pseudonym: string;
  biography: string;
  conDan: string,
  userId: UserId;
};

export type ProfileId = Profile['id']

export type ProfileWhizautId = Omit<Profile, 'id'>

export type ProfileWhizautIdAndWhizautUserId = Omit<ProfileWhizautId, 'userId'>