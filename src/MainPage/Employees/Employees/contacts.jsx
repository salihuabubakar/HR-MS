import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { useSearch } from "../../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../../_components/searchComponent";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { 
  useDataFetching, 
  useResidentFetching, 
  useOrganisationFetching,
  useResidentBoroughFetching,
  useSocialWorkerFetching,
  useHouseFetching 
} from "../../../utils/employeeCustomFetchHook";

const Contacts = () => {
  const { data: allEmployee, isLoading } = useDataFetching();
  const { residentData, isResidentLoading } = useResidentFetching();
  const { socialWorkerData, socialWorkerLoading } = useSocialWorkerFetching();
  const { houseData, isHouseDataLoading } = useHouseFetching();
  const { organisationData, isOrganisationDataLoading } = useOrganisationFetching();
  const { residentBoroughData, isResidentBoroughLoading } = useResidentBoroughFetching();
  
  /**
 * Employee Search and Result Handling
 *
 * Manages the search functionality for employees using the custom hook 'useSearch'
 * and handles the resulting filtered employee data.
 *
 * @constant {string} empSearch - The current search query for employees.
 * @constant {function} empSetSearch - Function to set the search query for employees.
 * @constant {function} empHandleSearch - Function to handle the search process for employees.
 * @constant {Array} empResult - Array of employees filtered based on the search query.
 * @constant {Array} empSearchResult - The final result of employee data based on search query.
 */
  const {
    searchQuery: empSearch,
    setSearchQuery: empSetSearch,
    handleSearch: empHandleSearch,
    filteredResults: empResult
  } = useSearch(allEmployee);

  // Determine the final result of employee data based on the search query
  let empSearchResult = !empSearch ? allEmployee : empResult;


  const { searchQuery: resSearch, setSearchQuery: resSetSearch, handleSearch: resHandleSearch, filteredResults: resResult} = useSearch(residentData);
  let resSearchResult = !resSearch ? residentData : resResult;

  const { searchQuery: socSearch, setSearchQuery: socSetSearch, handleSearch: socHandleSearch, filteredResults: socResult} = useSearch(socialWorkerData);
  let socSearchResult = !socSearch ? socialWorkerData : socResult;

  const { searchQuery: houSearch, setSearchQuery: houSetSearch, handleSearch: houHandleSearch, filteredResults: houResult} = useSearch(houseData);
  let houSearchResult = !houSearch ? houseData : houResult;

  const { searchQuery: orgSearch, setSearchQuery: orgSetSearch, handleSearch: orgHandleSearch, filteredResults: orgResult} = useSearch(organisationData);
  let orgSearchResult = !orgSearch ? organisationData : orgResult;

  const { searchQuery: borSearch, setSearchQuery: borSetSearch, handleSearch: borHandleSearch, filteredResults: borResult} = useSearch(residentBoroughData);
  let borSearchResult = !borSearch ? residentBoroughData : borResult;



  /**
 * Table Pagination Settings Generator
 *
 * Generates pagination settings for a table based on the provided data length,
 * including the number of items per page, the current page, and various display options.
 *
 * @function paginationSettings
 * @param {number} dataLength - The total number of items in the data.
 * @returns {Object} - Configuration object for table pagination.
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

const paginationSettings = (dataLength) => {
  return {
    total: dataLength?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange, // Callback for changing items per page
    itemRender: itemRender, // Custom function for rendering pagination items
    current: currentPage, // The current page number
    onChange: setCurrentPage, // Callback for changing the current page
  };
};

  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState("employee" || "resident" || "social-worker" || "house" || "organisation" || "borough");

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  let actualIndex;
  const employeeColumns = [
    {
      title: "#",
      render: (text, record, index) => {
        actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Name",
      render: (text, record, index) => {
        const { first_name, middle_name, last_name } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link
                to="#" onClick={(e) => e.preventDefault()}
              >
                {`${first_name} ${middle_name} ${last_name}`}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
  ];

  const residentColumns = [
    {
      title: "#",
      render: (text, record, index) => {
        actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Name",
      render: (text, record, index) => {
        const { first_name, middle_name, last_name } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link
                to="#" onClick={(e) => e.preventDefault()}
              >
                {`${first_name} ${middle_name} ${last_name}`}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
  ];

  const socialWorkerColumns = [
    {
      title: "#",
      render: (text, record, index) => {
        const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Name",
      render: (text, record, index) => {
        const { first_name, middle_name, last_name } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link
                to="#" onClick={(e) => e.preventDefault()}
              >
                {`${first_name} ${middle_name} ${last_name}`}
              </Link>
            </h2>
          </React.Fragment>
        );
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
  ];

  const houseColumns = [
    {
      title: "#",
      render: (text, record, index) => {
        const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "House name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
  ];

  const organisationColumns = [
    {
      title: "#",
      render: (text, record, index) => {
        const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Organisation",
      dataIndex: "organisation_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Office Phone",
      dataIndex: "office_phone",
    }
  ];

  const boroughColumns = [
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
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Contact Name",
      dataIndex: "contact_name",
    },
    {
      title: "Contact Email",
      dataIndex: "contact_email",
    },
    {
      title: "Contact Mobile",
      dataIndex: "borough_phone_number",
    },
  ];

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Contact - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Contact</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Contact</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          {tab === "employee" && (
            <SearchComponent
              searchType={"Employee Contact"}
              searchQuery={empSearch}
              handleSearch={empHandleSearch}
              setSearchQuery={empSetSearch}
            />
          )}
          {tab === "resident" && (
            <SearchComponent
              searchType={"Resident Contact"}
              searchQuery={resSearch}
              handleSearch={resHandleSearch}
              setSearchQuery={resSetSearch}
            />
          )}
          {tab === "social-worker" && (
            <SearchComponent
              searchType={"Social worker Contact"}
              searchQuery={socSearch}
              handleSearch={socHandleSearch}
              setSearchQuery={socSetSearch}
            />
          )}
          {tab === "house" && (
            <SearchComponent
              searchType={"House Contact"}
              searchQuery={houSearch}
              handleSearch={houHandleSearch}
              setSearchQuery={houSetSearch}
            />
          )}
          {tab === "organisation" && (
            <SearchComponent
              searchType={"Organisation Contact"}
              searchQuery={orgSearch}
              handleSearch={orgHandleSearch}
              setSearchQuery={orgSetSearch}
            />
          )}
          {tab === "borough" && (
            <SearchComponent
              searchType={"Borough Contact"}
              searchQuery={borSearch}
              handleSearch={borHandleSearch}
              setSearchQuery={borSetSearch}
            />
          )}
          {/* /Search Filter */}
          <div className="row">
            <div className="col-md-4">
              <div className="contact-cat">             
                <div className="roles-menu">
                  <ul>
                    <li
                      className={
                        `${
                          tab == `employee` ? `active` : null
                        }`
                      }
                      onClick={() => setTab("employee")}
                    >
                      <a>
                        Employee
                      </a>
                    </li>
                    <li
                      className={
                        `${
                          tab == `resident` ? `active` : null
                        }`
                      }
                      onClick={() => setTab("resident")}
                    >
                      <a>
                        Residence
                      </a>
                    </li>
                    <li
                      className={
                        `${
                          tab == `social-worker` ? `active` : null
                        }`
                      }
                      onClick={() => setTab("social-worker")}
                    >
                      <a>
                        Social Worker
                      </a>
                    </li>
                    <li
                      className={
                        `${
                          tab == `house` ? `active` : null
                        }`
                      }
                      onClick={() => setTab("house")}
                    >
                      <a>
                        House
                      </a>
                    </li>
                    <li
                      className={
                        `${
                          tab == `organisation` ? `active` : null
                        }`
                      }
                      onClick={() => setTab("organisation")}
                    >
                      <a>
                        Organisation
                      </a>
                    </li>
                    <li
                      className={
                        `${
                          tab == `borough` ? `active` : null
                        }`
                      }
                      onClick={() => setTab("borough")}
                    >
                      <a>
                        Borough
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              {tab === "employee" && (
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={paginationSettings(empSearchResult)}
                    style={{ overflowX: "auto" }}
                    columns={employeeColumns}
                    bordered
                    dataSource={empSearchResult}
                    rowKey={(employee) => employee?.id}
                    loading={isLoading}
                  />
                </div>
              )}
              {tab === "resident" && (
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={paginationSettings(resSearchResult)}
                    style={{ overflowX: "auto" }}
                    columns={residentColumns}
                    bordered
                    dataSource={resSearchResult}
                    rowKey={(res) => res?.id}
                    loading={isResidentLoading}
                  />
                </div>
              )}
              {tab === "social-worker" && (
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={paginationSettings(socSearchResult)}
                    style={{ overflowX: "auto" }}
                    columns={socialWorkerColumns}
                    bordered
                    dataSource={socSearchResult}
                    rowKey={(soc) => soc?.id}
                    loading={socialWorkerLoading}
                  />
                </div>
              )}
              {tab === "house" && (
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={paginationSettings(houSearchResult)}
                    style={{ overflowX: "auto" }}
                    columns={houseColumns}
                    bordered
                    dataSource={houSearchResult}
                    rowKey={(h) => h?.id}
                    loading={isHouseDataLoading}
                  />
                </div>
              )}
              {tab === "organisation" && (
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={paginationSettings(orgSearchResult)}
                    style={{ overflowX: "auto" }}
                    columns={organisationColumns}
                    bordered
                    dataSource={orgSearchResult}
                    rowKey={(org) => org?.id}
                    loading={isOrganisationDataLoading}
                  />
                </div>
              )}
              {tab === "borough" && (
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={paginationSettings(borSearchResult)}
                    style={{ overflowX: "auto" }}
                    columns={boroughColumns}
                    bordered
                    dataSource={borSearchResult}
                    rowKey={(bro) => bro?.id}
                    loading={isResidentBoroughLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contacts;
