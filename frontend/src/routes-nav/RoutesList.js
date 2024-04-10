import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import { AppRoutes } from '~/constants';
import { Homepage } from '~/pages/homepage';

import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import { UserProviderContext } from '~/providers';

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in.
 *
 * Visiting a non-existent route navigates to the homepage.
 */
function RoutesList() {

  const { currentUser } = useContext(UserProviderContext);

  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  );

  return (
    <div className="pt-5">
      <Routes>
        {!currentUser &&
          <>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </>
        }

        <Route path={AppRoutes.Homepage} element={<Homepage />} />

        {currentUser &&
          <>
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/profile" element={<ProfileForm />} />
          </>
        }

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default RoutesList;
