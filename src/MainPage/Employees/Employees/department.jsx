import React, { useState, useReducer, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import { initDept, savedDeptReducer } from "../../../utils/localStorage";
import AddDepartment from "../../../_components/modelbox/AddDepartment";
import DeleteModal from "../../../_components/modelbox/DeleteModal";

const Department = ({
  departmentData,
  isDepartmentDataLoading,
  add_update_delete_department,
}) => {
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: departmentData?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  const [initialState, dispatchDept] = useReducer(add_update_delete_department, []);
  const [showDeptModal] = useGlobalState("showDeptModal");
  const [deleteDeptModal] = useGlobalState("deleteDeptModal");
  const [indexToEdit, setIndexToEdit] = useState();
  const [deptIdToEdit, setDeptIdToEdit] = useState("");

  useEffect(() => {
    if (!showDeptModal) {
      setGlobalState("selectedDept", "");
      setDeptIdToEdit("");
      setIndexToEdit("");
    }
  }, [showDeptModal]);


  const handleDeptEdit = (id, index) => {
    setDeptIdToEdit(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showDeptModal", true);
    setGlobalState("selectedDept", departmentData);
  };

  const handleDeptDelete = (id) => {
    setDeptIdToEdit(id);
    setGlobalState("deleteDeptModal", true);
  };

  const [departmentError] = useGlobalState("departmentError");

  const clearErrorMessage = () => {
    setGlobalState("departmentError", "");
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
      title: "Department",
      dataIndex: "department_name",
    },
    {
      title: "Description",
      dataIndex: "description",
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
              onClick={() => handleDeptEdit(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleDeptDelete(record.id)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Department</h3>
              <span style={{ color: "red", fontSize: "0.7rem" }}>
                {departmentError?.length > 0 && (
                  <>
                    Error: {departmentError}
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
            </div>
            <div className="col-auto float-end ml-auto">
              <a
                className="btn add-btn"
                onClick={() => setGlobalState("showDeptModal", true)}
              >
                <i className="fa fa-plus" /> Add Department
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={paginationSettings}
                style={{ overflowX: "auto" }}
                columns={columns}
                bordered
                dataSource={departmentData}
                rowKey={(dept) => dept?.id}
                loading={isDepartmentDataLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Department Modal */}
      {showDeptModal && (
        <AddDepartment
          dispatchDept={dispatchDept}
          indexToEdit={indexToEdit}
          deptIdToEdit={deptIdToEdit}
        />
      )}
      {/* /Add Department Modal */}
      {/* Delete Department Modal */}
      {deleteDeptModal && (
        <DeleteModal
          deleteAction={dispatchDept}
          iDToDelete={deptIdToEdit}
          modalTitle={"Department"}
        />
      )}
      {/* /Delete Department Modal */}
    </div>
  );
};

export default Department;
