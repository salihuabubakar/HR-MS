import React from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { useRoleFetching } from "../../utils/employeeCustomFetchHook";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";
import { useGlobalState } from "../../context/GlobalState";
import { TableDiv } from "../../_components/modelbox/styles";
const AllResidentList = ({
  DefaultImage,
  handleEditResident,
  handleDeleteAcct,
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  isResidentLoading,
  searchQuery
}) => {
  const { roleData } = useRoleFetching();
  const [isDarkMode] = useGlobalState("isDarkMode");

  // Table pagination
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: data?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
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
        const { id, photo, first_name, middle_name, last_name, role_name } =
          record;
        return (
          <React.Fragment>
            <h5 className="table-avatar" style={{ display: 'flex', alignItems: 'center'}}>
              <Link
                className="avatar"
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#00000000",
                  height: "100%",
                }}
                to={`/app/servicework/profile/${id}`}
              >
                <img
                  style={{ width: "40px", height: "40px" }}
                  alt=""
                  src={photo ? photo : DefaultImage}
                />
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <Link
                  to={`/app/servicework/profile/${id}`}
                >
                  {highlightSearchQuery(`${first_name} ${middle_name} ${last_name}`, searchQuery, isDarkMode)}
                </Link>
                <span className="text-sm text-[#625F5C]">{role_name ? role_name : "--"}</span>
              </div>
            </h5>
          </React.Fragment>
        );
      },
      // sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Employee ID",
      render: (text, record, index) => {
        const { employee_number } = record;
        return <TableDiv isDarkMode={isDarkMode}>{employee_number}</TableDiv>;
      },
    },

    {
      title: "Email",
      render: (text, record, index) => {
        const { email } = record;
        return <TableDiv isDarkMode={isDarkMode}>{email}</TableDiv>;
      },
    },

    {
      title: "Mobile",
      render: (text, record, index) => {
        const { phone_number } = record;
        return <TableDiv isDarkMode={isDarkMode}>{phone_number}</TableDiv>;
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
              onClick={() => handleEditResident(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleDeleteAcct(record.id)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
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
            loading={isResidentLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default AllResidentList;
