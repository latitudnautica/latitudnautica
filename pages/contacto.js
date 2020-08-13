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
    border: 2px solid var(--gray-200);
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
    border: 2px solid var(--gray-200);
    color: var(--gray-700);
    border-radius: 10px;
    resize: vertical;
    background-color: var(--gray-100);
    box-sizing: border-box;
    padding: 0.65rem 0.5rem;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border: 2px solid var(--focus-ring-color);
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

const ContactPage = () => {
  const [message, setMessage] = useState({});

  const handleInput = (e) => {
    const value = e.target.value;
    console.log(value);
    setMessage();
  };

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
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
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
                  <label htmlFor="name">Nombre</label>
                  <Field
                    as="input"
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name && errors.name}
                  <label htmlFor="email"> Email</label>
                  <Field
                    as="input"
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && errors.email}
                  <label htmlFor="phone">Teléfono</label>
                  <Field
                    as="input"
                    type="phone"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  {errors.phone && touched.phone && errors.phone}
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                  />
                  {errors.password && touched.password && errors.password}
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "enviando" : "enviar"}
                  </Button>
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
