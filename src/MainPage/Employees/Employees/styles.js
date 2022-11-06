import styled from "@emotion/styled";
const customMediaQuery = (maxWidth) => `@media (max-width: ${maxWidth}px)`;

export const media = {
  smallScreenLaptop: customMediaQuery(1024),
  tablet: customMediaQuery(768),
  bigMobile: customMediaQuery(623),
  mobile: customMediaQuery(576),
};

const { smallScreenLaptop, mobile, tablet, bigMobile } = media;

export const Body = styled.div`
  td {
    cursor: pointer;
  }

  .show {
    display: block;
  }

  .none {
    display: none;
  }

  .tool-tip {
    position: relative;
    margin-bottom: 5px;
  }

  /* .user-add-shedule-list {
    width: 10px;
  } */

  .tool-tip .tool-tip-text {
    font-size: 10px;
    visibility: hidden;
    width: 20px;
    /* border: 1px dashed #1eb53a; */
    color: #888888;
    text-align: center;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
  }

  .tool-tip:hover .tool-tip-text {
    visibility: visible;
  }

  ${mobile} {
    .tool-tip-text {
      display: none;
    }
  }
`;