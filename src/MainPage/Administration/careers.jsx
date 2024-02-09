import React, { useState, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddCareer from "../../_components/modelbox/AddCareer";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_Career } from "../../utils/sendToServer";
import { useCareerFetching } from "../../utils/employeeCustomFetchHook";
import "../ServiceWork/style.css";
import moment from "moment";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";

const Careers = () => {
  const { careerData, isCareerLoading } = useCareerFetching();
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(careerData);
  let CareerResult = !searchQuery ? careerData : filteredResults;

  /**
 * Table Pagination Settings
 *
 * Defines settings for paginating a table, including the number of items per page,
 * the current page, start and end counts, and various display options.
 *
 * @constant {number} itemsPerPage - Number of items to display per page.
 * @constant {number} currentPage - The current page number.
 * @constant {number} startCount - The starting count of items on the current page.
 * @constant {number} endCount - The ending count of items on the current page.
 * @constant {Object} paginationSettings - Configuration object for table pagination.
 * @property {number} total - The total number of items in the table.
 * @property {function} showTotal - Function to display the total number of items.
 * @property {boolean} showSizeChanger - Flag to show the size changer for items per page.
 * @property {function} onShowSizeChange - Callback function when changing items per page.
 * @property {function} itemRender - Custom function for rendering pagination items.
 * @property {number} current - The current page number.
 * @property {function} onChange - Callback function when changing the current page.
 */
const itemsPerPage = 10; // Number of items per page
const [currentPage, setCurrentPage] = useState(1);
const startCount = (currentPage - 1) * itemsPerPage + 1;
const endCount = startCount + itemsPerPage - 1;

const paginationSettings = {
  total: CareerResult?.length,
  showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
  showSizeChanger: true,
  onShowSizeChange: onShowSizeChange, // Callback for changing items per page
  itemRender: itemRender, // Custom function for rendering pagination items
  current: currentPage, // The current page number
  onChange: setCurrentPage, // Callback for changing the current page
};


  const [showCareerModal] = useGlobalState("showCareerModal");
  const [deleteCareerModal] = useGlobalState("deleteCareerModal");
  const [careerError] = useGlobalState("careerError");

  const clearErrorMessage = () => {
    setGlobalState("careerError", "");
  };

  const [careerState, dispatchCareer] = useReducer(add_update_delete_Career, []);

  useEffect(() => {
    if (!showCareerModal) {
      setGlobalState("selectedCareer", "");
    }
  }, [showCareerModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [careerId, setCareerId] = useState("");

  const handleEditCareer = (id, index) => {
    setCareerId(id);
    /**
    * Set Index to Edit based on Pagination
    *
    * Sets the index to edit, taking into account the current page, items per page,
    * and the index within the current page. Useful for editing items in a paginated table.
    *
    * @function setIndexToEdit
    * @param {number} currentPage - The current page number.
    * @param {number} itemsPerPage - Number of items to display per page.
    * @param {number} index - The index within the current page.
    */
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);

    setGlobalState("showCareerModal", true);
    setGlobalState("selectedCareer", careerData);
  };

  const handleDeleteCareer = (id) => {
    setCareerId(id);
    setGlobalState("deleteCareerModal", true);
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        return <React.Fragment>{index + 1}</React.Fragment>;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record, index) => {
        const { id, title } = record;
        return (
          <React.Fragment>
            <Link
              to={`/app/administration/career-details/${id}`}
            >
              { highlightSearchQuery(title, searchQuery) }
            </Link>
          </React.Fragment>
        );
      },
      // sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Job Type",
      dataIndex: "job_type",
    },
    {
      title: "Date Posted",
      dataIndex: "date_posted",
      render: (text, record, index) => {
        const { date_posted } = record;
        return <React.Fragment>{moment(date_posted).format("DD MMM YYYY")}</React.Fragment>;
      },
    },
    {
      title: "Application Deadline",
      dataIndex: "application_deadline",
      render: (text, record, index) => {
        const { application_deadline } = record;
        return <React.Fragment>{moment(application_deadline).format("DD MMM YYYY")}</React.Fragment>;
      },
    },
    {
      title: "Salary Range",
      dataIndex: "salary_range",
    },
    {
      title: "Years of experience",
      dataIndex: "experience_years",
    },
    {
      title: "Hours",
      dataIndex: "hours",
    },
    {
      title: "Vacancy",
      dataIndex: "vacancy",
    },
    {
      title: "Status",
      dataIndex: "active",
      render: (text, record, index) => {
        const { active } = record;
        return <div 
          className={` badge ${active ? 'bg-inverse-success' : 'bg-inverse-warning' }`}
        >
        { active ? "Active" : "Inactive" }
        </div>;
      },
    },
    {
      title: "Action",
      render: (text, record, index) => (
        <div className="dropdown dropdown-action">
          <a className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" onClick={() => handleEditCareer(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteCareer(record.id)}>
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Page Wrapper */}
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <Helmet>
            <title>Careers - Peepal Tree HRMS</title>
            <meta name="description" content="Login page" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Careers</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Careers</li>
                  </ul>
                </div>
                <div className="col-auto float-end ml-auto">
                  <a
                    className="btn add-btn m-r-5"
                    onClick={() => setGlobalState("showCareerModal", true)}
                  >
                    Add Careers
                  </a>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <SearchComponent
              searchType={"Career"}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <span style={{ color: "red", fontSize: "0.7rem" }}>
              {careerError?.length > 0 && (
                <>
                  Error: {careerError}
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
            {/* Content Starts */}
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={paginationSettings}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    bordered
                    dataSource={CareerResult}
                    rowKey={(Career) => Career?.id}
                    loading={isCareerLoading}
                  />
                </div>
              </div>
            </div>
            {/* /Content End */}
          </div>
          {/* /Page Content */}
        </div>
      </div>
      {/* /Page Wrapper */}
      {showCareerModal && (
        <AddCareer dispatchCareer={dispatchCareer} indexToEdit={indexToEdit} id={careerId} />
      )}
      {deleteCareerModal && (
        <DeleteModal deleteAction={dispatchCareer} iDToDelete={careerId} modalTitle={"Career"} />
      )}
    </>
  );
};

export default Careers;
