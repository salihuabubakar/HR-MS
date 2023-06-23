import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  .card {
    margin: 5px;
    width: 32%;
    padding: 5px;
    color: #9e9e9e;
  }

  .plain-card {
    color: #4f4f55;
    width: 48%;

    span {
      color: #9e9e9e;
    }

    .c {
      font-size: 0.8rem;
    }
  }

  .name {
    color: #616670;
  }

  .document-name {
    font-weight: 900;
  }

  @media screen and (max-width: 1398px) {
    .plain-card {
      width: 100%;
    }
  }

  @media screen and (max-width: 1194px) {
    .card {
      width: 47%;
    }
    .plain-card {
      width: 100%;
    }
  }

  @media screen and (max-width: 659px) {
    .card {
      width: 100%;
    }
  }
`;