import React, { useEffect, useState, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import AddSalary from '../../_components/modelbox/AddSalary';
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import { initSalary, savedSalaryReducer } from "../../utils/localStorage";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import DefaultImage from "../../assets/img/placeholder.jpg";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../paginationfunction"
import "../antdstyle.css"

const EmployeeSalary = () => {

  const [showSalaryModal] = useGlobalState("showSalaryModal");
  const [deleteModal] = useGlobalState("deleteModal");

  const [salary, dispatchSalary] = useReducer(
    savedSalaryReducer,
    [],
    initSalary
  );

  useEffect(() => {
    localStorage.setItem("staffSalary", JSON.stringify(salary));
  }, [salary]);
  useEffect(() => {
    if (!showSalaryModal) {
      setGlobalState("selectedSalary", "");
    }
  }, [showSalaryModal]);

  const [salaryList, setSalaryList] = useState();
  useEffect(() => {
    setSalaryList(salary);
  }, [salary]);

  const [indexToEdit, setIndexToEdit] = useState(0);

  const handleSalaryEdit = (id, index) => {
    setIndexToEdit(index);
    setGlobalState("showSalaryModal", true);
    setGlobalState("selectedSalary", salary);
  };

  const handleSalaryDelete = (index) => {
    setIndexToEdit(index);
    setGlobalState("deleteModal", true);
  };


  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

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
      dataIndex: "employee",
      render: (text, record, index) => {
        const { id, employee } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link
                onClick={(e) => e.preventDefault()}
                className="avatar"
                data-bs-toggle="tooltip"
                title={employee?.label}
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#00000000",
                  height: "100%",
                }}
              >
                <img
                  style={{
                    width: "30px",
                    borderRadius: "50px",
                    backgroundColor: "#00000000",
                    height: "30px",
                  }}
                  alt=""
                  src={employee?.image ? employee?.image : DefaultImage}
                />
              </Link>
              <Link onClick={(e) => e.preventDefault()}>{employee?.label}</Link>
            </h2>
          </React.Fragment>
        );
      },
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Employee ID",
      dataIndex: "employee",
      render: (text, record) => {
        const { id, employee } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">{employee?.value}</h2>
          </React.Fragment>
        );
      },
      sorter: (a, b) => a.employee_id.length - b.employee_id.length,
    },

    {
      title: "Email",
      dataIndex: "employee",
      render: (text, record) => {
        const { id, employee } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">{employee?.email}</h2>
          </React.Fragment>
        );
      },
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "Join Date",
      dataIndex: "employee",
      render: (text, record) => {
        const { employee } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">{employee?.joinDate}</h2>
          </React.Fragment>
        );
      },
      sorter: (a, b) => a.joindate.length - b.joindate.length,
    },
    {
      title: "Role",
      dataIndex: "employee",
      render: (record) => {
        const { id, designation } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">{designation?.label}</h2>
          </React.Fragment>
        );
      },
    },

    {
      title: "Monthly Pay",
      dataIndex: "salary",
      render: (text, record) => <span>${text}</span>,
      sorter: (a, b) => a.salary.length - b.salary.length,
    },
    {
      title: "Payslip",
      render: (text, record, index) => {
        const { id } = record;
        return (
          <React.Fragment>
            <Link
              to={{
                pathname: "/app/payroll/salary-view",
                state: { id: id, index: index },
              }}
              className="btn btn-sm btn-primary"
            >
              Generate Slip
            </Link>
          </React.Fragment>
        );
      },
    },
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
              onClick={() => handleSalaryEdit(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleSalaryDelete(index)}
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
          <title>Salary - HRMS Admin Template</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Employee Salary</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Salary</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showSalaryModal", true)}
                >
                  <i className="fa fa-plus" /> Add Salary
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee Name</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <select className="select floating">
                  <option value> -- Select -- </option>
                  <option value>Employee</option>
                  <option value={1}>Manager</option>
                </select>
                <label className="focus-label">Role</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <select className="select floating">
                  <option> -- Select -- </option>
                  <option> Pending </option>
                  <option> Approved </option>
                  <option> Rejected </option>
                </select>
                <label className="focus-label">Leave Status</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <div>
                  <input
                    className="form-control floating datetimepicker"
                    type="date"
                  />
                </div>
                <label className="focus-label">From</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <div>
                  <input
                    className="form-control floating datetimepicker"
                    type="date"
                  />
                </div>
                <label className="focus-label">To</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
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
                    total: salaryList?.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={salaryList}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Salary Modal */}
        {showSalaryModal && (
          <AddSalary
            dispatchSalary={dispatchSalary}
            indexToEdit={indexToEdit}
          />
        )}
        {deleteModal && (
          <DeleteModal
            deleteAction={dispatchSalary}
            indexToDelete={indexToEdit}
            dispatch={salary}
            modalTitle={"Salary"}
          />
        )}
      </div>
    </div>
  );
}

export default EmployeeSalary;
