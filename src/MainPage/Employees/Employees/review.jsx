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
import {
  initReview,
  savedReviewReducer,
} from "../../../utils/localStorage";
import moment from "moment";
import DefaultImage from "../../../assets/img/placeholder.jpg";

const Review = () => {
  const [showAddReviewModal] = useGlobalState("showAddReviewModal");
  const [deleteModal] = useGlobalState("deleteModal");

  const [reviewDetails, dispatchReviewDetails] = useReducer(
    savedReviewReducer,
    [],
    initReview
  );

  useEffect(() => {
    localStorage.setItem("reviewInfo", JSON.stringify(reviewDetails));
  }, [reviewDetails]);
  useEffect(() => {
    if (!showAddReviewModal) {
      setGlobalState("selectedReviewInfo", "");
    }
  }, [showAddReviewModal]);

  const [reviewList, setReviewList] = useState();
  useEffect(() => {
    setReviewList(reviewDetails);
  }, [reviewDetails]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [acctIdToEdit, setAcctIdToEdit] = useState("");

  const handleEditAcct = (id, index) => {
    setAcctIdToEdit(id);
    setIndexToEdit(index);
    setGlobalState("showAddReviewModal", true);
    setGlobalState("selectedReviewInfo", reviewDetails);
  };

  const handleDeleteAcct = (index) => {
    setIndexToEdit(index);
    setGlobalState("deleteModal", true);
  };

  const handleFileDownload = (fileDetails) => {
    const dataUrlParts = fileDetails.base64File.split(",");
    const base64Data = dataUrlParts[1];
    const mimeType = dataUrlParts[0].split(":")[1].split(";")[0];

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: mimeType,
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileDetails.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        return <React.Fragment>{index + 1}</React.Fragment>;
      },
    },
    {
      title: "Name",
      dataIndex: "employee",
      render: (text, record, index) => {
        const { id, employee } = record;
        return (
          <React.Fragment>
            <h2 key={value} className="table-avatar">
              <Link
                onClick={(e) => e.preventDefault()}
                className="avatar"
                data-bs-toggle="tooltip"
                title={employee?.label}
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#00000000",
                  height: "100%",
                }}
              >
                <img
                  style={{
                    width: "30px",
                    borderRadius: "50px",
                    backgroundColor: "#00000000",
                    height: "30px",
                  }}
                  alt=""
                  src={employee?.image ? employee?.image : DefaultImage}
                />
              </Link>
              <Link onClick={(e) => e.preventDefault()}>
                {employee?.label}{" "}
                <span>{employee?.role ? employee?.role?.label : "--"}</span>
              </Link>
            </h2>
          </React.Fragment>
        );
      },
    },
    {
      title: "Review Type",
      dataIndex: "reviewType",
      render: (text, record, index) => {
        const { id, reviewType } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link onClick={(e) => e.preventDefault()}>
                {reviewType?.label}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
    },

    {
      title: "Description",
      dataIndex: "description",
    },

    {
      title: "Review Date",
      dataIndex: "reviewDate",
      render: (text, record, index) => {
        return (
          <React.Fragment>{moment(text).format("DD MMM YYYY")}</React.Fragment>
        );
      },
    },
    {
      title: "Review Status",
      dataIndex: "reviewStatus",
      render: (text, record, index) => {
        const { id, reviewStatus } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link onClick={(e) => e.preventDefault()}>
                {reviewStatus?.label}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
    },
    {
      title: "Review Manager",
      dataIndex: "reviewManager",
    },
    {
      title: "Review File",
      dataIndex: "reviewFile",
      render: (text, record, index) => {
        const { reviewFile } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link onClick={(e) => e.preventDefault()}>
                {reviewFile.fileName}
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
            <a
              className="dropdown-item"
              onClick={() => handleFileDownload(record.reviewFile)}
            >
              <i className="fa fa-download m-r-5" /> Download
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleEditAcct(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleDeleteAcct(index)}
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
          <title>Employee - Peepal Tree HRMS</title>
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
          <div className="row filter-row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee ID</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee Name</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <a href="#" className="btn btn-success btn-block w-100">
                {" "}
                Search{" "}
              </a>
            </div>
          </div>
          {/* /Search Filter */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  pagination={{
                    total: reviewList?.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  // bordered
                  dataSource={reviewList}
                  rowKey={(review) => review.id}
                />
              </div>
            </div>
          </div>
        </div>

        {showAddReviewModal && (
          <AddReview
            dispatchReviewDetails={dispatchReviewDetails}
            indexToEdit={indexToEdit}
            acctIdToEdit={acctIdToEdit}
            reviewDetails={reviewDetails}
          />
        )}
        {deleteModal && (
          <DeleteModal
            deleteAction={dispatchReviewDetails}
            indexToDelete={indexToEdit}
            dispatch={reviewDetails}
            modalTitle={"Review"}
          />
        )}
      </div>
    </div>
  );
};

export default Review;
