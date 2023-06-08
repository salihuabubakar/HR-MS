import React, { useState, useEffect, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import AddRole from '../../../_components/modelbox/AddRole';
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import DeleteModal from "../../../_components/modelbox/DeleteModal";

const Role = ({
  roleData,
  roleError,
  isRoleLoading,
  add_update_delete_role,
  departmentData,
}) => {
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: roleData?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  const [state, dispatchRole] = useReducer(add_update_delete_role, []);
  const [showRoleModal] = useGlobalState("showRoleModal");
  const [deleteRoleModal] = useGlobalState("deleteRoleModal");
  const [indexToEdit, setIndexToEdit] = useState();
  const [getRoleId, setGetRoleId] = useState();

  useEffect(() => {
    if (!showRoleModal) {
      setGlobalState("selectedRole", "");
      setGetRoleId("");
      setIndexToEdit("");
    }
  }, [showRoleModal]);

  const handleRoleEdit = (id, index) => {
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGetRoleId(id);
    setGlobalState("showRoleModal", true);
    setGlobalState("selectedRole", roleData);
  };

  const handleRoleDelete = (id) => {
    setGetRoleId(id);
    setGlobalState("deleteRoleModal", true);
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
      dataIndex: "department",
      // sorter: (a, b) => a.department.length - b.department.length,
    },
    {
      title: "Role",
      dataIndex: "role_name",
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
              onClick={() => handleRoleEdit(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleRoleDelete(record.id)}
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
              <h3 className="page-title">Role</h3>
            </div>
            <div className="col-auto float-end ml-auto">
              <a
                className="btn add-btn"
                onClick={() => setGlobalState("showRoleModal", true)}
              >
                <i className="fa fa-plus" /> Add Role
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
                dataSource={roleData}
                rowKey={(role) => role?.id}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Designation Modal */}
      {showRoleModal && (
        <AddRole
          dispatchRole={dispatchRole}
          indexToEdit={indexToEdit}
          roleIdToEdit={getRoleId}
          departmentData={departmentData}
        />
      )}
      {/* /Add Designation Modal */}
      {deleteRoleModal && (
        <DeleteModal
          deleteAction={dispatchRole}
          iDToDelete={getRoleId}
          modalTitle={"Role"}
        />
      )}
      {/* /Delete Department Modal */}
    </div>
  );
};

export default Role;
