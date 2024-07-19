import { UserId } from "../../auth/types/userTypes";


export type Profile = {
  id: number;
  img: string;
  name: string,
  lastName: string,
  pseudonym: string;
  biography: string;
  activity: string;
  conDan: string,
  userId: UserId;
};

export type ProfileId = Profile['id']

export type ProfileWhizautId = Omit<Profile, 'id'>

export type ProfileWhizautIdAndWhizautUserId = Omit<ProfileWhizautId, 'userId'>

export type ProfileWhizautIdAndWhizautUserIdAndName = Omit<ProfileWhizautIdAndWhizautUserId, 'name'>

export type ProfileWhizautIdAndWhizautUserIdAndNameLastName = Omit<ProfileWhizautIdAndWhizautUserIdAndName, 'lastName'>