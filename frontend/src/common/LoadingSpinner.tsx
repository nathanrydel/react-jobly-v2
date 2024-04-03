import React, { FC } from "react";
import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

const LoadingSpinner : FC = () => {
  return (
    <div className="LoadingSpinner">
      Loading ...
    </div>
  );
}

export default LoadingSpinner;