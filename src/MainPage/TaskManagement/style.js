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

export const DivContainer = styled.div`
  .bg-not-started {
    background-color: red;
  }
  .bg-started {
    background-color: #f20d91;
  }
  .bg-getting-there {
    background-color: #fd7c5e;
  }
  .bg-almost-there {
    background-color: #ff9b44;
  }
  .bg-rounding-up {
    background-color: #73ab00;
  }
  .bg-completing {
    background-color: #55ca52;
  }
  .bg-completed {
    background-color: #55ce63;
  }

  .color-not-started {
    color: red;
  }
  .color-started {
    color: #f20d91;
  }
  .color-getting-there {
    color: #fd7c5e;
  }
  .color-almost-there {
    color: #ff9b44;
  }
  .color-rounding-up {
    color: #73ab00;
  }
  .color-completing {
    color: #55ca52;
  }
  .color-completed {
    color: #55ce63;
  }
  .resident-image {
    width: 25px;
    border-radius: 50px;
    height: 25px;
    margin: 0;
    padding: 0;
  }
`;