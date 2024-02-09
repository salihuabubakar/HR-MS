import React from 'react';
/**
 * Function to highlight the search query within a given text.
 *
 * @param {string} text - The text to be searched and highlighted.
 * @param {string} searchQuery - The search query to be highlighted within the text.
 * @returns {JSX.Element} - JSX element with the search query highlighted.
 */
export const highlightSearchQuery = (text, searchQuery) => {
  // If search query is empty, return the original text wrapped in a span element
  if (!searchQuery) {
    return <span style={{ color: '#393333' }}>{text}</span>;
  }

  // Create a regular expression with the search query for global case-insensitive matching
  const regex = new RegExp(`(${searchQuery})`, 'gi');
  // Split the text into parts using the search query as delimiter
  const parts = text.split(regex);

  // Map over the parts and apply highlighting to the parts matching the search query
  return parts.map((part, index) => (
    // If the part matches the search query, wrap it in a span with the highlight color
    part.toLowerCase() === searchQuery.toLowerCase() ? (
      <span key={index} style={{ color: '#FE8458' }}>
        {part}
      </span>
    ) : (
      // If the part doesn't match the search query, render it as is
      <span style={{ color: '#393333' }} key={index}>
        {part}
      </span>
    )
  ));
};
