import styled from "@emotion/styled";
import {media} from "../../_components/modelbox/Addemployee.style";

const { mobile  } = media;

export const Button = styled.button`
  color: #B7C0CD;
  background-color: transparent;
  border: none;
  outline: none;
  &:hover {
    color: #EBECEC;
  }
`;

export const HeaderContainer = styled.div`
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  ${mobile} {
    z-index: 10;
  }
  z-index: 1;
`;