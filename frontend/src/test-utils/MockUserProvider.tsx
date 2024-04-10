import React, { PropsWithChildren } from "react";
import { UserContext, UserProviderContext } from "~/providers";

interface MockUserProviderProps extends PropsWithChildren<{}> {
  currentUser: UserContext['currentUser'];
}

export const MockUserProvider: React.FC<MockUserProviderProps> = ({ children, currentUser }) => {
  const mockContextValue: UserContext = {
    currentUser,
    setCurrentUser: jest.fn(),
    hasAppliedToJob: jest.fn(),
    applyToJob: jest.fn(),
    logout: jest.fn(),
    login: jest.fn(),
    signup: jest.fn(),
    userLoaded: true,
  };

  return (
    <UserProviderContext.Provider value={mockContextValue}>
      {children}
    </UserProviderContext.Provider>
  );
}