import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddResidentMisper from "../../_components/modelbox/AddResidentMisper";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_resident_misper } from "../../utils/sendToServer";
import {
  useResidentMisperFetching,
  useResidentFetching,
  useHouseFetching,
} from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";
import PopUpText from "../../_components/modelbox/PopUpText";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";

const Misper = () => {
  const { residentMisperData, residentMisperLoading } = useResidentMisperFetching();
  const { residentData } = useResidentFetching();
  const { houseData } = useHouseFetching();
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(residentMisperData);
  let searchResult = !searchQuery ? residentMisperData : filteredResults;
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

  const [showResidentMisperModal] = useGlobalState("showResidentMisperModal");
  const [deleteResidentMisperModal] = useGlobalState(
    "deleteResidentMisperModal"
  );
  const [residentMisperError] = useGlobalState("residentMisperError");

  const clearErrorMessage = () => {
    setGlobalState("residentMisperError", "");
  };

  const [residentMisperState, dispatchResidentMisper] = useReducer(
    add_update_delete_resident_misper,
    []
  );

  useEffect(() => {
    if (!showResidentMisperModal) {
      setGlobalState("selectedResidentMisper", "");
    }
  }, [showResidentMisperModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [residentMisperId, setResidentMisperId] = useState("");

  const handleEditResidentMisper = (id, index) => {
    setResidentMisperId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showResidentMisperModal", true);
    setGlobalState("selectedResidentMisper", residentMisperData);
  };

  const handleDeleteResidentMisper = (id) => {
    setResidentMisperId(id);
    setGlobalState("deleteResidentMisperModal", true);
  };

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Resident",
      dataIndex: "resident",
      render: (text, record, index) => {
        const { resident } = record;
        const matchedResident = residentData?.find((r) => r.id === resident);
        if (matchedResident) {
          return <React.Fragment>{highlightSearchQuery(`${matchedResident.first_name} ${matchedResident.middle_name} ${matchedResident.last_name}`,searchQuery)}</React.Fragment>
        } else {
          return null; // or return a default value if no match is found
        }
      },
    },
    {
      title: "Date Last Seen",
      dataIndex: "date_last_seen",
      render: (text, record, index) => {
        const { date_last_seen } = record;
        return <React.Fragment>{moment(date_last_seen).format("DD MMM YYYY")}</React.Fragment>;
      },
    },
    {
      title: "Time Last Seen",
      dataIndex: "time_last_seen",
    },
    {
      title: "Police CAD",
      dataIndex: "police_CAD",
    },
    {
      title: "Police CAD Close",
      dataIndex: "police_CAD_closed",
    },
    {
      title: "Edt Reference",
      dataIndex: "edt_reference",
    },
    {
      title: "Edt Reference Close",
      dataIndex: "edt_reference_closed",
    },
    {
      title: "Date Returned",
      dataIndex: "date_returned",
      render: (text, record, index) => {
        const { date_returned } = record;
        return <React.Fragment>{moment(date_returned).format("DD MMM YYYY")}</React.Fragment>;
      },
    },
    {
      title: "Time Returned",
      dataIndex: "time_returned",
    },
    {
      title: "Status",
      dataIndex: "status",
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
      title: "Reported To",
      dataIndex: "Reported_to",
    },
    {
      title: "Document",
      dataIndex: "documents",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record, index) => {
        if (text && text) {
          return <PopUpText text={text} />;
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
            <a className="dropdown-item" onClick={() => handleEditResidentMisper(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteResidentMisper(record.id)}>
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
          <title>Misper Visitor - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Resident Misper</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Resident Misper</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showResidentMisperModal", true)}
                >
                  <i className="fa fa-plus" /> Add Resident Misper
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"Resident"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {residentMisperError?.length > 0 && (
              <>
                Error: {residentMisperError}
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
                  rowKey={(residentMisper) => residentMisper?.id}
                  loading={residentMisperLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {showResidentMisperModal && (
          <AddResidentMisper
            dispatchResidentMisper={dispatchResidentMisper}
            indexToEdit={indexToEdit}
            id={residentMisperId}
          />
        )}
        {deleteResidentMisperModal && (
          <DeleteModal
            deleteAction={dispatchResidentMisper}
            iDToDelete={residentMisperId}
            modalTitle={"Resident Misper"}
          />
        )}
      </div>
    </div>
  );
};

export default Misper;
