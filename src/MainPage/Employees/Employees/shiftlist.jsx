import React, { useState, useEffect, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import  AddShift from "../../../_components/modelbox/AddShift"
import { useGlobalState, setGlobalState} from '../../../context/GlobalState';
import {
  initShiftList,
  savedShiftListReducer
} from "../../../utils/localStorage";

const ShiftList = () => {

  const [showModal] = useGlobalState("showModal");

    const [menu, setMenu] = useState(false);
    const toggleMobileMenu = () => {
      setMenu(!menu);
    };

  const [shift, dispatchShift] = useReducer(
    savedShiftListReducer,
    [],
    initShiftList
  );
  useEffect(() => {
    localStorage.setItem("shiftList", JSON.stringify(shift));
  }, [shift]);
  useEffect(() => {
    if (!showModal) {
      setGlobalState("selectedShiftList", "");
    }
  }, [showModal]);

  const [shiftList, setShiftList] = useState();
  useEffect(() => {
    setShiftList(shift);
  }, [shift]);


  const [indexToEdit, setIndexToEdit] = useState(0);

    const handleShiftToEdit = (id, index) => {
      setIndexToEdit(index);
      setGlobalState("showModal", true);
      setGlobalState("selectedShiftList", shiftList);
    };

    const handleShiftToDelete = async (index) => {
      dispatchShift({
        type: "delete",
        payload: shift[index],
      });
    };

    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: "Shift Title",
        dataIndex: "title",
      },

      {
        title: "Start Time",
        dataIndex: "startTime",
        render: (time) =>
          new Date(time).toLocaleString().split(" ").splice(1).join(" "),
      },
      {
        title: "End Time",
        dataIndex: "endTime",
        render: (time) =>
          new Date(time).toLocaleString().split(" ").splice(1).join(" "),
      },
      {
        title: "Status",
        render: (text, record) => (
          <div className="action-label">
            <a className="btn btn-white btn-sm btn-rounded" href="#">
              <i className="fa fa-dot-circle-o text-success" /> Active
            </a>
          </div>
        ),
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
                onClick={() => handleShiftToEdit(record.id, index)}
              >
                <i className="fa fa-pencil m-r-5" /> Edit
              </a>
              <a
                className="dropdown-item"
                onClick={() => handleShiftToDelete(index)}
              >
                <i className="fa fa-trash-o m-r-5" /> Delete
              </a>
            </div>
          </div>
        ),
      },
    ];
      
      return (
        <>
          {/* Page Wrapper */}
          <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
            <Header onMenuClick={() => toggleMobileMenu()} />
            <Sidebar />
            <div className="page-wrapper">
              <Helmet>
                <title>Shift List - HRMS Admin Template</title>
                <meta name="description" content="Login page" />
              </Helmet>
              {/* Page Content */}
              <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                  <div className="row">
                    <div className="col">
                      <h3 className="page-title">Shift List</h3>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to="/app/main/dashboard">Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active">Shift List</li>
                      </ul>
                    </div>
                    <div className="col-auto float-end ml-auto">
                      <a
                        className="btn add-btn m-r-5"
                        onClick={() => setGlobalState("showModal", true)}
                      >
                        Add Shifts
                      </a>
                    </div>
                  </div>
                </div>
                {/* /Page Header */}
                {/* Content Starts */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <Table
                        className="table-striped"
                        pagination={{
                          total: shiftList?.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={shiftList}
                        rowKey={(shift) => shift.id}
                      />
                    </div>
                  </div>
                </div>
                {/* /Content End */}
              </div>
              {/* /Page Content */}
            </div>
          </div>
          {/* /Page Wrapper */}
          {/* Add Schedule Modal */}
          {showModal && (
            <AddShift dispatchShift={dispatchShift} indexToEdit={indexToEdit} />
          )}
          {/* /Add Schedule Modal */}
          {/* Delete Shift Modal */}
          <div
            className="modal custom-modal fade"
            id="delete_employee"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>Delete Shift</h3>
                    <p>Are you sure want to delete?</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                        <a
                          href="javascript:void(0);"
                          className="btn btn-primary continue-btn"
                        >
                          Delete
                        </a>
                      </div>
                      <div className="col-6">
                        <a
                          href="javascript:void(0);"
                          data-bs-dismiss="modal"
                          className="btn btn-primary cancel-btn"
                        >
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Delete Employee Modal */}
        </>
      );
   
}

export default ShiftList;
