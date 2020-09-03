import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  max-width: 1000px;
`;

export const PageTitleH1 = styled.h1`
  font-family: "Neucha";
  font-size: 2em;
  letter-spacing: 4px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-right: 1em;
`;

export const Label = styled.label`
  margin: 1em 0 0.3em 0;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.65rem 0.5rem;
  font-size: 1rem;
  border: 2px solid ${({ theme }) => theme.input.border};
  background-color: var(--gray-100);
  color: var(--gray-800);
  border-radius: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  :focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.input.borderOnFocus};
  }
  :invalid {
    border: 2px solid #ff7d87;
    box-shadow: none;
  }
`;
export const Textarea = styled.textarea`
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

  :focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.input.borderOnFocus};
  }
  :invalid {
    border: 2px solid #ff7d87;
    box-shadow: none;
  }
`;

export const Divisor = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  height: 100px;
`;

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
