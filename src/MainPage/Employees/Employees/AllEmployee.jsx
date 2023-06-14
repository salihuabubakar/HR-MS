import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Link } from "react-router-dom";
import { useRoleFetching } from "../../../utils/employeeCustomFetchHook";

const AllEmployee = ({
  DefaultImage,
  handleEditEmployee,
  handleDeleteAcct,
  data,
  isLoading,
  showSkeleton,
  error,
  setTab,
  setGetEmployeeId,
}) => {

  const {roleData} = useRoleFetching();


  

  const handleEmployeeProfilePage = (id, index) => {
    setTab("employeeProfile");
    setGetEmployeeId(id);
  };
  return (
    <div className="row staff-grid-row">
      {isLoading || showSkeleton ? (
        <div className="skeleton-container">
          <div className="skeleton-content">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {data ? (
            <>
              {data?.map((staff, index) => {
                const {
                  id,
                  photo,
                  first_name,
                  middle_name,
                  last_name,
                  role,
                } = staff;
                return (
                  <React.Fragment key={id}>
                    {roleData?.map((r, index) => {
                      if(r.id === role) {
                        return (
                          <div
                            key={id}
                            className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                          >
                            <div className="profile-widget">
                              <div className="profile-img">
                                <a
                                  onClick={() =>
                                    handleEmployeeProfilePage(id, index)
                                  }
                                  className="avatar"
                                  style={{
                                    borderRadius: "5px",
                                    backgroundColor: "#00000000",
                                    height: "100%",
                                  }}
                                >
                                  <img
                                    style={{
                                      borderRadius: "5px",
                                      width: "80px",
                                      height: "80px",
                                    }}
                                    src={photo ? photo : DefaultImage}
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="dropdown profile-action">
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
                                    onClick={() =>
                                      handleEditEmployee(staff.id, index)
                                    }
                                  >
                                    <i className="fa fa-pencil m-r-5" /> Edit
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    onClick={() => handleDeleteAcct(index)}
                                  >
                                    <i className="fa fa-trash-o m-r-5" /> Delete
                                  </a>
                                </div>
                              </div>
                              <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                                <a
                                  // to={{
                                  //   pathname: "/app/profile/employee-profile",
                                  //   state: { id: id, index: index },
                                  // }}
                                  onClick={() =>
                                    handleEmployeeProfilePage(id, index)
                                  }
                                >
                                  {`${first_name} ${middle_name} ${last_name}`}
                                </a>
                              </h4>
                              <div className="small text-muted">
                                {r.role_name}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <p>No data available</p>
          )}
        </>
      )}
    </div>
  );
};
export default AllEmployee;
