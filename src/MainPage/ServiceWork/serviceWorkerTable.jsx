import React, { useEffect, useState, useMemo, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AddResident from "../../_components/modelbox/AddResident";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import {
  initResident,
  savedResidentReducer,
} from "../../utils/localStorage";
import SmileImg from "../../assets/img/smile.png";

const ServiceWorkerTable = () => {
  const [residents, dispatchResidents] = useReducer(
    savedResidentReducer,
    [],
    initResident
  );
  const [showModal] = useGlobalState("showModal");

  useEffect(() => {
    localStorage.setItem("resident", JSON.stringify(residents));
  }, [residents]);
  useEffect(() => {
    if (!showModal) {
      setGlobalState("selectedResident", "");
    }
  }, [showModal]);

  const [residentList, setResidentList] = useState();
  useEffect(() => {
    setResidentList(residents);
  }, [residents]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [residentIdToEdit, setResidentIdToEdit] = useState("");

  const handleResidentEdit = (id, index) => {
    setResidentIdToEdit(id);
    setIndexToEdit(index);
    setGlobalState("showModal", true);
    setGlobalState("selectedResident", residents);
  };

  const handleResidentDelete = async (index) => {
    dispatchResidents({
      type: "delete",
      payload: residents[index],
    });
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      // sorter: (a, b) => adept_id.length - b.dept_id.length,
    },
    {
      title: "Resident",
      dataIndex: "residentName",
      // sorter: (a, b) => a.name.length - b.name.length,
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
              href="#"
              onClick={() => handleDeptEdit(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleDeptDelete(index)}
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
          <title>Department - HRMS Admin Template</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
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
                <a
                  href="#"
                  className="btn add-btn"
                  onClick={() => setGlobalState("showModal", true)}
                >
                  <i className="fa fa-plus" /> Add Resident
                </a>
                <div className="view-icons">
                  <Link
                    to="/app/serviceWork/serviceWorker"
                    className="grid-view btn btn-link"
                  >
                    <i className="fa fa-th" />
                  </Link>
                  <Link
                    to="/app/serviceWork/serviceWorkerTable"
                    className="list-view btn btn-link active"
                  >
                    <i className="fa fa-bars" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  pagination={{
                    total: residentList?.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  // bordered
                  dataSource={residentList}
                  rowKey={(user) => user.id}
                  onChange={console.log("change")}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Department Modal */}
        {showModal && (
          <AddResident
            dispatchResidents={dispatchResidents}
            indexToEdit={indexToEdit}
          />
        )}
        {/* /Add Department Modal */}
        {/* Delete Department Modal */}
        <div
          className="modal custom-modal fade"
          id="delete_department"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Department</h3>
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
        {/* /Delete Department Modal */}
      </div>
    </div>
  );
};

export default ServiceWorkerTable;
