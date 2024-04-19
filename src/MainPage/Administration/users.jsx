import React, { useState,useEffect, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../paginationfunction"
import "../antdstyle.css"
import "../ServiceWork/style.css";
import  Adduser from "../../_components/modelbox/Adduser"
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import { initUsers, savedUsersReducer } from "../../utils/localStorage";
import DefaultImage from "../../assets/img/placeholder.jpg";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { useSearch } from '../../utils/Hooks/searchFunctionCustomHook';
import SearchComponent from '../../_components/searchComponent';

const Users = () => {

    const [showUsersModal] = useGlobalState("showUsersModal");
    const [deleteModal] = useGlobalState("deleteModal");

    const [users, dispatchUsers] = useReducer(
      savedUsersReducer,
      [],
      initUsers
    );

    const {
      searchQuery,
      setSearchQuery,
      filteredResults,
    } = useSearch(users);

    useEffect(() => {
      localStorage.setItem("users", JSON.stringify(users));
    }, [users]);
    useEffect(() => {
      if (!showUsersModal) {
        setGlobalState("selectedUsers", "");
      }
    }, [showUsersModal]);

    const [usersList, setUsersList] = useState();
    useEffect(() => {
      setUsersList(users);
    }, [users]);

    const [indexToEdit, setIndexToEdit] = useState(0);

    const handleUsersEdit = (id, index) => {
      setIndexToEdit(index);
      setGlobalState("showUsersModal", true);
      setGlobalState("selectedUsers", users);
    };

    const handleUsersDelete = (index) => {
      setIndexToEdit(index);
      setGlobalState("deleteModal", true);
    };

    const [menu, setMenu] = useState(false);
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
        title: "Name",
        dataIndex: "name",
        render: (text, record) => (
          <h2 className="table-avatar">
            <Link
              to="/app/profile/employee-profile"
              onClick={(e) => e.preventDefault()}
              className="avatar"
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
                src={DefaultImage}
              />
            </Link>
            <Link
              to="/app/profile/employee-profile"
              onClick={(e) => e.preventDefault()}
            >
              {record.firstName + " " + record.lastName}{" "}
              <span>{record.role?.label}</span>
            </Link>
          </h2>
        )
      },
      {
        title: "Email",
        dataIndex: "email"
      },

      {
        title: "Company",
        dataIndex: "company",
        render: (text, record) => {
          const { id, company } = record;
          return (
            <React.Fragment>
              <h2>{company?.label}</h2>
            </React.Fragment>
          );
        }
      },
      {
        title: "Role",
        dataIndex: "role",
        render: (text, record) => {
          const { id, role } = record;
          return (
            <React.Fragment>
              <span
                className={
                  role?.label === "Admin"
                    ? "badge bg-inverse-danger"
                    : "badge bg-inverse-success"
                }
              >
                {role?.label}
              </span>
            </React.Fragment>
          );
        }
      },
      {
        title: "Action",
        render: (text, record, index) => (
          <div className="dropdown dropdown-action">
            <a
              href="#"
              className="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="material-icons">more_vert</i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a
                className="dropdown-item"
                onClick={() => handleUsersEdit(record.id, index)}
              >
                <i className="fa fa-pencil m-r-5" /> Edit
              </a>
              <a
                className="dropdown-item"
                onClick={() => handleUsersDelete(index)}
              >
                <i className="fa fa-trash-o m-r-5" /> Delete
              </a>
            </div>
          </div>
        ),
      },
    ];
    const [isDarkMode] = useGlobalState("isDarkMode");
    return (
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <Helmet>
            <title>Users - Peepal Tree HRMS</title>
            <meta name="description" content="User page" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="text-4xl text-orange-500">Users</h3>
                  <ul className="breadcrumb">
                    <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/main/dashboard">Dashboard</Link>
                    <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Users</li>
                  </ul>
                </div>
                <div className="col-auto float-end ml-auto">
                  <a
                    className="btn add-btn"
                    onClick={() => setGlobalState("showUsersModal", true)}
                  >
                    <i className="fa fa-plus" /> Add User
                  </a>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <SearchComponent
              searchType={"Users"}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {/* /Search Filter */}
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={{
                      total: usersList?.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    bordered
                    dataSource={usersList}
                    rowKey={(record) => record.id}
                    // onChange={this.handleTableChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Page Content */}
          {showUsersModal && (
            <Adduser dispatchUsers={dispatchUsers} indexToEdit={indexToEdit} />
          )}
          {deleteModal && (
            <DeleteModal
              deleteAction={dispatchUsers}
              indexToDelete={indexToEdit}
              dispatch={users}
              modalTitle={"User"}
            />
          )}
        </div>
      </div>
    );
  }

export default Users;
