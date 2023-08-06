import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import AddReview from "../../../_components/modelbox/AddReview";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import DeleteModal from "../../../_components/modelbox/DeleteModal";
import { add_update_delete_employee_review } from "../../../utils/sendToServer";
import { useEmployeeReviewFetching, useDataFetching } from "../../../utils/employeeCustomFetchHook";
import moment from "moment";
import PopUpText from "../../../_components/modelbox/PopUpText";
import { useSearch } from "../../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../../_components/searchComponent";
import { handleFileDownload } from "../../../utils/helperFucntions";
import DisplayFileType from "../../../_components/fileExtension";

const Review = () => {

  const { employeeReviewData, isEmployeeReviewDataLoading } = useEmployeeReviewFetching();
  const { data } = useDataFetching();
  const { searchQuery, setSearchQuery, handleSearch, filteredResults} = useSearch(employeeReviewData);
  let reviewData = !searchQuery ? employeeReviewData : filteredResults;
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: reviewData?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  // Checks if the uploaded document contain any of this extentions.
  const regex = /(png|jpg|webp|JPG|PNG)/;

  const [showAddReviewModal] = useGlobalState("showAddReviewModal");
  const [deleteModal] = useGlobalState("deleteModal");

  const [reviewState, dispatchReviewDetails] = useReducer(
    add_update_delete_employee_review,
    []
  );

  useEffect(() => {
    if (!showAddReviewModal) {
      setGlobalState("selectedReviewInfo", "");
    }
  }, [showAddReviewModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [reviewId, setReviewId] = useState("");

  const handleEditReview = (id, index) => {
    setReviewId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showAddReviewModal", true);
    setGlobalState("selectedReviewInfo", employeeReviewData);
  };

  const handleDeleteReview = (id) => {
    setReviewId(id);
    setGlobalState("deleteModal", true);
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const [employeeReviewError] = useGlobalState("employeeReviewError");

  const clearErrorMessage = () => {
    setGlobalState("employeeReviewError", "");
  };

  let actualIndex;

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Employee",
      dataIndex: "employee",
      render: (text, record, index) => {
        const { employee } = record;
        const matchedEmployee = data?.find((e) => e.id === employee);
        if (matchedEmployee) {
          return (
            <React.Fragment>{`${matchedEmployee.first_name} ${matchedEmployee.middle_name} ${matchedEmployee.last_name}`}</React.Fragment>
          );
        } else {
          return null; // or return a default value if no match is found
        }
      },
    },
    {
      title: "Review Type",
      dataIndex: "review_type",
      render: (text, record, index) => {
        const { review_type } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link to="#" onClick={(e) => e.preventDefault()}>
                {review_type}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
    },
    {
      title: "Review Date",
      dataIndex: "review_date",
      render: (text, record, index) => {
        return <React.Fragment>{moment(text).format("DD MMM YYYY")}</React.Fragment>;
      },
    },
    {
      title: "Review Status",
      dataIndex: "reviewStatus",
      render: (text, record, index) => {
        const { review_status } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link to="#" onClick={(e) => e.preventDefault()}>
                {review_status}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
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
      title: "Review Manager",
      dataIndex: "review_manager",
    },
    {
      title: "Review File",
      dataIndex: "review_file",
      render: (text, record, index) => {
        const { review_file } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link to="#" onClick={(e) => e.preventDefault()}>
                {review_file && regex.test(review_file) ? (
                  <img className="img-preview" src={review_file} alt="Preview" />
                ) : !review_file ? null : (
                  <span className="files-icon">
                    <DisplayFileType file={review_file} />
                  </span>
                )}
              </Link>
            </h2>
          </React.Fragment>
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
            {record.review_file && (
              <a className="dropdown-item" onClick={() => handleFileDownload(record.review_file)}>
                <i className="fa fa-download m-r-5" /> Download
              </a>
            )}
            <a className="dropdown-item" onClick={() => handleEditReview(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteReview(record.id)}>
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
          <title>Review - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Review</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Review</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showAddReviewModal", true)}
                >
                  <i className="fa fa-plus" /> Add Review
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"Employee Name"}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {employeeReviewError?.length > 0 && (
              <>
                Error: {employeeReviewError}
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
                  dataSource={reviewData}
                  rowKey={(review) => review?.id}
                  loading={isEmployeeReviewDataLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {showAddReviewModal && (
          <AddReview
            dispatchReviewDetails={dispatchReviewDetails}
            indexToEdit={indexToEdit}
            id={reviewId}
          />
        )}
        {deleteModal && (
          <DeleteModal
            deleteAction={dispatchReviewDetails}
            iDToDelete={reviewId}
            modalTitle={"Review"}
          />
        )}
      </div>
    </div>
  );
};

export default Review;
