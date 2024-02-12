import React from "react";
import { render } from "@testing-library/react";
import DisplayFileType from "../fileExtension";

describe("DisplayFileType", () => {
  test("renders correct icon for text file type", () => {
    const { container } = render(<DisplayFileType file="example.txt" />);
    // Check if the correct icon class is present for a text file
    expect(container.querySelector(".fa-file-text-o")).toBeInTheDocument();
  });

  test("renders correct icon for word file type", () => {
    const { container } = render(<DisplayFileType file="example.doc" />);
    // Check if the correct icon class is present for a word file
    expect(container.querySelector(".fa-file-word-o")).toBeInTheDocument();
  });

  test("renders correct icon for excel file type", () => {
    const { container } = render(<DisplayFileType file="example.xls" />);
    // Check if the correct icon class is present for a excel file
    expect(container.querySelector(".fa-file-excel-o")).toBeInTheDocument();
  });

  test("renders correct icon for word file type", () => {
    const { container } = render(<DisplayFileType file="example.pdf" />);
    // Check if the correct icon class is present for a pdf file
    expect(container.querySelector(".fa-file-pdf-o")).toBeInTheDocument();
  });

  test("renders default icon for unsupported file types", () => {
    const { container } = render(<DisplayFileType file="example.png" />);
    // Check if the default icon class is present for an unsupported file type
    expect(container.querySelector(".fa-file-o")).toBeInTheDocument();
  });
});
