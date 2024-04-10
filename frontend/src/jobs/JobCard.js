import React, { useContext, useEffect, useState } from 'react';
import "./JobCard.css";
import { UserProviderContext } from "~/providers";

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug("JobCard");

  const { hasAppliedToJob, applyToJob } = useContext(UserProviderContext);
  const [applied, setApplied] = useState();

  useEffect(
    function updateAppliedStatus() {
      setApplied(hasAppliedToJob(id));
    },
    [id, hasAppliedToJob]
  );

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard card">
      {" "}
      {applied}
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && (
          <div>
            <small>
              Salary: {"$" + Intl.NumberFormat("en-US").format(salary)}
            </small>
          </div>
        )}
        {equity !== undefined && (
          <div>
            <small>Equity: {equity}</small>
          </div>
        )}
        <button
          className="btn btn-danger fw-bold text-uppercase float-end"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}


export default JobCard;
