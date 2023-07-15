import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import DefaultImage from "../../assets/img/placeholder.jpg";

const HouseList = ({ 
  houseData,
  houseError,
  isHouseDataLoading,
  handleHouseEdit,
  handleHouseDelete,
 }) => {
  


  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        return <React.Fragment>{index + 1}</React.Fragment>;
      },
    },
    {
      title: "House",
      dataIndex: "houseName",
      render: (text, record, index) => {
        const { id, name, photo } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link
                className="avatar"
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#00000000",
                  height: "100%",
                }}
                to={{
                  pathname: "/app/accomodation/HouseDetails",
                  state: { id: id, index: index },
                }}
              >
                <img
                  style={{ width: "40px", height: "40px" }}
                  alt=""
                  src={photo ? photo : DefaultImage}
                />
              </Link>
              <Link
                to={{
                  pathname: "/app/accomodation/HouseDetails",
                  state: { id: id, index: index },
                }}
              >
                {name}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
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
              onClick={() => handleHouseEdit(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleHouseDelete(id)}>
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
            pagination={{
              total: houseData?.length,
              showTotal: (total, range) =>
                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
              showSizeChanger: true,
              onShowSizeChange: onShowSizeChange,
              itemRender: itemRender,
            }}
            style={{ overflowX: "auto" }}
            columns={columns}
            // bordered
            dataSource={houseData}
            rowKey={(house) => house.id}
            loading={isHouseDataLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default HouseList;
