import React from 'react'
import { useGlobalState, setGlobalState } from '../../../context/GlobalState';
import { PopupContainer, PopupOverlay, PopupWrapper } from '../../../_components/modelbox/Addemployee.style';
const HoverText = ({ isHoverText }) => {

  const handleHoverClose = () => {
    setGlobalState("isHoverForRole", false);
    setGlobalState("isHover", false);
  }
  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer>
            <div id="tooltip">
              <span id="tooltipText">
                <a 
                  onClick={handleHoverClose} 
                  style={{display: "block"}}
                >
                  <i class="fa fa-times"></i>
                </a>
                {isHoverText}
              </span>
            </div>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
    </>
  );
};
export default HoverText;
