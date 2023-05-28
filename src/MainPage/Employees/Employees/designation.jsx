import React, { useState, useEffect, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import { designations } from '../../../utils/localDate';
import AddDesignation from '../../../_components/modelbox/AddDesignation';
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import { initDesignation, savedDesignationReducer } from "../../../utils/localStorage";
import DeleteModal from "../../../_components/modelbox/DeleteModal";

const Designations = () => {
  const [desig, dispatchDesignation] = useReducer(
    savedDesignationReducer,
    [],
    initDesignation
  );
  const [showDesignationModal] = useGlobalState("showDesignationModal");
  const [deleteDesignationModal] = useGlobalState("deleteDesignationModal");

  useEffect(() => {
    localStorage.setItem("designation", JSON.stringify(desig));
  }, [desig]);
  useEffect(() => {
    if (!showDesignationModal) {
      setGlobalState("selectedDesignation", "");
    }
  }, [showDesignationModal]);

  const [desigList, setDesignationList] = useState();
  useEffect(() => {
    setDesignationList(desig);
  }, [desig]);

  const [indexToEdit, setIndexToEdit] = useState(0);
  const [desigIdToEdit, setDesignationIdToEdit] = useState("");

  const handleDesigEdit = (id, index) => {
    setDesignationIdToEdit(id);
    setIndexToEdit(index);
    setGlobalState("showDesignationModal", true);
    setGlobalState("selectedDesignation", desig);
  };

  const handleDesigDelete = (index) => {
    setIndexToEdit(index);
    setGlobalState("deleteDesignationModal", true);
  };



      const columns = [
        {
          title: "#",
          render: (text, record, index) => {
            return <React.Fragment>{index + 1}</React.Fragment>;
          },
        },
        {
          title: "Department",
          dataIndex: "dept",
          render: (item) => item.label,
          // sorter: (a, b) => a.department.length - b.department.length,
        },
        {
          title: "Designation",
          dataIndex: "desigName",
          // sorter: (a, b) => a.designation.length - b.designation.length,
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
                  onClick={() => handleDesigEdit(record.id, index)}
                >
                  <i className="fa fa-pencil m-r-5" /> Edit
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => handleDesigDelete(index)}
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
                  <h3 className="page-title">Designations</h3>
                </div>
                <div className="col-auto float-end ml-auto">
                  <a
                    className="btn add-btn"
                    onClick={() => setGlobalState("showDesignationModal", true)}
                  >
                    <i className="fa fa-plus" /> Add Designation
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
                      total: desigList?.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    // bordered
                    dataSource={desigList}
                    rowKey={(desig) => desig.id}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Page Content */}
          {/* Add Designation Modal */}
          {showDesignationModal && (
            <AddDesignation
              dispatchDesignation={dispatchDesignation}
              indexToEdit={indexToEdit}
              desigIdToEdit={desigIdToEdit}
              desig={desig}
            />
          )}
          {/* /Add Designation Modal */}
          {deleteDesignationModal && (
            <DeleteModal
              deleteAction={dispatchDesignation}
              indexToDelete={indexToEdit}
              dispatch={desig}
              modalTitle={"Designation"}
            />
          )}
          {/* /Delete Department Modal */}
        </div>
      );
}

export default Designations;
