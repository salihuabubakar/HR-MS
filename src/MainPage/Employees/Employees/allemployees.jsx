import React, {useEffect, useState, useMemo, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import  Addemployee from "../../../_components/modelbox/Addemployee"
import  Editemployee from "../../../_components/modelbox/Editemployee"
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import { staffs, designations } from "../../../utils/localDate";
import { setGlobalState, useGlobalState } from '../../../context/GlobalState';
import { initUserAccount, savedUserAccountReducer } from "../../../utils/localStorage";
import SmileImg from "../../../assets/img/smile.png";
import Select from "react-select";


const AllEmployees = () => {

   const customSelectStyles = {
     option: (provided, state) => ({
       ...provided,
       cursor: "pointer",
       backgroundColor: state.isSelected && "#FF9B44",
       color: state.isSelected && "#262626",
       "&:hover": {
         backgroundColor: "#FF9B44",
         color: "#262626",
       },
     }),
   };

   const [designation, setDesignation] = useState("");

  const roles = [];
  designations?.map((role) => {
    roles.push({ value: role.id, label: role.name });
  });

   const handleRoleChange = (event) => {
     setDesignation(event);
   };


  const [userAcct, dispatchUserAcct] = useReducer(
    savedUserAccountReducer,
    [],
    initUserAccount
  );


  useEffect(() => {
    localStorage.setItem("userAccount", JSON.stringify(userAcct));
  }, [userAcct]);

  const [employeeAccts, setEmployeeAccts] = useState();
  useEffect(() => {
    setEmployeeAccts(userAcct);
  }, [userAcct]);

  const [menu, setMenu] = useState(false)
  const [showModal] = useGlobalState("showModal");
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [acctIdToEdit, setAcctIdToEdit] = useState("");

  const handleEditAcct = (id, index) => {
    setAcctIdToEdit(id);
    setIndexToEdit(index);
    setGlobalState("showModal", true);
    setGlobalState("selectedUserAccount", userAcct);
  };

   const handleDeleteAcct = async (index) => {
     dispatchUserAcct({
       type: "delete",
       payload: userAcct[index],
     });
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
                    <a
                      href="#"
                      className="btn add-btn"
                      onClick={() => setGlobalState("showModal", true)}
                    >
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
                <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">Employee ID</label>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">Employee Name</label>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus select-focus">
                    <Select
                      // defaultValue={
                      //   isEdit()
                      //     ? {
                      //         value: userAcct[indexToEdit].designation.value,
                      //         label: userAcct[indexToEdit].designation.label,
                      //       }
                      //     : "Select Designation"
                      // }
                      onChange={handleRoleChange}
                      options={roles}
                      styles={customSelectStyles}
                      placeholder="Select Designation"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
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
                    company,
                    confirmPassword,
                    dept,
                    designation,
                    email,
                    employeeId,
                    firstName,
                    joinDate,
                    lastName,
                    password,
                    phoneNo,
                    userName,
                  } = staff;
                  return (
                    <div
                      key={id}
                      className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                    >
                      <div className="profile-widget">
                        <div className="profile-img">
                          <Link
                            to="/app/profile/employee-profile"
                            className="avatar"
                          >
                            <img src={SmileImg} alt="" />
                          </Link>
                        </div>
                        <div className="dropdown profile-action">
                          <a
                            href="#"
                            className="action-icon dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="material-icons">more_vert</i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => handleEditAcct(staff.id, index)}
                            >
                              <i className="fa fa-pencil m-r-5" /> Edit
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => handleDeleteAcct(index)}
                            >
                              <i className="fa fa-trash-o m-r-5" /> Delete
                            </a>
                          </div>
                        </div>
                        <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                          <Link to="/app/profile/employee-profile">
                            {firstName + " " + lastName}
                          </Link>
                        </h4>
                        <div className="small text-muted">
                          {designation.label}
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

            <div
              className="modal custom-modal fade"
              id="delete_employee"
              role="dialog"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="form-header">
                      <h3>Delete Employee</h3>
                      <p>Are you sure want to delete?</p>
                    </div>
                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <a href="" className="btn btn-primary continue-btn">
                            Delete
                          </a>
                        </div>
                        <div className="col-6">
                          <a
                            href=""
                            data-bs-dismiss="modal"
                            className="btn btn-primary cancel-btn"
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Delete Employee Modal */}
          </div>
        </div>
      );
  }

export default AllEmployees;
