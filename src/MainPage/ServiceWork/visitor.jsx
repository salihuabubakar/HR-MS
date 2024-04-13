import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddResidentVisitor from "../../_components/modelbox/AddResidentVisitor";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_resident_visitor } from "../../utils/sendToServer";
import {
  useResidentVisitorFetching,
  useResidentFetching,
  useHouseFetching
} from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";
import PopUpText from "../../_components/modelbox/PopUpText";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";
import { TableDiv } from "../../_components/modelbox/styles";

const visitor = () => {
  const { residentVisitorData, residentVisitorLoading } = useResidentVisitorFetching();
  const { residentData } = useResidentFetching();
  const { houseData } = useHouseFetching();
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(residentVisitorData);
  let searchResult = !searchQuery ? residentVisitorData : filteredResults;
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

  const [showResidentVisitorModal] = useGlobalState("showResidentVisitorModal");
  const [deleteResidentVisitorModal] = useGlobalState(
    "deleteResidentVisitorModal"
  );
  const [residentVisitorError] = useGlobalState("residentVisitorError");

  const clearErrorMessage = () => {
    setGlobalState("residentVisitorError", "");
  };

  const [residentVisitorState, dispatchResidentVisitor] = useReducer(
    add_update_delete_resident_visitor,
    []
  );

  useEffect(() => {
    if (!showResidentVisitorModal) {
      setGlobalState("selectedResidentVisitor", "");
    }
  }, [showResidentVisitorModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [residentVisitorId, setResidentVisitorId] = useState("");

  const handleEditResidentVisitor = (id, index) => {
    setResidentVisitorId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showResidentVisitorModal", true);
    setGlobalState("selectedResidentVisitor", residentVisitorData);
  };

  const handleDeleteResidentVisitor = (id) => {
    setResidentVisitorId(id);
    setGlobalState("deleteResidentVisitorModal", true);
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
      title: "Visitor",
      dataIndex: "visitor",
      render: (text, record, index) => {
        return <React.Fragment>{highlightSearchQuery(text, searchQuery, isDarkMode)}</React.Fragment>;
      },
    },
    {
      title: "Visitor Date",
      dataIndex: "visit_date",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{moment(text).format("DD MMM YYYY")}</TableDiv>;
      },
    },
    {
      title: "Visitor Time",
      render: (text, record, index) => {
        const { visit_time } = record;
        return <TableDiv isDarkMode={isDarkMode}>{visit_time}</TableDiv>;
      },
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      render: (text, record, index) => {
        if (text && text) {
          return <TableDiv isDarkMode={isDarkMode}><PopUpText text={text} /></TableDiv>;
        } else {
          return;
        }
      },
    },
    {
      title: "Status",
      render: (text, record, index) => {
        const { status } = record;
        return <TableDiv isDarkMode={isDarkMode}>{status}</TableDiv>;
      },
    },
    {
      title: "Time Left",
      render: (text, record, index) => {
        const { left_time } = record;
        return <TableDiv isDarkMode={isDarkMode}>{left_time}</TableDiv>;
      },
    },
    {
      title: "House",
      dataIndex: "house",
      render: (text, record, index) => {
        const { house } = record;
        const matchedHouse = houseData?.find((h) => h.id === house);
        if (matchedHouse) {
          return <TableDiv isDarkMode={isDarkMode}>{matchedHouse.name}</TableDiv>;
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
            <TableDiv isDarkMode={isDarkMode}>{`${matchedResident.first_name} ${matchedResident.middle_name} ${matchedResident.last_name}`}</TableDiv>
          );
        } else {
          return null; // or return a default value if no match is found
        }
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
      render: (text, record, index) => {
        if (text && text) {
          return <TableDiv isDarkMode={isDarkMode}><PopUpText text={text} /></TableDiv>;
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
            <a
              className="dropdown-item"
              onClick={() => handleEditResidentVisitor(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteResidentVisitor(record.id)}>
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
          <title>Resident Visitor - Peepal Tree HRMS</title>
          <meta name="description" content="Resident Visitor page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="text-4xl text-orange-500">Resident Visitor</h3>
                <ul className="breadcrumb">
                  <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/main/dashboard">Dashboard</Link>
                  <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Resident Visitor</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showResidentVisitorModal", true)}
                >
                  <i className="fa fa-plus" /> Add Resident Visitor
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"Visitor"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {residentVisitorError?.length > 0 && (
              <>
                Error: {residentVisitorError}
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
                  rowKey={(residentVisitor) => residentVisitor?.id}
                  loading={residentVisitorLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {showResidentVisitorModal && (
          <AddResidentVisitor
            dispatchResidentVisitor={dispatchResidentVisitor}
            indexToEdit={indexToEdit}
            id={residentVisitorId}
          />
        )}
        {deleteResidentVisitorModal && (
          <DeleteModal
            deleteAction={dispatchResidentVisitor}
            iDToDelete={residentVisitorId}
            modalTitle={"Resident Visitor"}
          />
        )}
      </div>
    </div>
  );
};

export default visitor;
