import React, { useEffect, useState, useMemo, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import AddResident from "../../_components/modelbox/AddResident";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import { add_update_delete_resident } from "../../utils/sendToServer";
import DefaultImage from "../../assets/img/placeholder.jpg";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import {
  useResidentFetching
} from "../../utils/employeeCustomFetchHook";
import "../Employees/Employees/style.css";
import AllResident from "./allresident";
import AllResidentList from "./allresident-list";
import { DivContainer } from "../TaskManagement/style";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";

const AllServiceWorkers = () => {
  const [showModal] = useGlobalState("showModal");
  const [deleteModal] = useGlobalState("deleteModal");
  const [tab, setTab] = useState("residentAll" || "residentList");
const [getResidentId, setGetResidentId] = useState(null);
const { residentData, isResidentLoading, residentError } =
  useResidentFetching();
const { searchQuery, setSearchQuery, filteredResults } = useSearch(residentData);

const initialUserData = [];

const [state, dispatchResident] = useReducer(
  add_update_delete_resident,
  initialUserData
);

useEffect(() => {
  if (!showModal) {
    setGlobalState("selectedResidentAccount", "");
  }
}, [showModal]);

const [menu, setMenu] = useState(false);

const [indexToEdit, setIndexToEdit] = useState();

const handleAddResident = () => {
  setGlobalState("showModal", true);
  setGlobalState("selectedResidentAccount", "");
};

// Pagination

const itemsPerPage = 10; // Number of items per page
const [currentPage, setCurrentPage] = useState(1);

const handleEditResident = (id, index) => {
  setGetResidentId(id);
  setIndexToEdit((currentPage - 1) * itemsPerPage + index);
  setGlobalState("showModal", true);
  setGlobalState("selectedResidentAccount", residentData);
};

const handleDeleteAcct = (id) => {
  setGetResidentId(id);
  setGlobalState("deleteModal", true);
};


  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const [isResidentError] = useGlobalState("isResidentError");

  const clearErrorMessage = () => {
    setGlobalState("isResidentError", "");
  };

  return (
    <DivContainer className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Resident - Peepal Tree HRMS</title>
          <meta name="description" content="Resident page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <>
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Resident</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Resident</li>
                  </ul>
                </div>
                <div className="col-auto float-end ml-auto">
                  <a className="btn add-btn" onClick={handleAddResident}>
                    <i className="fa fa-plus" /> Add Resident
                  </a>
                  <div className="view-icons">
                    <a
                      onClick={() => setTab("residentAll")}
                      className={`grid-view btn btn-link ${tab == `residentAll` ? `active` : null}`}
                    >
                      <i className="fa fa-th" />
                    </a>
                    <a
                      onClick={() => setTab("residentList")}
                      className={`list-view btn btn-link ${
                        tab == `residentList` ? `active` : null
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
          <>
            <SearchComponent
              searchType={"Resident Name"}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <span style={{ color: "red", fontSize: "0.7rem" }}>
              {isResidentError?.length > 0 && (
                <>
                  Error: {isResidentError}
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
          {tab == "residentAll" && (
            <AllResident
              data={!searchQuery ? residentData : filteredResults}
              isLoading={isResidentLoading}
              error={residentError}
              handleEditResident={handleEditResident}
              handleDeleteAcct={handleDeleteAcct}
              DefaultImage={DefaultImage}
              searchQuery={searchQuery}
            />
          )}
          {tab == "residentList" && (
            <AllResidentList
              handleEditResident={handleEditResident}
              handleDeleteAcct={handleDeleteAcct}
              DefaultImage={DefaultImage}
              data={!searchQuery ? residentData : filteredResults}
              isResidentLoading={isResidentLoading}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              searchQuery={searchQuery}
            />
          )}
        </div>

        {showModal && (
          <AddResident
            dispatchResident={dispatchResident}
            indexToEdit={indexToEdit}
            getResidentId={getResidentId}
          />
        )}
        {deleteModal && (
          <DeleteModal
            deleteAction={dispatchResident}
            iDToDelete={getResidentId}
            modalTitle={"Resident"}
          />
        )}
      </div>
    </DivContainer>
  );
};

export default AllServiceWorkers;
