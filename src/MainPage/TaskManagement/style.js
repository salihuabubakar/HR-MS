import styled from "@emotion/styled";

export const Span = styled.span`
  padding: 5px;
  border-radius: 5px;
  color: white;

  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #00002a;
  }
  input[type="radio"] {
    -webkit-appearance: none;
  }
  label {
    height: 100%;
    width: 100%;
    border: 1px solid #ff9b44;
    position: relative;
    color: #18f98d;
    transition: 0.5s;
  }
  input[type="radio"]:checked + label {
    background-color: #ff9b44;
    color: #ffffff;
    box-shadow: 0 15px 45px rgb(24, 249, 141, 0.2);
  }
`;