import styled from 'styled-components';

export const Button = styled.button`
  margin: 10px;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  /* text-transform: uppercase; */
  font-weight: 700;
  color: ${({ theme }) => theme.button.textColor};
  background: ${({ theme }) => theme.button.background};
  border: none;
  transition: all 150ms ease-in;

  * {
    pointer-events: none;
  }

  :hover {
    transition: all 200ms ease-in;
    background: ${({ theme }) => theme.button.hover};
    color: ${({ theme }) => theme.button.textColorHover};
  }
`;

export const ButtonProductCard = styled(Button)`
  border: 1px solid ${({ theme }) => theme.button.background};
  background-color: white;
  border-bottom: 2px solid ${({ theme }) => theme.button.background};
  color: #06162b;
  box-shadow: ${({ theme }) => theme.details.boxShadow};

  :hover {
    background-color: ${({ theme }) => theme.button.background};
  }
`;
