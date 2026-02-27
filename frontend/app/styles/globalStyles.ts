import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #F5F7FB;
    color: #111827;
    line-height: 1.5;
  }

  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
  }
  
  a {
      text-decoration: none;
      color: inherit;
  }

  img {
      max-width: 100%;
      display: block;
  }
`;

export default GlobalStyles;