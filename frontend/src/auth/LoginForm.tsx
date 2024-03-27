import React, { useState, SetStateAction } from "react";
import Alert from "../common/Alert";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

type tLoginFormProps = {
  username: string;
  password: string;
}

type tLoginFunction = (data: tLoginFormProps) => Promise<string>;

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }: {login: tLoginFunction}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "formErrors", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if not successful, sets errors.
   */
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/companies")
    } catch (err) {
      setFormErrors(err as SetStateAction<never[]>);
    }
  }

  /** Update form data field */
  function handleChange(evt: React.FormEvent<HTMLInputElement>) {
    const target = evt.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null}

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
