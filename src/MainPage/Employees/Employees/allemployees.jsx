import React, {useEffect, useState, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import  Addemployee from "../../../_components/modelbox/Addemployee"
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import { setGlobalState, useGlobalState } from '../../../context/GlobalState';
import { add_update_delete_employee } from '../../../utils/sendToServer';
import DefaultImage from "../../../assets/img/placeholder.jpg";
import DeleteModal from '../../../_components/modelbox/DeleteModal';
import { useDataFetching } from '../../../utils/employeeCustomFetchHook';
import "./style.css";
import AllEmployeeList from './allemployee-list';
import { DivContainer } from '../../TaskManagement/style';
import { useSearch } from '../../../utils/Hooks/searchFunctionCustomHook';
import SearchComponent from '../../../_components/searchComponent';
import AllEmployee from './allemployee';

const AllEmployees = () => {
  const [showModal] = useGlobalState("showModal");
  const [deleteModal] = useGlobalState("deleteModal");
  const [tab, setTab] = useState("employeeAll" || "employeeList");
  const [getEmployeeId, setGetEmployeeId] = useState(null)
  const { data, isLoading, error, showSkeleton } = useDataFetching();
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(data);

  const initialUserData = [];


  const [state, dispatchEmployee] = useReducer(
    add_update_delete_employee,
    initialUserData
  );

  useEffect(() => {
    if(!showModal) {
      setGlobalState("selectedEmployeeAccount", "")
    }
  }, [showModal])
  const [menu, setMenu] = useState(false)
 
  const [indexToEdit, setIndexToEdit] = useState();

  const handleAddEmployee = () => {
    setGlobalState("showModal", true);
    setGlobalState("selectedEmployeeAccount", "");
  }

  // Pagination

  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const handleEditEmployee = (id, index) => {
    setGetEmployeeId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showModal", true);
    setGlobalState("selectedEmployeeAccount", data);
  };

  const handleDeleteAcct = (id) => {
    setGetEmployeeId(id);
    setGlobalState("deleteModal", true);
  };

	const toggleMobileMenu = () => {
		setMenu(!menu)
	}

  const [employeeError] = useGlobalState("employeeError");

  const clearErrorMessage = () => {
    setGlobalState("employeeError", "");
  };

  const [isDarkMode] = useGlobalState("isDarkMode", isDarkMode);

  return (
    <DivContainer className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Employee - Peepal Tree HRMS</title>
          <meta name="description" content="Employee page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            {
              <>
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="text-4xl text-orange-500">Employee</h3>
                    <ul className="breadcrumb">
                      <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/main/dashboard">Dashboard</Link>
                      <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Employee</li>
                    </ul>
                  </div>
                  <div className="col-auto float-end ml-auto">
                    <a className="btn add-btn" onClick={handleAddEmployee}>
                      <i className="fa fa-plus" /> Add Employee
                    </a>
                    <div className="view-icons">
                      <a
                        onClick={() => setTab("employeeAll")}
                        className={`grid-view btn btn-link ${
                          tab == `employeeAll` ? `active` : null
                        }`}
                      >
                        <i className="fa fa-th" />
                      </a>
                      <a
                        onClick={() => setTab("employeeList")}
                        className={`list-view btn btn-link ${
                          tab == `employeeList` ? `active` : null
                        }`}
                      >
                        <i className="fa fa-bars" />
                      </a>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
          {/* /Page Header */}
          <>
            {/* Search Filter */}
            <SearchComponent
              searchType={"Employee Name"}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <span style={{ color: "red", fontSize: "0.7rem" }}>
              {employeeError?.length > 0 && (
                <>
                  Error: {employeeError}
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
            {/* Search Filter */}
          </>
          {tab == "employeeAll" && (
            <AllEmployee
              data={!searchQuery ? data : filteredResults}
              isLoading={isLoading}
              showSkeleton={showSkeleton}
              error={error}
              handleEditEmployee={handleEditEmployee}
              handleDeleteAcct={handleDeleteAcct}
              DefaultImage={DefaultImage}
              searchQuery={searchQuery}
            />
          )}
          {tab == "employeeList" && (
            <AllEmployeeList
              handleEditEmployee={handleEditEmployee}
              handleDeleteAcct={handleDeleteAcct}
              DefaultImage={DefaultImage}
              data={!searchQuery ? data : filteredResults}
              isLoading={isLoading}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              searchQuery={searchQuery}
            />
          )}
        </div>
        {showModal && (
          <Addemployee
            dispatchEmployee={dispatchEmployee}
            indexToEdit={indexToEdit}
            getEmployeeId={getEmployeeId}
          />
        )}
        {deleteModal && (
          <DeleteModal
            deleteAction={dispatchEmployee}
            iDToDelete={getEmployeeId}
            modalTitle={"Employee"}
          />
        )}
      </div>
    </DivContainer>
  );
}

export default AllEmployees;
