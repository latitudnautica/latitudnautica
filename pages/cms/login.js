import { useState } from "react";
import Router from "next/router";
import { Formik, Field } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthProvider";

function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length == 0 || value.length > 16) {
    error = "Invalid password ";
  }
  return error;
}

const Login = () => {
  const [loginError, setLoginError] = useState(null);

  const { setAuthenticated } = useAuth();

  const handleLogin = (data) => {
    console.log(data);
   
    const getToken = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
      data
     
    );

    getToken
      .then((user) => {
        Cookies.set("token", user.data.token);
      })
      .then((r) => {
        setAuthenticated(true);
        Router.back();
      })
      .catch((err) => {
        Cookies.remove("token");
        setLoginError(err);
        console.log("error", err);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {loginError && <div>Usuario o Password erróneo.</div>}
      <Formik
        initialValues={{
          password: "",
          email: ""
        }}
        onSubmit={(values, actions) => {
          handleLogin(values);

          actions.setSubmitting(false);
        }}
        onChange={() => {
          setLoginError(null);
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValidating
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              type='email'
              onChange={handleChange}
              onBlur={handleBlur}
              validate={validateEmail}
              // value={props.values.name}
              name='email'
            />
            {errors.email && touched.email && <div>{errors.email}</div>}
            <Field
              type='password'
              onChange={handleChange}
              onBlur={handleBlur}
              validate={validatePassword}
              // value={values.name}
              name='password'
            />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}
            <button type='submit'>Submit</button>
            {isValidating}
          </form>
        )}
      </Formik>
    </div>
  );
};

// Login.Layout = CmsLayout;

export default Login;
