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
  ${mobile} {
    /* z-index: -1; */
  }
`;