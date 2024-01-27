import React from "react";
import "./style.css"

/**
 * SearchComponent
 *
 * A React functional component representing a search input field with a clear button.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.searchQuery - The current search query string.
 * @param {function} props.setSearchQuery - A function to update the search query state.
 * @param {function} props.handleSearch - A function to handle the search query changes.
 * @param {string} props.searchType - The type of content being searched (used for placeholder text).
 *
 * @returns {JSX.Element} - Returns the JSX for the search input field and clear button.
 */
const SearchComponent = ({ searchQuery, setSearchQuery, handleSearch, searchType }) => {
  /**
   * Clears the search input field by setting the search query to an empty string.
   */
  const clearInput = () => {
    if (!!setSearchQuery) {
      setSearchQuery("");
    }
  };

  return (
    <div className="row filter-row">
      <div className="col-sm-6 col-md-4">
        <div className="form-group">
          {/* Search input field */}
          <input
            value={searchQuery}
            onChange={handleSearch}
            type="text"
            className="form-control"
            placeholder={`Search for ${searchType}`}
          />
          {/* Clear button, visible when there is a search query */}
          {searchQuery && (
            <span className="clear-icon" onClick={clearInput}>
              <i className="fa fa-times m-r-5" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
