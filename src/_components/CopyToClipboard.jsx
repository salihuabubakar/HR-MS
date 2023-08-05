import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './style.css'

const CopyToClipboardButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);

    // Reset the "isCopied" state after a brief period to provide feedback to the user
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <button className={`copy-button ${isCopied ? 'copied' : ''}`}>{isCopied ? 'Copied!' : 'Copy'}</button>
    </CopyToClipboard>
  );
}
export default CopyToClipboardButton;
