import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import type { SignUpUser, User } from "~/@types/types";

export type UserProviderProps = PropsWithChildren & {
  currentUser?: User | null;
};

export type UserContext = {
  applyToJob: (jobId: number) => void;
  currentUser?: User | null;
  hasAppliedToJob: (jobId: number) => boolean;
  login: (formData: LogInData) => void;
  logout: () => void;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  signup: (signupData: SignUpUser) => void;
  userLoaded: boolean;
}

export type LogInData = {
  username: string,
  password: string,
}

export type JwtPayload = {
  username: string;
}
