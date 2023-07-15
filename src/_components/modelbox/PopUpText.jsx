import React from 'react'
import { Popup } from "semantic-ui-react";

const PopUpText = ({ text }) => {
  return (
    <>
      <Popup
        mouseEnterDelay={500}
        mouseLeaveDelay={200}
        hoverable={true}
        content={text}
        trigger={
          <span
            style={{
              display: "inline-block",
              padding: "0.5em 1em",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            Hover to show
          </span>
        }
      />
    </>
  );
};

export default PopUpText;
