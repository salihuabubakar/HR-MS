import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ report, setReport }) => {

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video', 'emoji'],
      [{ align: [] }],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra clipboard logic (e.g., pasting HTML content)
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'align',
    'emoji'
  ];


  const handleChange = (value) => {
    setReport(value)
  };

  return (
    <ReactQuill
      value={report}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      className='editor'
    />
  );
};

export default TextEditor;
