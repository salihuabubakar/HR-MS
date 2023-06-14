import React, { useState, useReducer, useEffect } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";

const Status = () => {
  ;

  return (
    <div>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Status Type</h3>
            </div>
            <div className="col-auto float-end ml-auto">
              <a
                className="btn add-btn"
              >
                <i className="fa fa-plus" /> Add Status Type
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          
        </div>
      </div>
    </div>
  );
};

export default Status;
