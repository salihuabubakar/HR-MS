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

const Department = () => {
  const [depts, dispatchDepts] = useReducer(savedDeptReducer, [], initDept);
  const [showModal] = useGlobalState("showModal");
  const [deleteModal] = useGlobalState("deleteModal");

  useEffect(() => {
    localStorage.setItem("dept", JSON.stringify(depts));
  }, [depts]);
  useEffect(() => {
    if(!showModal) {
      setGlobalState("selectedDept", "");
    }
  }, [showModal])

  const [deptList, setDeptList] = useState();
  useEffect(() => {
    setDeptList(depts);
  }, [depts]);

  const [indexToEdit, setIndexToEdit] = useState(0);
  const [deptIdToEdit, setDeptIdToEdit] = useState("");

  const handleDeptEdit = (id, index) => {
    setDeptIdToEdit(id);
    setIndexToEdit(index);
    setGlobalState("showModal", true);
    setGlobalState("selectedDept", depts);
  };

  const handleDeptDelete = (index) => {
    setIndexToEdit(index);
    setGlobalState("deleteModal", true);
  };


  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        return (
          <React.Fragment>
            {index + 1}
          </React.Fragment>
        );
      },
    },
    {
      title: "Department",
      dataIndex: "deptName",
      // sorter: (a, b) => a.name.length - b.name.length,
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
              onClick={() => handleDeptDelete(index)}
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
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showModal", true)}
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
                  pagination={{
                    total: deptList?.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  // bordered
                  dataSource={deptList}
                  rowKey={(dept) => dept.id}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Department Modal */}
        {showModal && (
          <AddDepartment
            dispatchDepts={dispatchDepts}
            indexToEdit={indexToEdit}
            deptIdToEdit={deptIdToEdit}
            depts={depts}
          />
        )}
        {/* /Add Department Modal */}
        {/* Delete Department Modal */}
        {deleteModal && (
          <DeleteModal
            deleteAction={dispatchDepts}
            indexToDelete={indexToEdit}
            dispatch={depts}
            modalTitle={"Department"}
          />
        )}
        {/* /Delete Department Modal */}
    </div>
  );
};

export default Department;
