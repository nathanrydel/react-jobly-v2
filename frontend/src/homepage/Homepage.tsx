import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";

import "./Homepage.css";
import UserContext from "../auth/UserContext";
import { COPY } from "./Homepage.constants";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

export const Homepage: FC = () => {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  const welcomeMessage = `Welcome Back, ${currentUser?.firstName || currentUser?.username}!`

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 fw-bold">{COPY.title}</h1>
        <p className="lead">{COPY.lead}</p>
        {currentUser
          ? <h2>{welcomeMessage}</h2>
          : (
            <p>
              <Link
                className="btn btn-primary fw-bold me-3"
                to="/login"
              >
                {COPY.login}
              </Link>
              <Link
                className="btn btn-primary fw-bold"
                to="/signup"
              >
                {COPY.signup}
              </Link>
            </p>
          )}
      </div>
    </div>
  );
}
