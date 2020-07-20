import { useState } from "react";
import Router from "next/router";
import { Formik, Field } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";
import { useAuth } from "../../context/AuthProvider";
import Button from "../../components/Button";

const LoginStyled = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.section`
  max-width: 500px;
  max-height: 800px;
  height: 500px;
  box-shadow: 0 0 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 25px;

  input {
    margin: 10px;
    background-color: white;
    padding: 10px;
    font-size: 1.2em;
    border-radius: 5px;
  }
`;

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
    <LoginStyled>
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
          <FormContainer>
            <h1>INICIA SESIÓN</h1>
            <Form onSubmit={handleSubmit}>
              <Field
                type='email'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={validateEmail}
                placeholder='email'
                // value={props.values.name}
                name='email'
              />
              {errors.email && touched.email && <div>{errors.email}</div>}
              <Field
                type='password'
                placeholder='password'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={validatePassword}
                // value={values.name}
                name='password'
              />
              {errors.password && touched.password && (
                <div>{errors.password}</div>
              )}
              <Button type='submit'>Submit</Button>
              {isValidating}
            </Form>
          </FormContainer>
        )}
      </Formik>
    </LoginStyled>
  );
};

// Login.Layout = CmsLayout;

export default Login;
