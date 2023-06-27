import React, {useEffect, useState, useMemo, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import  Addemployee from "../../../_components/modelbox/Addemployee"
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import { setGlobalState, useGlobalState } from '../../../context/GlobalState';
import { add_update_delete_employee } from '../../../utils/sendToServer';
import DefaultImage from "../../../assets/img/placeholder.jpg";
import DeleteModal from '../../../_components/modelbox/DeleteModal';
import { useDataFetching, useDataEdit } from '../../../utils/employeeCustomFetchHook';
import "./style.css";
import AllEmployee from './AllEmployee';
import AllEmployeeList from './AllEmployeeList';
import Profile from './Profile';
import { DivContainer } from '../../TaskManagement/style';
import axios from "axios";
import { BaseUrl } from '../../../utils/baseUrl';


const AllEmployees = () => {
  const [showModal] = useGlobalState("showModal");
  const [deleteModal] = useGlobalState("deleteModal");
  const [tab, setTab] = useState("employeeAll" || "employeeList" || "employeeProfile");
  const [getEmployeeId, setGetEmployeeId] = useState(null)
  const { data, isLoading, error, showSkeleton } = useDataFetching();
  const [getSelectedData, setGetSelectedData] = useState();
  const [isSelectedLoading, setIsSelectedLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchEmployeeSelectedData = async () => {
      try {
        setIsSelectedLoading(true);
        setSkeletonLoading(true);
        const response = await axios.get(
          `${BaseUrl}/employee/detail/${getEmployeeId}?format=json`
        );
        if(isMounted) {
          setGetSelectedData(response.data);
          setIsSelectedLoading(false);
          setSkeletonLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsSelectedLoading(false);
        setSkeletonLoading(false);
      }
    };
    getEmployeeId != null ? fetchEmployeeSelectedData() : null;
    
    return () => {
      isMounted = false;
    };
  }, [getEmployeeId]);
  

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

   const handleDeleteAcct = (index) => {
    setIndexToEdit(index);
    setGlobalState("deleteModal", true);
   };

	const toggleMobileMenu = () => {
		setMenu(!menu)
	  }

    useEffect( ()=>{
      if($('.select').length > 0) {
        $('.select').select2({
          minimumResultsForSearch: -1,
          width: '100%'
        });
      }
    });

    const [employeeError] = useGlobalState("employeeError");

    const clearErrorMessage = () => {
      setGlobalState("employeeError", "");
    };

      return (
        <DivContainer className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
          <Header onMenuClick={(value) => toggleMobileMenu()} />
          <Sidebar />
          <div className="page-wrapper">
            <Helmet>
              <title>Employee - Peepal Tree HRMS</title>
              <meta name="description" content="Login page" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
              {/* Page Header */}
              <div className="page-header">
                {tab == "employeeProfile" ? (
                  <>
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="page-title">Profile</h3>
                        <ul className="breadcrumb breadcrumb-nav">
                          <li className="breadcrumb-item">
                            <a onClick={() => setTab("employeeAll")}>
                              All Employees
                            </a>
                          </li>
                          <li className="breadcrumb-item active">Profile</li>
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">Employee</h3>
                        <ul className="breadcrumb">
                          <li className="breadcrumb-item">
                            <Link to="/app/main/dashboard">Dashboard</Link>
                          </li>
                          <li className="breadcrumb-item active">Employee</li>
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
                )}
              </div>
              {/* /Page Header */}
              {tab != "employeeProfile" ? (
                <>
                  {/* Search Filter */}
                  <div className="row filter-row">
                    <div className="col-sm-6 col-md-4">
                      <div className="form-group form-focus">
                        <input type="text" className="form-control floating" />
                        <label className="focus-label">Employee ID</label>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <div className="form-group form-focus">
                        <input type="text" className="form-control floating" />
                        <label className="focus-label">Employee Name</label>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <a href="#" className="btn btn-success btn-block w-100">
                        {" "}
                        Search{" "}
                      </a>
                    </div>
                  </div>
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
              ) : null}
              {tab == "employeeAll" && (
                <AllEmployee
                  data={data}
                  isLoading={isLoading}
                  showSkeleton={showSkeleton}
                  error={error}
                  handleEditEmployee={handleEditEmployee}
                  handleDeleteAcct={handleDeleteAcct}
                  DefaultImage={DefaultImage}
                  setTab={setTab}
                  setGetEmployeeId={setGetEmployeeId}
                />
              )}
              {tab == "employeeList" && (
                <AllEmployeeList
                  handleEditEmployee={handleEditEmployee}
                  handleDeleteAcct={handleDeleteAcct}
                  DefaultImage={DefaultImage}
                  data={data}
                  isLoading={isLoading}
                  setTab={setTab}
                  setGetEmployeeId={setGetEmployeeId}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
              {tab == "employeeProfile" && (
                <Profile
                  getSelectedData={getSelectedData}
                  DefaultImage={DefaultImage}
                  isSelectedLoading={isSelectedLoading}
                  skeletonLoading={skeletonLoading}
                  getEmployeeId={getEmployeeId}
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
