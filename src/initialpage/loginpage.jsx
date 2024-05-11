import React, { useState, useReducer, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { alphaNumericPattern, emailrgx } from "../constant";
import HeaderLogo from "../assets/img/Header-logo.png"
import { useGlobalState } from "../context/GlobalState";
import { login_user } from "../utils/sendToServer";
import { Link } from "react-router-dom"

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
  reset,
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

  const [loginState, dispatchUserLogin] = useReducer(login_user, []);

const onSubmit = (data) => {
  const userData = {
    username: data.username,
    password: data.password
  }
  dispatchUserLogin({ type: "add", payload: userData });
  // clear inpputs
  reset();
};


  const onEyeClick = () => {
    seteye(!eye);
  };

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <>
      <Helmet>
        <title>Login - Peepal Tree HRMS</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}} className="account-content h-screen justify-center flex">
        <div className="container">
          {/* Account Logo */}
          <div className="flex items-center justify-center">
            <img
              src={
                HeaderLogo
              }
              style={{ width: "25%" }}
              alt=""
            />
          </div>
          {/* /Account Logo */}
          <div className="account-box boader shadow-md">
            <div className="account-wrapper">
              <h3 className="account-title text-orange-500">Login</h3>
              <p className="account-subtitle">Access to our dashboard</p>
              {/* Account Form */}
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>Email</label>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input
                          className={`form-control  ${
                            errors?.username ? "error-input" : ""
                          }`}
                          type="email"
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
                      <div className="col-auto account-footer">
                        <Link to="/forgot-password">
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
