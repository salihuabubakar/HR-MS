import React, { useState, useReducer, useEffect } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import AddOrganisation from "../../../_components/modelbox/AddOrganisation";
import DeleteModal from "../../../_components/modelbox/DeleteModal";

const Organisation = ({
  organisationData,
  isOrganisationDataLoading,
  add_update_delete_organisation
}) => {
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: organisationData?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  const [state, dispatchOrganisation] = useReducer(
    add_update_delete_organisation,
    []
  );
  const [showOrganisationModal] = useGlobalState("showOrganisationModal");
  const [deleteOrganisationModal] = useGlobalState("deleteOrganisationModal");
  const [indexToEdit, setIndexToEdit] = useState();
  const [getOrganisationId, setGetOrganisationId] = useState();

  useEffect(() => {
    if (!showOrganisationModal) {
      setGlobalState("selectedOrganisation", "");
      setGetOrganisationId("");
      setIndexToEdit("");
    }
  }, [showOrganisationModal]);

  const handleOrganisationEdit = (id, index) => {
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGetOrganisationId(id);
    setGlobalState("showOrganisationModal", true);
    setGlobalState("selectedOrganisation", organisationData);
  };

  const handleOrganisationDelete = (id) => {
    setGetOrganisationId(id);
    setGlobalState("deleteOrganisationModal", true);
  };

  const [organisationError] = useGlobalState("organisationError");

  const clearErrorMessage = () => {
    setGlobalState("organisationError", "");
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
      title: "Organisation",
      dataIndex: "organisation_name",
    },
    {
      title: "Manager",
      dataIndex: "manager_name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Office Phone",
      dataIndex: "office_phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Street",
      dataIndex: "street",
    },
    {
      title: "Post Code",
      dataIndex: "post_code",
    },
    {
      title: "Country",
      dataIndex: "country",
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
              onClick={() => handleOrganisationEdit(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleOrganisationDelete(index)}
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
              <h3 className="page-title">Organisation</h3>
              <span style={{ color: "red", fontSize: "0.7rem" }}>
                {organisationError?.length > 0 && (
                  <>
                    Error: {organisationError}
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
              <a
                className="btn add-btn"
                onClick={() => setGlobalState("showOrganisationModal", true)}
              >
                <i className="fa fa-plus" /> Add Organisation
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
                dataSource={organisationData}
                rowKey={(org) => org?.id}
                loading={isOrganisationDataLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {showOrganisationModal && (
        <AddOrganisation
          dispatchOrganisation={dispatchOrganisation}
          indexToEdit={indexToEdit}
          getOrganisationId={getOrganisationId}
          organisationData={organisationData}
        />
      )}
      {deleteOrganisationModal && (
        <DeleteModal
          deleteAction={dispatchOrganisation}
          iDToDelete={getOrganisationId}
          modalTitle={"Organisation"}
        />
      )}
    </div>
  );
};

export default Organisation;
