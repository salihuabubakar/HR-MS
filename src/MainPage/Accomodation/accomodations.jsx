import React, {useEffect, useState, useMemo, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import Header from '../../initialpage/Sidebar/header'
import Sidebar from '../../initialpage/Sidebar/sidebar'
import { setGlobalState, useGlobalState } from '../../context/GlobalState';
import AddHouse from "../../_components/modelbox/AddHouse";
import DeleteModal from '../../_components/modelbox/DeleteModal';
import HouseList from './house-list';
import { useHouseFetching } from '../../utils/employeeCustomFetchHook';
import { add_update_delete_house } from '../../utils/sendToServer';
import "../Employees/Employees/style.css"
import { useSearch } from '../../utils/Hooks/searchFunctionCustomHook';
import SearchComponent from "../../_components/searchComponent";
import AllHouse from "./allhouse";

const Accomodations = () => {
  const [tab, setTab] = useState("allHouse" || "houseList");
  const { houseData, houseError, isHouseDataLoading } =
    useHouseFetching();
  /**
 * House Search and Management
 *
 * Manages the search functionality for houses using the custom hook 'useSearch'
 * and utilizes the 'useReducer' hook for state management.
 *
 * @constant {string} searchQuery - The current search query for houses.
 * @constant {function} setSearchQuery - Function to set the search query.
 * @constant {Array} filteredResults - Array of houses filtered based on the search query.
 * @constant {Object} state - The current state of house data managed by 'useReducer'.
 * @constant {function} dispatchHouse - The dispatch function for updating house data using 'useReducer'.
 */
  const {
    searchQuery,
    setSearchQuery,
    filteredResults,
  } = useSearch(houseData);
  
  // State management for house data using 'useReducer'
  const [state, dispatchHouse] = useReducer(add_update_delete_house, []);

  const [showModal] = useGlobalState("showModal");
  const [deleteModal] = useGlobalState("deleteModal");
  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [houseIdToEdit, setHouseIdToEdit] = useState("");
  const [getHouseId, setGetHouseId] = useState();

  useEffect(() => {
    if (!showModal) {
      setGlobalState("selectedHouse", "");
      setHouseIdToEdit("");
      setIndexToEdit("")
    }
  }, [showModal]);

  const handleHouseEdit = (id, index) => {
    setHouseIdToEdit(id);
    setIndexToEdit(index);
    setGlobalState("showModal", true);
    setGlobalState("selectedHouse", houseData);
  };

  const handleHouseDelete = (id) => {
    setGetHouseId(id);
    setGlobalState("deleteModal", true);
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
    
    const [isHouseError] = useGlobalState("isHouseError");

    const clearErrorMessage = () => {
      setGlobalState("isHouseError", "");
    };

    const [isDarkMode] = useGlobalState("isDarkMode");

      return (
        <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
          <Header onMenuClick={(value) => toggleMobileMenu()} />
          <Sidebar />
          <div className="page-wrapper">
            <Helmet>
              <title>Accomodation - Peepal Tree HRMS</title>
              <meta name="description" content="Accomodation page" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
              {/* Page Header */}
              <div className="page-header">
                <>
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="text-4xl text-orange-500">Houses</h3>
                      <ul className="breadcrumb">
                        <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/main/dashboard">Dashboard</Link>
                        <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">House</li>
                      </ul>
                    </div>
                    <div className="col-auto float-end ml-auto">
                      <a className="btn add-btn" onClick={() => setGlobalState("showModal", true)}>
                        <i className="fa fa-plus" /> Add House
                      </a>
                      <div className="view-icons">
                        <a
                          onClick={() => setTab("allHouse")}
                          className={`grid-view btn btn-link ${
                            tab == `allHouse` ? `active` : null
                          }`}
                        >
                          <i className="fa fa-th" />
                        </a>
                        <a
                          onClick={() => setTab("houseList")}
                          className={`list-view btn btn-link ${
                            tab == `houseList` ? `active` : null
                          }`}
                        >
                          <i className="fa fa-bars" />
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              </div>
              {/* /Page Header */}
              {/* Search Filter */}
              <>
                <SearchComponent
                  searchType={"House Name"}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <span style={{ color: "red", fontSize: "0.7rem" }}>
                  {isHouseError?.length > 0 && (
                    <>
                      Error: {isHouseError}
                      <button
                        onClick={clearErrorMessage}
                        style={{
                          marginLeft: "10px",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          color: "black",
                        }}
                      >
                        <i className="fa fa-times" />
                        Clear Error
                      </button>
                    </>
                  )}
                </span>
              </>
              {/* Search Filter */}

              {tab == "allHouse" && (
                <AllHouse
                  setTab={setTab}
                  houseData={!searchQuery ? houseData : filteredResults}
                  houseError={houseError}
                  isHouseDataLoading={isHouseDataLoading}
                  setGetHouseId={setGetHouseId}
                  handleHouseEdit={handleHouseEdit}
                  handleHouseDelete={handleHouseDelete}
                  searchQuery={searchQuery}
                />
              )}
              {tab == "houseList" && (
                <HouseList
                  houseData={!searchQuery ? houseData : filteredResults}
                  isHouseDataLoading={isHouseDataLoading}
                  handleHouseEdit={handleHouseEdit}
                  handleHouseDelete={handleHouseDelete}
                  searchQuery={searchQuery}
                />
              )}
            </div>

            {showModal && (
              <AddHouse
                dispatchHouse={dispatchHouse}
                indexToEdit={indexToEdit}
                houseIdToEdit={houseIdToEdit}
              />
            )}

            {deleteModal && (
              <DeleteModal
                deleteAction={dispatchHouse}
                iDToDelete={getHouseId}
                modalTitle={"House"}
              />
            )}
          </div>
        </div>
      );
  }

export default Accomodations;
