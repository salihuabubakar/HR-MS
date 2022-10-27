import styled from "@emotion/styled";
const customMediaQuery = (maxWidth) => `@media (max-width: ${maxWidth}px)`;

export const media = {
  smallScreenLaptop: customMediaQuery(1024),
  tablet: customMediaQuery(768),
  bigMobile: customMediaQuery(623),
  mobile: customMediaQuery(576),
};

const { smallScreenLaptop, mobile, tablet, bigMobile } = media;

export const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile} {
    top: 30px;
  }
`;

export const PopupOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const PopupContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 4px;
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .row- {
    display: flex;
    flex-wrap: wrap;
  }

  .col-sm {
    width: 100%;
    margin: 2%;
  }

  .submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ${mobile} {
    width: 90%;
    .row- {
      max-width: fit-content;
      width: 100%;
    }
    .col-sm {
      margin: 2% 0;
    }
  }
`;
