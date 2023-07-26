import React from "react";

let progressCal;
let status = "";
const taskProgressFuction = (taskProgress) => {
  if (taskProgress === 0) {
    status = "Not started";
    progressCal = taskProgress;
  } else if (taskProgress >= 1 && taskProgress <= 24) {
    status = "Started";
    progressCal = taskProgress;
  } else if (taskProgress >= 25 && taskProgress <= 49) {
    status = "Getting there";
    progressCal = taskProgress;
  } else if (taskProgress >= 50 && taskProgress <= 75) {
    status = "Almost there";
    progressCal = taskProgress;
  } else if (taskProgress >= 76 && taskProgress <= 85) {
    status = "Rounding up";
    progressCal = taskProgress;
  } else if (taskProgress >= 86 && taskProgress <= 95) {
    status = "Completing";
    progressCal = taskProgress;
  } else {
    status = "Completed";
    progressCal = taskProgress;
  }

  return [status, progressCal];
};

export const ProgressSpan = ({progress}) => {
  return (
    <>
      <span
        className={
          (taskProgressFuction(progress).includes("Not started")
            ? "float-end color-not-started"
            : null) ||
          (taskProgressFuction(progress).includes("Started")
            ? "float-end color-started"
            : null) ||
          (taskProgressFuction(progress).includes("Getting there")
            ? "float-end color-getting-there"
            : null) ||
          (taskProgressFuction(progress).includes("Almost there")
            ? "float-end color-almost-there"
            : null) ||
          (taskProgressFuction(progress).includes("Rounding up")
            ? "float-end color-rounding-up"
            : null) ||
          (taskProgressFuction(progress).includes("Completing")
            ? "float-end color-completing"
            : null) ||
          (taskProgressFuction(progress).includes("Completed")
            ? "float-end color-completed"
            : null)
        }
      >
        {(taskProgressFuction(progress).includes(
          "Not started" || progress
        ) &&
          progress + "%") ||
          (taskProgressFuction(progress).includes(
            "Started" || progress
          ) &&
            progress + "%") ||
          (taskProgressFuction(progress).includes(
            "Getting there" || progress
          ) &&
            progress + "%") ||
          (taskProgressFuction(progress).includes(
            "Almost there" || progress
          ) &&
            progress + "%") ||
          (taskProgressFuction(progress).includes(
            "Rounding up" || progress
          ) &&
            progress + "%") ||
          (taskProgressFuction(progress).includes(
            "Completing" || progress
          ) &&
            progress + "%") ||
          (taskProgressFuction(progress).includes(
            "Completed" || progress
          ) &&
            progress + "%")}
      </span>
    </>
  )
}

export const ProgressDiv = ({progress}) => {
  return (
    <>
      <div className="progress progress-xs mb-0">
        <div
          className={
            (taskProgressFuction(progress).includes("Not started")
              ? " progress-bar bg-not-started"
              : null) ||
            (taskProgressFuction(progress).includes("Started")
              ? "progress-bar bg-started"
              : null) ||
            (taskProgressFuction(progress).includes("Getting there")
              ? "progress-bar bg-getting-there"
              : null) ||
            (taskProgressFuction(progress).includes("Almost there")
              ? "progress-bar bg-almost-there"
              : null) ||
            (taskProgressFuction(progress).includes("Rounding up")
              ? "progress-bar bg-rounding-up"
              : null) ||
            (taskProgressFuction(progress).includes("Completing")
              ? "progress-bar bg-completing"
              : null) ||
            (taskProgressFuction(progress).includes("Completed")
              ? "progress-bar bg-completed"
              : null)
          }
          role="progressbar"
          data-bs-toggle="tooltip"
          style={{
            width:
              (taskProgressFuction(progress).includes(
                "Not started" || progress
              ) &&
                progress + "%") ||
              (taskProgressFuction(progress).includes(
                "Started" || progress
              ) &&
                progress + "%") ||
              (taskProgressFuction(progress).includes(
                "Getting there" || progress
              ) &&
                progress + "%") ||
              (taskProgressFuction(progress).includes(
                "Almost there" || progress
              ) &&
                progress + "%") ||
              (taskProgressFuction(progress).includes(
                "Rounding up" || progress
              ) &&
                progress + "%") ||
              (taskProgressFuction(progress).includes(
                "Completing" || progress
              ) &&
                progress + "%") ||
              (taskProgressFuction(progress).includes(
                "Completed" || progress
              ) &&
                progress + "%"),
          }}
        />
      </div>
    </>
  )
}

export const handleFileDownload = (file) => {
  const a = document.createElement("a");
  a.href = file;

  const fileExtension = file.split(".").pop().toLowerCase();

  // Set the MIME type based on the file extension
  let mimeType;
  if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "JPG"
  ) {
    mimeType = "image/jpeg";
  } else if (fileExtension === "png" || fileExtension === "PNG") {
    mimeType = "image/png";
  } else if (fileExtension === "pdf") {
    mimeType = "application/pdf";
  } else if (fileExtension === "webp") {
    mimeType = "image/webp";
  } else if (fileExtension === "txt") {
    mimeType = "text/plain";
  } else if (fileExtension === "xls" || fileExtension === "xlsx") {
    mimeType = "application/vnd.ms-excel";
  } else if (fileExtension === "doc" || fileExtension === "docx") {
    mimeType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  } else {
    mimeType = "application/octet-stream"; // Fallback MIME type for unknown file types
  }

  // Set the MIME type of the file
  a.type = mimeType;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
