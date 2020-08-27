import styled from "styled-components";

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
