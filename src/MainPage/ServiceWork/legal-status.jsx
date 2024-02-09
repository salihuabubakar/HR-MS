import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddResidentLegalStatusType from "../../_components/modelbox/AddResidentLegalStatusType";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_resident_legal_status_type } from "../../utils/sendToServer";
import { useResidentLegalStatusTypeFetching } from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";
import PopUpText from "../../_components/modelbox/PopUpText";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";

const legalStatus = () => {
  const { residentLegalStatusTypeData, residentLegalStatusTypeLoading } =
    useResidentLegalStatusTypeFetching();
    const { searchQuery, setSearchQuery,filteredResults } = useSearch(residentLegalStatusTypeData);
    let searchResult = !searchQuery ? residentLegalStatusTypeData : filteredResults;
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

  const [showResidentLegalStatusTypeModal] = useGlobalState(
    "showResidentLegalStatusTypeModal"
  );
  const [deleteResidentLegalStatusTypeModal] = useGlobalState(
    "deleteResidentLegalStatusTypeModal"
  );
  const [residentLegalStatusTypeError] = useGlobalState(
    "residentLegalStatusTypeError"
  );

  const clearErrorMessage = () => {
    setGlobalState("residentLegalStatusTypeError", "");
  };

  const [residentLegalStatusTypeState, dispatchResidentLegalStatusType] = useReducer(
    add_update_delete_resident_legal_status_type,
    []
  );

  useEffect(() => {
    if (!showResidentLegalStatusTypeModal) {
      setGlobalState("selectedResidentLegalStatusType", "");
    }
  }, [showResidentLegalStatusTypeModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [residentLegalStatusTypeId, setResidentLegalStatusTypeId] = useState("");

  const handleEditResidentLegalStatusType = (id, index) => {
    setResidentLegalStatusTypeId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showResidentLegalStatusTypeModal", true);
    setGlobalState("selectedResidentLegalStatusType", residentLegalStatusTypeData);
  };

  const handleDeleteResidentLegalStatusType = (id) => {
    setResidentLegalStatusTypeId(id);
    setGlobalState("deleteResidentLegalStatusTypeModal", true);
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
      title: "Legal Status Type",
      dataIndex: "legal_status_name",
      render: (text, record, index) => {
        return <React.Fragment>{highlightSearchQuery(text, searchQuery)}</React.Fragment>;
      },
    },
    {
      title: "Description",
      dataIndex: "legal_status_description",
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
            <a
              className="dropdown-item"
              onClick={() => handleEditResidentLegalStatusType(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleDeleteResidentLegalStatusType(record.id)}
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
          <title>Resident Legal Status Type - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Resident Legal Status Type</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Resident Legal Status Type</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showResidentLegalStatusTypeModal", true)}
                >
                  <i className="fa fa-plus" /> Add Resident Legal Status Type
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"Legal Status"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {residentLegalStatusTypeError?.length > 0 && (
              <>
                Error: {residentLegalStatusTypeError}
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
                  rowKey={(residentLegalStatusType) => residentLegalStatusType?.id}
                  bordered
                  loading={residentLegalStatusTypeLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {showResidentLegalStatusTypeModal && (
          <AddResidentLegalStatusType
            dispatchResidentLegalStatusType={dispatchResidentLegalStatusType}
            indexToEdit={indexToEdit}
            id={residentLegalStatusTypeId}
          />
        )}
        {deleteResidentLegalStatusTypeModal && (
          <DeleteModal
            deleteAction={dispatchResidentLegalStatusType}
            iDToDelete={residentLegalStatusTypeId}
            modalTitle={"Resident LegalStatus Type"}
          />
        )}
      </div>
    </div>
  );
};

export default legalStatus;
