import styled from "styled-components";

const Button = styled.button`
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${({ theme }) => theme.button.primary};
  text-transform: uppercase;
  color: ${({ theme }) => theme.button.hover};
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.button.primary};
  transition: all 150ms ease-in;
  margin: 10px;
  border-radius: 2.5px;

  :hover {
    background-color: ${({ theme }) => theme.button.hover};
    color: ${({ theme }) => theme.button.primary};
    border: 1px solid #08a0b9;
  }
`;

// const Button = (props) => {
//   const { handleClick, children, type } = props;
//   return (
//     <ButtonStyled onClick={handleClick} {...props}>
//       {children}
//     </ButtonStyled>
//   );
// };

export default Button;
