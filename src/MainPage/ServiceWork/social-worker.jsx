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
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";
import { TableDiv } from "../../_components/modelbox/styles";

const socialworker = () => {
  const { socialWorkerData, socialWorkerLoading } = useSocialWorkerFetching();
  const { residentBoroughData } = useResidentBoroughFetching();
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(socialWorkerData);
  let searchResult = !searchQuery ? socialWorkerData : filteredResults;
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: searchResult?.length,
    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
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

  const [isDarkMode] = useGlobalState("isDarkMode");

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Full Name",
      dataIndex: "first_name",
      render: (text, record, index) => {
        const { first_name, middle_name, last_name } = record;
        return <React.Fragment>{highlightSearchQuery(`${first_name} ${middle_name} ${last_name}`, searchQuery, isDarkMode)}</React.Fragment>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Mobile",
      dataIndex: "mobile_number",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Type",
      dataIndex: "social_worker_type",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Role",
      dataIndex: "social_worker_role",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
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
          return <TableDiv isDarkMode={isDarkMode}>{matchedBorough.borough_name}</TableDiv>;
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
          <meta name="description" content="Resident Social worker page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="text-4xl text-orange-500">Social Worker</h3>
                <ul className="breadcrumb">
                  <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/main/dashboard">Dashboard</Link>
                  <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Social Worker</li>
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
          <SearchComponent
            searchType={"Social Worker"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
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
                  dataSource={searchResult}
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
