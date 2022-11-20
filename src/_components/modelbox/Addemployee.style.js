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
  height: 100vh;
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile} {
    top: 20;
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
    padding: 10px;
    .btn-container {
      .delete {
        border: 2px solid #000;
        border-radius: 3px;
        margin-right: 25px;
        color: #fff;
        background-color: #a0a0a0;

        ${mobile} {
          margin-right: 5px;
        }
      }

      .closeX {
        border: 2px solid #000;
        border-radius: 40px;
        color: #fff;
        background-color: #a0a0a0;
      }

      /* ${mobile} {
       display: flex;
       flex-direction: column;
       border: 1px solid red;
      } */
    }
  }

  .card-body {
    /* height: 100%;
    overflow-y: scroll; */
    .label {
      ${mobile} {
        font-size: 9px;
        display: none;
      }
    }
  }

  .row- {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .Primary, .Secondary {
    border: 1px solid grey;
    margin: 5px 0;
    padding: 2px;
  }

  .space-between {
    display: flex;
    justify-content: space-between;
  } 
  
  .col-sm {
    width: 100%;
    display: flex;

    .right {
      margin-right: 10px;
    }

    .date-picker-mobile {
      margin-bottom: 20px;
    }

    .inputText {
      width: 100%;
    }

    .inputText input {
      padding: 10% 5%;
    }
  }

  .submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    .submit-Btn {
      background-color: #ff9b44;
      color: #fff;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      border-bottom-left-radius: 50px;
      border-bottom-right-radius: 50px;
      padding: 2% 10%;
      border: none;
    }
  }

  ${mobile} {
    width: 90%;
    .row- {
      width: 100%;
    }
    .col-sm {
      margin: 2% 0;
    }
  }
`;
