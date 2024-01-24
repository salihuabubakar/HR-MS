import React, { useState, useEffect, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import AddEmpDocTypeModal from '../../../_components/modelbox/AddEmpDocTypeModal';
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import DeleteModal from "../../../_components/modelbox/DeleteModal";
import PopUpText from '../../../_components/modelbox/PopUpText';

const DocType = ({
  employeeDocType,
  isEmployeeDocDataLoading,
  add_update_delete_employee_document_type,
}) => {
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: employeeDocType?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  const [state, dispatchEmpDocType] = useReducer(add_update_delete_employee_document_type, []);
  const [showEmployeeDocumentTypeModal] = useGlobalState("showEmployeeDocumentTypeModal");
  const [deleteEmployeeDocumentTypeModal] = useGlobalState("deleteEmployeeDocumentTypeModal");
  const [indexToEdit, setIndexToEdit] = useState();
  const [getEmpDocTypeId, setGetEmpDocTypeId] = useState();

  useEffect(() => {
    if (!showEmployeeDocumentTypeModal) {
      setGlobalState("selectedEmployeeDocumentType", "");
      setGetEmpDocTypeId("");
      setIndexToEdit("");
    }
  }, [showEmployeeDocumentTypeModal]);

  const handleEmpDocTypeEdit = (id, index) => {
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGetEmpDocTypeId(id);
    setGlobalState("showEmployeeDocumentTypeModal", true);
    setGlobalState("selectedEmployeeDocumentType", employeeDocType);
  };

  const handleEmpDocTypeDelete = (id) => {
    setGetEmpDocTypeId(id);
    setGlobalState("deleteEmployeeDocumentTypeModal", true);
  };

  const [employeeDocumentTypeError] = useGlobalState("employeeDocumentTypeError");
  
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
      title: "Type",
      dataIndex: "document_type",
    },
    {
      title: "Required",
      dataIndex: "required",
      render: (text, record, index) => {
        return <React.Fragment>{text === true ? "True" : "False"}</React.Fragment>
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record, index) => {
        if (text && text) {
          return <PopUpText text={text} />;
        } else {
          return;
        }
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
            <a className="dropdown-item" onClick={() => handleEmpDocTypeEdit(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleEmpDocTypeDelete(record.id)}>
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
              <h3 className="page-title">Document Type</h3>
              <span style={{ color: "red", fontSize: "0.7rem" }}>
                {employeeDocumentTypeError?.length > 0 && (
                  <>
                    Error: {employeeDocumentTypeError}
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
              <a className="btn add-btn" onClick={() => setGlobalState("showEmployeeDocumentTypeModal", true)}>
                <i className="fa fa-plus" /> Add Document Type
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
                dataSource={employeeDocType}
                rowKey={(docType) => docType?.id}
                loading={isEmployeeDocDataLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Designation Modal */}
      {showEmployeeDocumentTypeModal && (
        <AddEmpDocTypeModal
          dispatchEmpDocType={dispatchEmpDocType}
          indexToEdit={indexToEdit}
          getEmpDocTypeId={getEmpDocTypeId}
        />
      )}
      {/* /Add Designation Modal */}
      {deleteEmployeeDocumentTypeModal && (
        <DeleteModal deleteAction={dispatchEmpDocType} iDToDelete={getEmpDocTypeId} modalTitle={"Document Type"} />
      )}
      {/* /Delete Department Modal */}
    </div>
  );
};

export default DocType;
