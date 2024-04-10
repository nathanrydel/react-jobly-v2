import React, { useCallback, useEffect, useMemo, useState } from "react";
import { jwtDecode as decode } from 'jwt-decode';
import type { FC } from 'react';

import JoblyApi from "~/api/api";
import useLocalStorage from "~/hooks/useLocalStorage";
import { SignUpUser, User } from "~/@types/types";
import { TOKEN_STORAGE_ID } from '~/constants';
import type { LogInData, UserContext } from "~/providers";

import { UserProviderContext } from './UserProvider.context';
import type { UserProviderProps, JwtPayload } from './UserProvider.types';

/** User Provider.
 * Context provider that wraps the entire app and provides user state and actions.
 * - currentUser: user obj from API.
 * - token: for logged in users, this is their authentication JWT. Is required to be set for most API calls.
 * This is initially read from localStorage and synced to there via the useLocalStorage hook.
 *   - applicationIds: for logged in users, this is a set of application Ids  for applied jobs.
 */

export const UserProvider: FC<UserProviderProps> = (props) => {

  const {
    children,
    currentUser: currentUserFromProps = null,
  } = props;

  /** TODO: move state to Redux Toolkit */
  const [currentUser, setCurrentUser] = useState<User | null>(currentUserFromProps);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [applicationIds, setApplicationIds] = useState<any>(new Set([]));
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(() => {
      console.debug("App useEffect loadUserInfo", "token=", token);

      const getCurrentUser = async () => {
        if (token) {
          try {
            let { username } = decode<JwtPayload>(token) as JwtPayload
            // put the token on the Api class so it can use it to call the API.
            JoblyApi.token = token;
            let userFromApi = await JoblyApi.getCurrentUser(username);

            setCurrentUser(userFromApi);
            setUserLoaded(true);
            setApplicationIds(new Set(currentUser?.applications));
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
            setUserLoaded(true);
          }
        } else {
          setCurrentUser(null);
          setUserLoaded(true);
        }
      };

      getCurrentUser();
    },
    [token]
  );

  /** Handles site-wide logout. */
  const logout = () => {
    setApplicationIds(new Set([]));
    setCurrentUser(null);
    setUserLoaded(true);
    setToken(null);
  };

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function to see if any error happens.
   */
  const signup: (signupData: SignUpUser) => Promise<void> = async (signupData) =>{
    const generatedToken = await JoblyApi.signup(signupData);
    setToken(generatedToken);
  }

  /** Handles site-wide login.
   *
   * Logs in a user
   *
   * Make sure you await this function to see if any error happens.
   */
  const login = async (loginData: LogInData) => {
    if (!token) {
      let generatedToken = await JoblyApi.login(loginData);
      setToken(generatedToken);
    } else {
      setCurrentUser(decode(token))
      setUserLoaded(true);
    }
  };

  /** Checks if a job has been applied for. */
  const hasAppliedToJob = useCallback(
    (id: number) => applicationIds.has(id),
    [applicationIds]
  );

  /** Apply to a job: make API call and update set of application IDs. */
  const applyToJob = useCallback(async ( id: number ) => {
    if (hasAppliedToJob(id)) return;
    if (currentUser)
      try {
        await JoblyApi.applyToJob(currentUser.username, id);
        setApplicationIds(new Set([...applicationIds, id]));
        console.log("currentUser applyToJob", currentUser);
      } catch (err) {
        console.log("currentUser applyToJob", currentUser);
      }
  }, [applicationIds, currentUser, hasAppliedToJob]);

  const contextValue = useMemo(() => {

    const context: UserContext = {
      ...props,
      applyToJob,
      currentUser,
      hasAppliedToJob,
      login,
      logout,
      setCurrentUser,
      signup,
      userLoaded,
    }

    console.debug('User Provider', '[context]', context);
    return context;

  }, [
    applyToJob,
    currentUser,
    hasAppliedToJob,
    login,
    logout,
    props,
    setCurrentUser,
    signup,
    userLoaded,
  ]);

  return (
    <UserProviderContext.Provider value={contextValue}>
      {children}
    </UserProviderContext.Provider>
  )
};
