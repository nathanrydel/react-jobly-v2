import React from "react";
import type { FC, PropsWithChildren } from 'react';

import UserContext from "./auth/UserContext";
import type { DemoUser } from './@types/types';

const demoUser: DemoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  photo_url: null,
};

export type UserProviderProps = PropsWithChildren & {
  currentUser?: DemoUser;
  hasAppliedToJob?: (jobId: number) => boolean;
};

export const UserProvider: FC<UserProviderProps> = (props) => {

  const {
    children,
    currentUser = demoUser,
    hasAppliedToJob = () => false,
  } = props;

  return (
    <UserContext.Provider value={{ currentUser, hasAppliedToJob }}>
      {children}
    </UserContext.Provider>
  )
};
