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