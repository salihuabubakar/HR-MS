import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddSocialWorker from "../../_components/modelbox/AddSocialWorker";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_social_worker } from "../../utils/sendToServer";
import { useSocialWorkerFetching, useResidentBoroughFetching } from "../../utils/employeeCustomFetchHook";
import "./style.css";

const socialworker = () => {
  const { socialWorkerData, socialWorkerLoading } = useSocialWorkerFetching();
  const { residentBoroughData } = useResidentBoroughFetching();
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: socialWorkerData?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  const [showSocialWorkerModal] = useGlobalState("showSocialWorkerModal");
  const [deleteSocialWorkerModal] = useGlobalState("deleteSocialWorkerModal");
  const [socialWorkerError] = useGlobalState("socialWorkerError");

  const clearErrorMessage = () => {
    setGlobalState("socialWorkerError", "");
  };

  const [socialWorkerState, dispatchSocialWorker] = useReducer(
    add_update_delete_social_worker,
    []
  );

  useEffect(() => {
    if (!showSocialWorkerModal) {
      setGlobalState("selectedSocialWorker", "");
    }
  }, [showSocialWorkerModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [socialWorkerId, setSocialWorkerId] = useState("");

  const handleEditSocialWorker = (id, index) => {
    setSocialWorkerId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showSocialWorkerModal", true);
    setGlobalState("selectedSocialWorker", socialWorkerData);
  };

  const handleDeleteSocialWorker = (id) => {
    setSocialWorkerId(id);
    setGlobalState("deleteSocialWorkerModal", true);
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
      title: "First Name",
      dataIndex: "first_name",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Middle Name",
      dataIndex: "middle_name",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile_number",
    },
    {
      title: "Type",
      dataIndex: "social_worker_type",
    },
    {
      title: "Role",
      dataIndex: "social_worker_role",
    },
    {
      title: "Borough",
      dataIndex: "borough",
      render: (text, record, index) => {
        const { borough } = record;
        const matchedBorough = residentBoroughData?.find(
          (b) => b.id === borough
        );
        if (matchedBorough) {
          return <React.Fragment>{matchedBorough.borough_name}</React.Fragment>;
        } else {
          return null; // or return a default value if no match is found
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
            <a
              className="dropdown-item"
              onClick={() => handleEditSocialWorker(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleDeleteSocialWorker(record.id)}
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
          <title>Social Worker - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Social Worker</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Social Worker</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showSocialWorkerModal", true)}
                >
                  <i className="fa fa-plus" /> Add Social Worker
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
                <label className="focus-label">Social Worker ID</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Social Worker Name</label>
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
            {socialWorkerError?.length > 0 && (
              <>
                Error: {socialWorkerError}
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
                  dataSource={socialWorkerData}
                  rowKey={(socialWorker) => socialWorker?.id}
                  loading={socialWorkerLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {showSocialWorkerModal && (
          <AddSocialWorker
            dispatchSocialWorker={dispatchSocialWorker}
            indexToEdit={indexToEdit}
            id={socialWorkerId}
          />
        )}
        {deleteSocialWorkerModal && (
          <DeleteModal
            deleteAction={dispatchSocialWorker}
            iDToDelete={socialWorkerId}
            modalTitle={"Social Worker"}
          />
        )}
      </div>
    </div>
  );
};

export default socialworker;
