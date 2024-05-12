// SearchComponent.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchComponent from '../searchComponent';

describe('SearchComponent', () => {
  test('updates search query on input change', () => {
    // Mock function to simulate setSearchQuery prop
    const setSearchQuery = jest.fn();
    // Define the search type for the component
    const searchType = 'Items';
    // Render the SearchComponent with the setSearchQuery mock function
    const { getByPlaceholderText } = render(
      <SearchComponent searchQuery="" setSearchQuery={setSearchQuery} searchType={searchType} />
    );

    // Get the input field by its placeholder text
    const input = getByPlaceholderText(`Search for ${searchType}`);
    // Simulate a change event on the input field with a new value 'test'
    fireEvent.change(input, { target: { value: 'test' } });

    // Expect setSearchQuery to be called with the new value 'test'
    expect(setSearchQuery).toHaveBeenCalledWith('test');
  });
});
