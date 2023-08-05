import React from "react";
const DisplayFileType = ({ file }) => {
  const fileRegex = /\.(txt|doc|docx|xls|xlsx|pdf)$/i;
  let iconClass = "fa fa-file-o"; // Default icon if file type is not matched

  if (fileRegex.test(file)) {
    // Update the iconClass based on the file extension
    if (/\.(txt)$/i.test(file)) {
      iconClass = "fa fa-file-text-o";
    } else if (/\.(doc|docx)$/i.test(file)) {
      iconClass = "fa fa-file-word-o";
    } else if (/\.(xls|xlsx)$/i.test(file)) {
      iconClass = "fa fa-file-excel-o";
    } else if (/\.(pdf)$/i.test(file)) {
      iconClass = "fa fa-file-pdf-o";
    }
  }

  return <i className={iconClass} />;
};

export default DisplayFileType;