import styled from "@emotion/styled";

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
`;

export const PopupOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const PopupContainer = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;
