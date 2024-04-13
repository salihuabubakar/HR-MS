import React, { useState, useReducer, useEffect } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import AddOrganisation from "../../../_components/modelbox/AddOrganisation";
import DeleteModal from "../../../_components/modelbox/DeleteModal";
import { TableDiv } from "../../../_components/modelbox/styles";

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
  const [isDarkMode] = useGlobalState("isDarkMode");

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
      render: (text, record, index) => {
        const { organisation_name } = record;
        return <TableDiv isDarkMode={isDarkMode}>{organisation_name}</TableDiv>;
      },
    },
    {
      title: "Manager",
      render: (text, record, index) => {
        const { manager_name } = record;
        return <TableDiv isDarkMode={isDarkMode}>{manager_name}</TableDiv>;
      },
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      render: (text, record, index) => {
        const { mobile } = record;
        return <TableDiv isDarkMode={isDarkMode}>{mobile}</TableDiv>;
      },
    },
    {
      title: "Office Phone",
      render: (text, record, index) => {
        const { office_phone } = record;
        return <TableDiv isDarkMode={isDarkMode}>{office_phone}</TableDiv>;
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
      title: "City",
      render: (text, record, index) => {
        const { city } = record;
        return <TableDiv isDarkMode={isDarkMode}>{city}</TableDiv>;
      },
    },
    {
      title: "Street",
      render: (text, record, index) => {
        const { street } = record;
        return <TableDiv isDarkMode={isDarkMode}>{street}</TableDiv>;
      },
    },
    {
      title: "Post Code",
      render: (text, record, index) => {
        const { post_code } = record;
        return <TableDiv isDarkMode={isDarkMode}>{post_code}</TableDiv>;
      },
    },
    {
      title: "Country",
      render: (text, record, index) => {
        const { country } = record;
        return <TableDiv isDarkMode={isDarkMode}>{country}</TableDiv>;
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
              <h3 className="text-2xl text-orange-500">Organisation</h3>
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
