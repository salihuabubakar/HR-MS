import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddResidentIncident from "../../_components/modelbox/AddResidentIncident";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_resident_incident } from "../../utils/sendToServer";
import {
  useResidentIncidentFetching,
  useResidentFetching,
  useHouseFetching,
} from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";

const Incident = () => {
  const { residentIncidentData, residentIncidentLoading } = useResidentIncidentFetching();
  const { residentData } = useResidentFetching();
  const { houseData } = useHouseFetching();
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: residentIncidentData?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  const [showResidentIncidentModal] = useGlobalState(
    "showResidentIncidentModal"
  );
  const [deleteResidentIncidentModal] = useGlobalState(
    "deleteResidentIncidentModal"
  );
  const [residentIncidentError] = useGlobalState("residentIncidentError");

  const clearErrorMessage = () => {
    setGlobalState("residentIncidentError", "");
  };

  const [residentIncidentState, dispatchResidentIncident] = useReducer(
    add_update_delete_resident_incident,
    []
  );

  useEffect(() => {
    if (!showResidentIncidentModal) {
      setGlobalState("selectedResidentIncident", "");
    }
  }, [showResidentIncidentModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [residentIncidentId, setResidentIncidentId] = useState("");

  const handleEditResidentIncident = (id, index) => {
    setResidentIncidentId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showResidentIncidentModal", true);
    setGlobalState("selectedResidentIncident", residentIncidentData);
  };

  const handleDeleteResidentIncident = (id) => {
    setResidentIncidentId(id);
    setGlobalState("deleteResidentIncidentModal", true);
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
      title: "Date & Time",
      dataIndex: "date_time",
      render: (text, record, index) => {
        const { date_time } = record;
        const dateObj = new Date(date_time);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds(); 
        return (
          <React.Fragment>
            {`${moment(dateObj).format(
              "DD MMM YYYY"
            )} - ${hours}:${minutes}:${seconds}`}
          </React.Fragment>
        );
      },
    },
    {
      title: "Document",
      dataIndex: "documents",
    },
    {
      title: "House",
      dataIndex: "house",
      render: (text, record, index) => {
        const { house } = record;
        const matchedHouse = houseData?.find((h) => h.id === house);
        if (matchedHouse) {
          return <React.Fragment>{matchedHouse.name}</React.Fragment>;
        } else {
          return null; // or return a default value if no match is found
        }
      },
    },
    {
      title: "Resident",
      dataIndex: "resident",
      render: (text, record, index) => {
        const { resident } = record;
        const matchedResident = residentData?.find((r) => r.id === resident);
        if (matchedResident) {
          return (
            <React.Fragment>{`${matchedResident.first_name} ${matchedResident.middle_name} ${matchedResident.last_name}`}</React.Fragment>
          );
        } else {
          return null; // or return a default value if no match is found
        }
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record, index) => {
        return (
          <div style={{ width: "100%" }} data-title={text}>
            Hover to show
          </div>
        );
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
            <a
              className="dropdown-item"
              onClick={() => handleEditResidentIncident(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleDeleteResidentIncident(record.id)}
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
          <title>Incident Visitor - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Resident Incident</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Resident Incident</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() =>
                    setGlobalState("showResidentIncidentModal", true)
                  }
                >
                  <i className="fa fa-plus" /> Add Resident Incident
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
                <label className="focus-label">Resident Incident ID</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Resident Incident Name</label>
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
            {residentIncidentError?.length > 0 && (
              <>
                Error: {residentIncidentError}
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
                  pagination={paginationSettings}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  bordered
                  dataSource={residentIncidentData}
                  rowKey={(residentIncident) => residentIncident?.id}
                  loading={residentIncidentLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {showResidentIncidentModal && (
          <AddResidentIncident
            dispatchResidentIncident={dispatchResidentIncident}
            indexToEdit={indexToEdit}
            id={residentIncidentId}
          />
        )}
        {deleteResidentIncidentModal && (
          <DeleteModal
            deleteAction={dispatchResidentIncident}
            iDToDelete={residentIncidentId}
            modalTitle={"Resident Incident"}
          />
        )}
      </div>
    </div>
  );
};

export default Incident;
