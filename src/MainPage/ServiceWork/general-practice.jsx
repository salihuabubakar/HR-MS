import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddGpractice from "../../_components/modelbox/AddGpractice";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_gPractice } from "../../utils/sendToServer";
import { useGpracticeFetching, useResidentGpTypeFetching } from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";
import PopUpText from "../../_components/modelbox/PopUpText";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";
import { TableDiv } from "../../_components/modelbox/styles";

const Gp = () => {
  const { gPracticeData, isGPracticeDataLoading } = useGpracticeFetching();
  const { residentGpTypeData } = useResidentGpTypeFetching();
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(gPracticeData);
  let searchResult = !searchQuery ? gPracticeData : filteredResults;
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

  const [showGpracticeModal] = useGlobalState("showGpracticeModal");
  const [deleteGpracticeModal] = useGlobalState(
    "deleteGpracticeModal"
  );
  const [gPracticeError] = useGlobalState("gPracticeError");

  const clearErrorMessage = () => {
    setGlobalState("gPracticeError", "");
  };

  const [gPracticeState, dispatchGpractice] = useReducer(
    add_update_delete_gPractice,
    []
  );

  useEffect(() => {
    if (!showGpracticeModal) {
      setGlobalState("selectedGpractice", "");
    }
  }, [showGpracticeModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [gPracticeId, setGpracticeId] = useState("");

  const handleEditGpractice = (id, index) => {
    setGpracticeId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showGpracticeModal", true);
    setGlobalState("selectedGpractice", gPracticeData);
  };

  const handleDeleteGpractice = (id) => {
    setGpracticeId(id);
    setGlobalState("deleteGpracticeModal", true);
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
      dataIndex: "gp_practice_name",
      render: (text, record, index) => {
        return <React.Fragment>{highlightSearchQuery(text, searchQuery, isDarkMode)}</React.Fragment>;
      },
    },
    {
      title: "Phone",
      dataIndex: "gp_practice_phone_number",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Email",
      dataIndex: "gp_practice_email",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Website",
      dataIndex: "gp_practice_website",
      render: (text, record, index) => {
        const { gp_practice_website } = record;
        if(gp_practice_website.includes("https://") || 
            gp_practice_website.includes("http://")
        ) {
          return <TableDiv isDarkMode={isDarkMode}><a href={gp_practice_website} target="_blank">{gp_practice_website}</a></TableDiv>;
        } else {
          return <TableDiv isDarkMode={isDarkMode}><a href={"https://" + gp_practice_website} target="_blank">{"https://" + gp_practice_website}</a></TableDiv>;
        }
      },
    },
    {
      title: "Address",
      dataIndex: "gp_practice_address",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Post Code",
      dataIndex: "gp_practice_postcode",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    {
      title: "Gp Type",
      dataIndex: "gp_practice_type",
      render: (text, record, index) => {
        const { gp_practice_type } = record;
        const matchedGp = residentGpTypeData?.find((r) => r.id === gp_practice_type);
        if (matchedGp) {
          return (
            <TableDiv isDarkMode={isDarkMode}>{`${matchedGp.gp_type_name}`}</TableDiv>
          );
        } else {
          return null; // or return a default value if no match is found
        }
      },
    },
    {
      title: "Description",
      dataIndex: "gp_practice_description",
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
            <a className="dropdown-item" onClick={() => handleEditGpractice(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteGpractice(record.id)}>
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
          <title>Resident Gp - Peepal Tree HRMS</title>
          <meta name="description" content="Gp page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="text-4xl text-orange-500">Gpractice</h3>
                <ul className="breadcrumb">
                  <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/main/dashboard">Dashboard</Link>
                  <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Gpractice</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showGpracticeModal", true)}
                >
                  <i className="fa fa-plus" /> Add Gpractice
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"GP"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {gPracticeError?.length > 0 && (
              <>
                Error: {gPracticeError}
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
                  dataSource={searchResult}
                  columns={columns}
                  rowKey={(residentGpType) => residentGpType?.id}
                  bordered
                  loading={isGPracticeDataLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {showGpracticeModal && (
          <AddGpractice
            dispatchGpractice={dispatchGpractice}
            indexToEdit={indexToEdit}
            id={gPracticeId}
          />
        )}
        {deleteGpracticeModal && (
          <DeleteModal
            deleteAction={dispatchGpractice}
            iDToDelete={gPracticeId}
            modalTitle={"Gpractice"}
          />
        )}
      </div>
    </div>
  );
};

export default Gp;
