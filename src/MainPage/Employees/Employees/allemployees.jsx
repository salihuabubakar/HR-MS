import React, {useEffect, useState, useMemo, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import  Addemployee from "../../../_components/modelbox/Addemployee"
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import { setGlobalState, useGlobalState } from '../../../context/GlobalState';
import {
  initUserAccount,
  savedUserAccountReducer,
} from "../../../utils/localStorage";
import DefaultImage from "../../../assets/img/placeholder.jpg";
import DeleteModal from '../../../_components/modelbox/DeleteModal';


const AllEmployees = () => {
  const [showModal] = useGlobalState("showModal");
  const [deleteModal] = useGlobalState("deleteModal");

  const [userAcct, dispatchUserAcct] = useReducer(
    savedUserAccountReducer,
    [],
    initUserAccount
  );


  useEffect(() => {
    localStorage.setItem("userAccount", JSON.stringify(userAcct));
  }, [userAcct]);
  useEffect(() => {
    if(!showModal) {
      setGlobalState("selectedUserAccount", "")
    }
  }, [showModal])

  const [employeeAccts, setEmployeeAccts] = useState();
  useEffect(() => {
    setEmployeeAccts(userAcct);
  }, [userAcct]);

  const [menu, setMenu] = useState(false)
 
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [acctIdToEdit, setAcctIdToEdit] = useState("");

  const handleAddEmployee = () => {
    setGlobalState("showModal", true);
    setGlobalState("selectedUserAccount", "");
  }

  const handleEditAcct = (id, index) => {
    setAcctIdToEdit(id);
    setIndexToEdit(index);
    setGlobalState("showModal", true);
    setGlobalState("selectedUserAccount", userAcct);
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

      return (
        <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
          <Header onMenuClick={(value) => toggleMobileMenu()} />
          <Sidebar />
          <div className="page-wrapper">
            <Helmet>
              <title>Employee - HRMS Admin Template</title>
              <meta name="description" content="Login page" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
              {/* Page Header */}
              <div className="page-header">
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
                      <Link
                        to="/app/employee/allemployees"
                        className="grid-view btn btn-link active"
                      >
                        <i className="fa fa-th" />
                      </Link>
                      <Link
                        to="/app/employee/employees-list"
                        className="list-view btn btn-link"
                      >
                        <i className="fa fa-bars" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
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
              {/* Search Filter */}
              <div className="row staff-grid-row">
                {employeeAccts?.map((staff, index) => {
                  const {
                    id,
                    photo,
                    firstName,
                    lastName,
                    role,
                  } = staff;
                  return (
                    <div
                      key={id}
                      className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                    >
                      <div className="profile-widget">
                        <div className="profile-img">
                          <Link
                            to={{
                              pathname: "/app/profile/employee-profile",
                              state: { id: id, index: index },
                            }}
                            className="avatar"
                            style={{
                              borderRadius: "5px",
                              backgroundColor: "#00000000",
                              height: "100%",
                            }}
                          >
                            <img
                              style={{
                                borderRadius: "5px",
                                width: "80px",
                                height: "80px",
                              }}
                              src={
                                photo
                                  ? photo
                                  : DefaultImage
                              }
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="dropdown profile-action">
                          <a
                            className="action-icon dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="material-icons">more_vert</i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a
                              className="dropdown-item"
                              onClick={() => handleEditAcct(staff.id, index)}
                            >
                              <i className="fa fa-pencil m-r-5" /> Edit
                            </a>
                            <a
                              className="dropdown-item"
                              onClick={() => handleDeleteAcct(index)}
                            >
                              <i className="fa fa-trash-o m-r-5" /> Delete
                            </a>
                          </div>
                        </div>
                        <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                          <Link
                            to={{
                              pathname: "/app/profile/employee-profile",
                              state: { id: id, index: index },
                            }}
                          >
                            {firstName + " " + lastName}
                          </Link>
                        </h4>
                        <div className="small text-muted">
                          {role ? role : "--"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {showModal && (
              <Addemployee
                dispatchUserAcct={dispatchUserAcct}
                indexToEdit={indexToEdit}
                acctIdToEdit={acctIdToEdit}
                userAcct={userAcct}
              />
            )}
            {deleteModal && (
              <DeleteModal
                deleteAction={dispatchUserAcct}
                indexToDelete={indexToEdit}
                dispatch={userAcct}
                modalTitle={"Employee"}
              />
            )}
          </div>
        </div>
      );
  }

export default AllEmployees;
