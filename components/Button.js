import styled from "styled-components";

export const Button = styled.button`
  margin: 10px;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  /* text-transform: uppercase; */
  font-weight: 700;
  color: ${({ theme }) => theme.button.textColor};
  background-color: ${({ theme }) => theme.button.background};
  border: none;
  transition: all 150ms ease-in;

  :hover {
    background-color: ${({ theme }) => theme.button.hover};
    color: ${({ theme }) => theme.button.textColorHover};
  }
`;

export const ButtonProductCard = styled(Button)`
  /* background-color: #4888ca; */
  color: #06162b;
  border: none;
`;
