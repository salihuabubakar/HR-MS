import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import {
  useRoleFetching,
} from "../../../utils/employeeCustomFetchHook";
const AllEmployeeList = ({
  DefaultImage,
  handleEditEmployee,
  handleDeleteAcct,
  isLoading,
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const { roleData } = useRoleFetching();

  /**
 * Table Pagination Settings
 *
 * Defines settings for paginating a table, including the current page, start and end counts,
 * and various display options such as total entries, size changer, and custom item rendering.
 *
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
const startCount = (currentPage - 1) * itemsPerPage + 1;
const endCount = startCount + itemsPerPage - 1;

const paginationSettings = {
  total: data?.length,
  showTotal: (total, range) =>
    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
  showSizeChanger: true,
  onShowSizeChange: onShowSizeChange, // Callback for changing items per page
  itemRender: itemRender, // Custom function for rendering pagination items
  current: currentPage, // The current page number
  onChange: setCurrentPage, // Callback for changing the current page
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
      title: "Name",
      render: (text, record, index) => {
        const { id, photo, first_name, middle_name, last_name, role } =
          record;
        const matchedRole = roleData?.find((r) => r.id === role);
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link
                to={`/app/employee/profile/${id}`}
                className="avatar"
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#00000000",
                  height: "100%",
                }}
              >
                <img
                  style={{ width: "40px", height: "40px" }}
                  alt=""
                  src={photo ? photo : DefaultImage}
                />
              </Link>
              <Link
                to={`/app/employee/profile/${id}`}
              >
                {`${first_name} ${middle_name} ${last_name}`}{" "}
                <span>{matchedRole ? matchedRole.role_name : "--"}</span>
              </Link>
            </h2>
          </React.Fragment>
        )
      },
      // sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Employee ID",
      dataIndex: "employee_number",
      // sorter: (a, b) => a.employee_id.length - b.employee_id.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      // sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "Mobile",
      dataIndex: "phone_number",
      // sorter: (a, b) => a.phone_number?.length - b.phone_number?.length,
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
              onClick={() => handleEditEmployee(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            {/* <a
              className="dropdown-item"
              onClick={() => handleDeleteAcct(record.id)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a> */}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <Table
            className="table-striped"
            pagination={paginationSettings}
            style={{ overflowX: "auto" }}
            columns={columns}
            bordered
            dataSource={data}
            rowKey={(data) => data?.id}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default AllEmployeeList;
