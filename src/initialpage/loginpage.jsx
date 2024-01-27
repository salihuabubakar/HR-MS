import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { alphaNumericPattern, emailrgx } from "../constant";
import { useHistory } from "react-router-dom";
import HeaderLogo from "../assets/img/Header-logo.png"

/**
 * Yup Validation Schema for Login Form
 *
 * Defines a Yup schema for validating the fields of a login form.
 *
 * @constant {Object} schema - Yup schema object.
 * @property {yup.string} username - Validation rules for the username field.
 * @property {yup.string} password - Validation rules for the password field.
 */
const schema = yup.object({
  /**
   * Username validation:
   * - Must be a string.
   * - Is required.
   * - Trimming leading and trailing whitespaces.
   */
  username: yup
    .string()
    // .matches(emailrgx, "Email is required")
    .required("Username is required")
    .trim(),

  /**
   * Password validation:
   * - Must be a string.
   * - Is required.
   * - Trimming leading and trailing whitespaces.
   */
  password: yup
    .string()
    .required("Password is required")
    .trim(),
});

const Loginpage = () => {
  const history = useHistory();
  const [eye, seteye] = useState(true);

  /**
 * Form Configuration using React Hook Form
 *
 * Configures a form using React Hook Form with a Yup resolver for validation.
 *
 * @constant {Object} formConfig - Configuration object containing form-related properties.
 * @property {function} handleSubmit - Function to handle form submission.
 * @property {function} control - Function to control the form fields.
 * @property {function} setError - Function to set custom error messages for form fields.
 * @property {function} clearErrors - Function to clear custom error messages for form fields.
 * @property {Object} formState - Object containing the current state of the form.
 * @property {Object} formState.errors - Object containing validation errors for form fields.
 */
const {
  handleSubmit,
  control,
  setError,
  clearErrors,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema), // Use Yup resolver for form validation
});

// Note: The following properties are available for use in your form component:
// - handleSubmit: Function to handle form submission.
// - control: Function to control the form fields.
// - setError: Function to set custom error messages for form fields.
// - clearErrors: Function to clear custom error messages for form fields.
// - errors: Object containing validation errors for form fields.


  /**
 * Form Submission Handler
 *
 * Handles the submission of a login form by checking the provided username and password.
 * If the credentials are valid, it sets user information in local storage and navigates
 * to the dashboard. Otherwise, it sets a custom error message using the setError function.
 *
 * @param {Object} data - Form data containing username and password.
 */
const onSubmit = (data) => {
  // Destructure username and password from the form data
  const username = data.username;
  const password = data.password;

  // Check if the provided username and password are valid
  if (username === 'sachin' && password === 'Sachin2023') {
    // Set user information in local storage
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('username', username);

    // Navigate to the dashboard
    history.push('/app/main/dashboard');

    // Clear browser history to prevent going back to the login page
    window.history.pushState(null, null, window.location.href);
  } else {
    // If username or password is incorrect, set a custom error message
    setError('password', {
      message: 'Username or password is mismatched',
    });
  }
};


  const onEyeClick = () => {
    seteye(!eye);
  };

  return (
    <>
      <Helmet>
        <title>Login - Peepal Tree HRMS</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="account-content">
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <Link to="">
              <img
                src={
                  HeaderLogo
                }
                style={{ width: "25%" }}
                alt=""
              />
            </Link>
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Login</h3>
              <p className="account-subtitle">Access to our dashboard</p>
              {/* Account Form */}
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>Username</label>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input
                          className={`form-control  ${
                            errors?.username ? "error-input" : ""
                          }`}
                          type="text"
                          value={value}
                          onChange={onChange}
                          autoComplete="false"
                        />
                      )}
                      defaultValue=""
                    />
                    <small>{errors?.username?.message}</small>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                      <div className="col-auto">
                        <Link className="text-muted" to="/forgotpassword">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="pass-group">
                          <input
                            type={eye ? "password" : "text"}
                            className={`form-control  ${
                              errors?.password ? "error-input" : ""
                            }`}
                            value={value}
                            onChange={onChange}
                            autoComplete="false"
                          />
                          <span
                            onClick={onEyeClick}
                            className={`fa toggle-password" ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            }`}
                          />
                        </div>
                      )}
                      defaultValue=""
                    />
                    <small>{errors?.password?.message}</small>
                  </div>
                  <div className="form-group text-center">
                    <button
                      className="btn btn-primary account-btn"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
                {/* <div className="account-footer">
                  <p>
                    Don't have an account yet?{" "}
                    <Link to="/register">Register</Link>
                  </p>
                </div> */}
              </div>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
