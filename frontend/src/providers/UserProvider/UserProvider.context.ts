import { createContext } from 'react';

import type { UserContext } from './UserProvider.types';

/** Context: provides currentUser object and setter for it throughout app. */

export const UserProviderContext = createContext<UserContext>(
  {} as UserContext,
);

UserProviderContext.displayName = 'UserProviderContext';


