import styled from "@emotion/styled";
const customMediaQuery = (maxWidth) => `@media (max-width: ${maxWidth}px)`;

export const media = {
  smallScreenLaptop: customMediaQuery(1024),
  bigTablet: customMediaQuery(770),
  tablet: customMediaQuery(768),
  bigMobile: customMediaQuery(623),
  mobile: customMediaQuery(576),
};

const { smallScreenLaptop, mobile, tablet, bigMobile, bigTablet } = media;

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

export const DesignationDiv = styled.div`
  ${mobile} {
    margin-bottom: 15px;
    z-index: 500;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  .nav-btn-div,
  .print-btn-div {
    width: 100%;
  }
  .nav-btn-div {
    display: flex;
    justify-content: flex-end;
  }

  ${bigTablet} {
    .nav-btn-div,
    .print-btn-div {
      margin: 5px;
    }
  }

  ${mobile} {
    flex-direction: column;
    .nav-btn-div,
    .print-btn-div {
      margin: 5px 0;
    }
  }

  @media screen and (max-width: 745px) {
    .print-btn {
      font-size: 1.5rem;
    }
  }

  ${mobile} {
    .print-btn {
      font-size: 1rem;
    }
  }
`;

export const NavButton = styled.button`
  /* Adapt the colors based on primary prop */
  /* background: ${(props) => (props.$primary ? "palevioletred" : "white")};
  color: ${(props) => (props.$primary ? "white" : "palevioletred")}; */

  ${bigTablet} {
    width: 100%;
    font-size: 13px;
  }

  ${mobile} {
    font-size: 1rem;
  }
  margin: 0 1px;
`;

export const RepeatModalContainer = styled.div`
  .form-header {
    width: 282px;
  }

  .nav-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .check-box-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    margin-top: 20px;
  }
`;

export const CardWidth = styled.div`
  width: 15% !important;

  @media (max-width: 1444px) {
    width: 20% !important;
  }

  @media (max-width: 1121px) {
    width: 25% !important;
  }

  ${smallScreenLaptop} {
    width: 45% !important;
  }

  ${mobile} {
    width: 45% !important;
  }

  .doc-image {
    width: 100px;
    height: 100px;
    border: none;
    border-radius: 2px;
  }
`;

export const EmployeeImgCard = styled.div`
  width: 13% !important;

  @media (max-width: 1444px) {
    width: 25% !important;
  }

  /* ${mobile} {
    width: 20% !important;
  } */

  position: relative;

  .edit-icon {
    background: none;
    border: none;
    position: absolute;
    right: 0;
  }
`;

export const BillCard = styled.div`
  width: 20% !important;

  @media (max-width: 1444px) {
    width: 30% !important;
  }

  ${mobile} {
    width: 100% !important;
  }

  position: relative;

  .edit-icon {
    background: none;
    border: none;
    position: absolute;
    right: 0;
  }
`;
