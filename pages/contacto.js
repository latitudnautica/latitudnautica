import { useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import {
  Container,
  PageTitleH1,
} from "components/layouts/commonStyledComponents";
import {
  RiWhatsappLine,
  RiFacebookCircleLine,
  RiInstagramLine,
  RiPhoneLine,
  RiMailSendLine,
} from "react-icons/ri";
import { Button } from "components/layouts/Button";
import axiosBase from "@/utils/axiosBase";

const ContactPageWrapper = styled.section`
  margin: 3em 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  margin: 3em 0;
  position: relative;

  :after {
    content: "";
    background: url("images/logo.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
`;

const FormFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2em;
  font-size: 1.2em;
  label {
    margin: 1em 0 0.3em 0;
    font-weight: bold;
  }

  input[type="email"],
  input[type="text"],
  input[type="phone"],
  input[type="number"] {
    padding: 0.65rem 0.5rem;
    font-size: 1rem;
    border: 2px solid ${({ theme }) => theme.input.border};
    background-color: var(--gray-100);
    color: var(--gray-800);
    border-radius: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: 1rem;
    border: 2px solid ${({ theme }) => theme.input.border};
    color: var(--gray-700);
    border-radius: 10px;
    resize: vertical;
    background-color: ${({ theme }) => theme.input.background};
    box-sizing: border-box;
    padding: 0.65rem 0.5rem;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.input.borderOnFocus};
  }

  input:invalid,
  select:invalid,
  textarea:invalid {
    border: 2px solid #ff7d87;
    box-shadow: none;
  }
`;

const ContactDetailWrapper = styled.div`
  border-left: 2px solid red;
  padding: 0 2em;
`;

const ContactDetail = styled.div`
  font-size: 1.5em;
  margin: 1em 0;
`;

const SocialIcons = styled(ContactDetail)`
  font-size: 1.5em;
  a {
    margin: 0 15px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const InputError = styled.span`
  color: ${({ theme }) => theme.input.error};
  padding-left: 10px;
  font-weight: 400;
`;

const ContactPage = () => {
  const [status, setStatus] = useState({
    message: "",
    error: false,
    emailSent: false,
  });

  return (
    <Container>
      <ContactPageWrapper>
        <PageTitleH1>Envianos un Mensaje</PageTitleH1>
        <Grid>
          <Formik
            initialValues={{ name: "", email: "", phone: "", message: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Requerido";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.name) {
                errors.name = "Requerido";
              } else if (!/[A-Z0-9]$/i.test(values.name)) {
                errors.name = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(true);
              axiosBase
                .post("/mailing/send", values)
                .then((res) => {
                  console.log(res);
                  setSubmitting(false);
                  setStatus({
                    message: "Mensaje Enviado",
                    error: false,
                    emailSent: true,
                  });
                })
                .catch((err) => {
                  console.log(err.response);
                  setSubmitting(false);
                  setStatus({
                    message: "ERROR:  Mensaje No Enviado",
                    emailSent: true,
                    error: true,
                  });
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormFieldsWrapper>
                  <label htmlFor="name">
                    Nombre
                    <InputError>
                      {errors.name && touched.name && errors.name}
                    </InputError>
                  </label>
                  <Field
                    as="input"
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />

                  <label htmlFor="email">
                    Email
                    <InputError>
                      {errors.email && touched.email && errors.email}
                    </InputError>
                  </label>
                  <Field
                    as="input"
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />

                  <label htmlFor="subject">
                    Asunto
                    <InputError>
                      {errors.subject && touched.subject && errors.subject}
                    </InputError>
                  </label>
                  <Field
                    as="input"
                    type="text"
                    id="subject"
                    name="subject"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subject}
                  />

                  <label htmlFor="phone">
                    Teléfono
                    <InputError>
                      {errors.phone && touched.phone && errors.phone}
                    </InputError>
                  </label>
                  <Field
                    as="input"
                    type="phone"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />

                  <label htmlFor="message">
                    Mensaje
                    <InputError>
                      {errors.message && touched.message && errors.message}
                    </InputError>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "enviando" : "enviar"}
                  </Button>
                  {status.emailSent && <div> {status.message}</div>}
                </FormFieldsWrapper>
              </Form>
            )}
          </Formik>
          <ContactDetailWrapper>
            <ContactDetail>
              <RiPhoneLine /> +54 6545-1321
            </ContactDetail>
            <ContactDetail>
              <RiMailSendLine /> info@latitudnautica.com.ar
            </ContactDetail>
            <SocialIcons>
              <a href="/">
                <RiWhatsappLine />
              </a>
              <a href="/">
                <RiInstagramLine />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100004283867132">
                <RiFacebookCircleLine />
              </a>
            </SocialIcons>
          </ContactDetailWrapper>
        </Grid>
      </ContactPageWrapper>
    </Container>
  );
};

ContactPage.Layout = MainLayout;

export default ContactPage;
