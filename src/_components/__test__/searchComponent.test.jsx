// SearchComponent.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchComponent from '../searchComponent';

describe('SearchComponent', () => {
  test('updates search query on input change', () => {
    const setSearchQuery = jest.fn();
    const searchType = 'Items';
    const { getByPlaceholderText } = render(
      <SearchComponent searchQuery="" setSearchQuery={setSearchQuery} searchType={searchType} />
    );

    const input = getByPlaceholderText(`Search for ${searchType}`);
    fireEvent.change(input, { target: { value: 'test' } });

    expect(setSearchQuery).toHaveBeenCalledWith('test');
  });
});
