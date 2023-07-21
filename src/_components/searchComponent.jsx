import React from "react";
import "./style.css"

const SearchComponent = ({ searchQuery, setSearchQuery, handleSearch, searchType }) => {
  const clearInput = () => {
    if (!!setSearchQuery) {
      setSearchQuery("");
    }
  }
  return (
    <div className="row filter-row">
      <div className="col-sm-6 col-md-4">
        <div className="form-group">
          <input
            value={searchQuery}
            onChange={handleSearch}
            type="text"
            className="form-control"
            placeholder={`Search for ${searchType}`}
          />
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
