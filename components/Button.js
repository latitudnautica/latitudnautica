import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  box-sizing: border-box;
  cursor: pointer;
  background-color: #08a0b9;
  text-transform: uppercase;
  color: white;
  padding: 10px;
  border: 1px solid #08a0b9;
  transition: all 200ms ease-in;
  margin: 10px;
  border-radius: 2.5px;

  :hover {
    background-color: white;
    color: #08a0b9;
    border: 1px solid #08a0b9;
  }
`;
const Button = (props) => {
  const { handleClick, children, type } = props;
  return (
    <ButtonStyled onClick={handleClick} {...props}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
