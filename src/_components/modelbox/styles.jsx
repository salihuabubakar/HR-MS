import styled from "@emotion/styled";
const customMediaQuery = (maxWidth) => `@media (max-width: ${maxWidth}px)`;

export const media = {
  smallScreenLaptop: customMediaQuery(1024),
  tablet: customMediaQuery(768),
  bigMobile: customMediaQuery(623),
  mobile: customMediaQuery(576),
};

const { smallScreenLaptop, mobile, tablet, bigMobile } = media;

export const HtmlDateInput = styled.input`
  width: 190px;

  ${mobile} {
    width: 140px;
  }
`;

export const HtmlSelectInput = styled.input`
  width: 190px;

  ${mobile} {
    width: 100%;
  }
`;

export const RadioBtn = styled.div`
  display: flex;
  input[type="radio"] {
    -webkit-appearance: none;
  }
  label {
    height: 45px;
    border-radius: 4px;
    width: 100%;
    border: 1px solid #ddd;
    position: relative;
    color: #808080;
    font-weight: 900;
    transition: 0.5s;
    cursor: pointer;
    padding: 2px;
  }
  input[type="radio"]:checked + label {
    background-color: #ff9b44;
    color: #ffffff;
  }
`;