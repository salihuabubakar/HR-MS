// Import necessary modules and components
import React from 'react';
import CopyToClipboardButton from '../CopyToClipboard'; // Assuming correct path to CopyToClipboardButton component
import { render, waitFor, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Describe the test suite for CopyToClipboardButton component
describe('CopyToClipBoard', () => {
  // Test to ensure that the button renders with initial text "Copy"
  test('renders with initial "Copy" text', () => {
    // Define the text to be copied
    const text = "copy to clipboard";
    // Render the CopyToClipboardButton component with the defined text
    const { getByText } = render(<CopyToClipboardButton text={text} />);
    // Expect the button with text "Copy" to be in the document
    expect(getByText('Copy')).toBeInTheDocument();
  });

  // Test to ensure that the button changes text to "Copied" and resets after clicking it
  test('changes text to "Copied" and resets after clicking it', async () => {
    // Define the text to be copied
    const text = "copy to clipboard";
    // Render the CopyToClipboardButton component with the defined text
    const { getByText } = render(<CopyToClipboardButton text={text} />);
    // Expect the button with text "Copy" to be in the document
    expect(getByText('Copy')).toBeInTheDocument();
    // Get the button element by its text content "Copy"
    const btn = getByText('Copy');
    // Use act to handle asynchronous actions
    await act(async () => {
      // Simulate a click event on the button
      userEvent.click(btn);
      // Wait for the "Copied!" text to appear after clicking the button
      await waitFor(() => expect(screen.getByText('Copied!')).toBeInTheDocument());
    });
    // Wait for a timeout period to ensure that the "Copied!" text disappears
    await waitFor(() => expect(screen.queryByText('Copied!')).not.toBeInTheDocument(), { timeout: 1500 });
    // Expect the button with text "Copy" to be in the document after resetting
    expect(getByText('Copy')).toBeInTheDocument();
  });
});
