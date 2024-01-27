import React from "react";
/**
 * DisplayFileType Component
 *
 * A React functional component that renders an icon based on the file type. It uses Font Awesome icons
 * and assigns different icons based on the file extension (txt, doc, docx, xls, xlsx, pdf).
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.file - The file name or path for which the icon needs to be displayed.
 *
 * @returns {JSX.Element} - Returns the Font Awesome icon element representing the file type.
 */
const DisplayFileType = ({ file }) => {
  // Regular expression to match supported file extensions (txt, doc, docx, xls, xlsx, pdf)
  const fileRegex = /\.(txt|doc|docx|xls|xlsx|pdf)$/i;

  // Default icon class if file type is not matched
  let iconClass = "fa fa-file-o";

  // Check if the file name matches the supported file extensions
  if (fileRegex.test(file)) {
    // Update the iconClass based on the file extension
    if (/\.(txt)$/i.test(file)) {
      iconClass = "fa fa-file-text-o"; // Text file icon
    } else if (/\.(doc|docx)$/i.test(file)) {
      iconClass = "fa fa-file-word-o"; // Word document icon
    } else if (/\.(xls|xlsx)$/i.test(file)) {
      iconClass = "fa fa-file-excel-o"; // Excel spreadsheet icon
    } else if (/\.(pdf)$/i.test(file)) {
      iconClass = "fa fa-file-pdf-o"; // PDF document icon
    }
  }

  // Render the Font Awesome icon element with the determined iconClass
  return <i className={iconClass} />;
};


export default DisplayFileType;