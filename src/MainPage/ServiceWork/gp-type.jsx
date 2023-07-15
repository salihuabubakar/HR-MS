import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddResidentGpType from "../../_components/modelbox/AddResidentGpType";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_resident_gp_type } from "../../utils/sendToServer";
import { useResidentGpTypeFetching } from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";
import { Popup } from "semantic-ui-react";

const GpType = () => {
  const { residentGpTypeData, residentGpTypeLoading } = useResidentGpTypeFetching();
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: residentGpTypeData?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  const [showResidentGpTypeModal] = useGlobalState("showResidentGpTypeModal");
  const [deleteResidentGpTypeModal] = useGlobalState(
    "deleteResidentGpTypeModal"
  );
  const [residentGpTypeError] = useGlobalState("residentGpTypeError");

  const clearErrorMessage = () => {
    setGlobalState("residentGpTypeError", "");
  };

  const [residentGpTypeState, dispatchResidentGpType] = useReducer(
    add_update_delete_resident_gp_type,
    []
  );

  useEffect(() => {
    if (!showResidentGpTypeModal) {
      setGlobalState("selectedResidentGpType", "");
    }
  }, [showResidentGpTypeModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [residentGpTypeId, setResidentGpTypeId] = useState("");

  const handleEditResidentGpType = (id, index) => {
    setResidentGpTypeId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showResidentGpTypeModal", true);
    setGlobalState("selectedResidentGpType", residentGpTypeData);
  };

  const handleDeleteResidentGpType = (id) => {
    setResidentGpTypeId(id);
    setGlobalState("deleteResidentGpTypeModal", true);
  };

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Gp Type",
      dataIndex: "gp_type_name",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Description",
      dataIndex: "gp_type_description",
      render: (text, record, index) => {
        if (text && text) {
          return (
            <Popup
              mouseEnterDelay={500}
              mouseLeaveDelay={200}
              content={text}
              trigger={<span>Hover to show</span>}
            />
          );
        } else {
          return;
        }
      },
    },
    {
      title: "Action",
      render: (text, record, index) => (
        <div className="dropdown dropdown-action text-end">
          <a
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" onClick={() => handleEditResidentGpType(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteResidentGpType(record.id)}>
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
          <title>Resident Gp Type - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Resident Gp Type</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Resident Gp Type</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showResidentGpTypeModal", true)}
                >
                  <i className="fa fa-plus" /> Add Resident Gp Type
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Resident Gp Type ID</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Resident Gp Type Name</label>
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
            {residentGpTypeError?.length > 0 && (
              <>
                Error: {residentGpTypeError}
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
          {/* /Search Filter */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  style={{ overflowX: "auto" }}
                  pagination={paginationSettings}
                  dataSource={residentGpTypeData}
                  columns={columns}
                  rowKey={(residentGpType) => residentGpType?.id}
                  bordered
                  loading={residentGpTypeLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {showResidentGpTypeModal && (
          <AddResidentGpType
            dispatchResidentGpType={dispatchResidentGpType}
            indexToEdit={indexToEdit}
            id={residentGpTypeId}
          />
        )}
        {deleteResidentGpTypeModal && (
          <DeleteModal
            deleteAction={dispatchResidentGpType}
            iDToDelete={residentGpTypeId}
            modalTitle={"Resident Gp Type"}
          />
        )}
      </div>
    </div>
  );
};

export default GpType;
