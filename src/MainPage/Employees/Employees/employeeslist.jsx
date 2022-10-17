
import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import  Addemployee from "../../../_components/modelbox/Addemployee"
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import {
  initUserAccount,
  savedUserAccountReducer,
  initDesignation,
  savedDesignationReducer
} from "../../../utils/localStorage";
import SmileImg from "../../../assets/img/smile.png";
import Select from "react-select";

const Employeeslist = () => {
  const [desig] = useReducer(
    savedDesignationReducer,
    [],
    initDesignation
  );
  const [desigList, setDesignationList] = useState();
  useEffect(() => {
    setDesignationList(desig);
  }, [desig]);

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
   const [showModal] = useGlobalState("showModal");

   const roles = [];
   desigList?.map((role) => {
     roles.push({ value: role.id, label: role.desigName });
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
  useEffect(() => {
    if (!showModal) {
      setGlobalState("selectedUserAccount", "");
    }
  }, [showModal]);

  const [employeeAccts, setEmployeeAccts] = useState();
  useEffect(() => {
    setEmployeeAccts(userAcct);
  }, [userAcct]);

  const [menu, setMenu] = useState(false); 
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
        
          const columns = [
            {
              title: "Name",
              dataIndex: "name",
              render: (text, record) => (
                <h2 className="table-avatar">
                  <Link to="/app/profile/employee-profile" className="avatar">
                    <img alt="" src={SmileImg} />
                  </Link>
                  <Link to="/app/profile/employee-profile">
                    {record.firstName} {record.lastName}{" "}
                    <span>{record.designation.label}</span>
                  </Link>
                </h2>
              ),
              // sorter: (a, b) => a.name.length - b.name.length,
            },
            {
              title: "Employee ID",
              dataIndex: "employeeId",
              // sorter: (a, b) => a.employee_id.length - b.employee_id.length,
            },

            {
              title: "Email",
              dataIndex: "email",
              // sorter: (a, b) => a.email.length - b.email.length,
            },

            {
              title: "Mobile",
              dataIndex: "phoneNo",
              // sorter: (a, b) => a.phoneNo.length - b.mobile.length,
            },

            {
              title: "Join Date",
              dataIndex: "joinDate",
              // sorter: (a, b) => a.joindate.length - b.joindate.length,
            },
            // {
            //   title: 'Role',
            //   render: (text, record) => (
            //     <div className="dropdown">
            //     <a href="" className="btn btn-white btn-sm btn-rounded dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Web Developer </a>
            //     <div className="dropdown-menu">
            //       <a className="dropdown-item" href="#">Software Engineer</a>
            //       <a className="dropdown-item" href="#">Software Tester</a>
            //       <a className="dropdown-item" href="#">Frontend Developer</a>
            //       <a className="dropdown-item" href="#">UI/UX Developer</a>
            //     </div>
            //   </div>
            //     ),
            // },
            {
              title: "Action",
              render: (text, record, index) => (
                <div className="dropdown dropdown-action text-end">
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
                      onClick={() => handleEditAcct(record.id, index)}
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
              ),
            },
          ];
      return (
        <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
          <Header onMenuClick={(value) => toggleMobileMenu()} />
          <Sidebar />
          <div className="page-wrapper">
            <Helmet>
              <title>Employeeslist - HRMS Admin Template</title>
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
                        className="grid-view btn btn-link"
                      >
                        <i className="fa fa-th" />
                      </Link>
                      <Link
                        to="/app/employee/employees-list"
                        className="list-view btn btn-link active"
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
              {/* /Search Filter */}
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <Table
                      className="table-striped"
                      pagination={{
                        total: employeeAccts?.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      // bordered
                      dataSource={employeeAccts}
                      rowKey={(staff) => staff.id}
                      onChange={console.log("change")}
                    />
                  </div>
                </div>
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

export default Employeeslist;
