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
