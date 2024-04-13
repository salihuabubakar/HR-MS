import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddBorough from "../../_components/modelbox/AddBorough";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_borough } from "../../utils/sendToServer";
import { useResidentBoroughFetching } from "../../utils/employeeCustomFetchHook";
import "./style.css";
import PopUpText from "../../_components/modelbox/PopUpText";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";
import { TableDiv } from "../../_components/modelbox/styles";

const borough = () => {
  const { residentBoroughData, isResidentBoroughLoading } = useResidentBoroughFetching();
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(residentBoroughData);
  let searchResult = !searchQuery ? residentBoroughData : filteredResults;
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

const [showBoroughModal] = useGlobalState("showBoroughModal");
const [deleteBoroughModal] = useGlobalState("deleteBoroughModal");
const [boroughError] = useGlobalState("boroughError");

const clearErrorMessage = () => {
  setGlobalState("boroughError", "");
};

const [boroughState, dispatchBorough] = useReducer(
  add_update_delete_borough,
  []
);

useEffect(() => {
  if (!showBoroughModal) {
    setGlobalState("selectedBorough", "");
  }
}, [showBoroughModal]);

const [menu, setMenu] = useState(false);
const [indexToEdit, setIndexToEdit] = useState();
const [boroughId, setBoroughId] = useState("");

const handleEditBorough = (id, index) => {
  setBoroughId(id);
  setIndexToEdit((currentPage - 1) * itemsPerPage + index);
  setGlobalState("showBoroughModal", true);
  setGlobalState("selectedBorough", residentBoroughData);
};

const handleDeleteBorough = (id) => {
  setBoroughId(id);
  setGlobalState("deleteBoroughModal", true);
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
      title: "Name",
      dataIndex: "borough_name",
      render: (text, record, index) => {
        return <React.Fragment>{highlightSearchQuery(text, searchQuery, isDarkMode)}</React.Fragment>;
      },
    },
    {
      title: "Team",
      dataIndex: "borough_team",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Street",
      dataIndex: "borough_street",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "City",
      dataIndex: "borough_city",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },

    {
      title: "Post Code",
      dataIndex: "borough_postcode",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Contact Name",
      dataIndex: "contact_name",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Contact Email",
      dataIndex: "contact_email",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Contact Position",
      dataIndex: "contact_position",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Contact Mobile",
      dataIndex: "borough_phone_number",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Out Of Hours No",
      dataIndex: "Out_of_hours_number",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Description",
      dataIndex: "borough_description",
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
            <a className="dropdown-item" onClick={() => handleEditBorough(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteBorough(record.id)}>
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
          <title>Borough - Peepal Tree HRMS</title>
          <meta name="description" content="Borough page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="text-4xl text-orange-500">Borough</h3>
                <ul className="breadcrumb">
                  <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/main/dashboard">Dashboard</Link>
                  <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Borough</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a className="btn add-btn" onClick={() => setGlobalState("showBoroughModal", true)}>
                  <i className="fa fa-plus" /> Add Borough
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"Borough"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {boroughError?.length > 0 && (
              <>
                Error: {boroughError}
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
                  rowKey={(borough) => borough?.id}
                  loading={isResidentBoroughLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {showBoroughModal && (
          <AddBorough dispatchBorough={dispatchBorough} indexToEdit={indexToEdit} id={boroughId} />
        )}
        {deleteBoroughModal && (
          <DeleteModal
            deleteAction={dispatchBorough}
            iDToDelete={boroughId}
            modalTitle={"Borough"}
          />
        )}
      </div>
    </div>
  );
};

export default borough;
