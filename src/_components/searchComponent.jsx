import React from 'react'

const SearchComponent = ({ searchQuery, handleSearch, searchType }) => {
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
        </div>
      </div>
    </div>
  );
};
export default SearchComponent;
