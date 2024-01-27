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
  /* The CSS code input[type="checkbox"] { -webkit-appearance: none; } is removing the default
  styling of the checkbox input element provided by the browser. By setting -webkit-appearance to
  none, it allows the developer to apply custom styles to the checkbox element using CSS. */
  input[type="checkbox"] {
    -webkit-appearance: none;
  }
  label {
    height: 45px;
    border-radius: 4px;
    width: 100%;
    border: 1px solid #ddd;
    position: relative;
    color: #808080;
    transition: 0.5s;
    cursor: pointer;
    padding: 10px;
  }
  /* The CSS code input[type="checkbox"]:checked + label is selecting the label element that
  immediately follows a checked checkbox input element. */
  input[type="checkbox"]:checked + label {
    background-color: #ff9b44;
    color: #ffffff;
  }
`;

export const CheckBox = styled.div`
  display: flex;
  width: 20px;
  input[type="checkbox"] {
    -webkit-appearance: none;
  }
  label {
    border-radius: 4px;
    position: relative;
    transition: 0.1s;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    background-color: #55CE63;
    color: #ffffff;
  }
`;