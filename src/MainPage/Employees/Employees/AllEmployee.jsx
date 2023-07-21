import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Link } from "react-router-dom";
import { useRoleFetching } from "../../../utils/employeeCustomFetchHook";
import NoAvailableData from "../../../_components/noAvailableData";

const AllEmployee = ({
  DefaultImage,
  handleEditEmployee,
  handleDeleteAcct,
  data,
  isLoading,
  showSkeleton,
  error,
}) => {

  const {roleData} = useRoleFetching();

  const [itemsToShow, setItemsToShow] = useState(16);

  const handleViewMore = () => {
    setItemsToShow(itemsToShow + 16);
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
          {data?.length != 0 || !data ? (
            <>
              {data?.slice(0, itemsToShow)?.map((staff, index) => {
                const { id, photo, first_name, middle_name, last_name, role } = staff;
                return (
                  <React.Fragment key={id}>
                    <div key={id} className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                      <div className="profile-widget">
                        <div className="profile-img">
                          <Link
                            className="avatar"
                            style={{
                              borderRadius: "5px",
                              backgroundColor: "#00000000",
                              height: "100%",
                            }}
                            to={{
                              pathname: "/app/employee/Profile",
                              state: { id: id, index: index },
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
                          </Link>
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
                              onClick={() => handleEditEmployee(id, index)}
                            >
                              <i className="fa fa-pencil m-r-5" /> Edit
                            </a>
                          </div>
                        </div>
                        <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                          <a onClick={() => handleEmployeeProfilePage(id, index)}>
                            {`${first_name} ${middle_name} ${last_name}`}
                          </a>
                        </h4>
                        <div className="small text-muted">
                          {roleData?.map((r) => {
                            if (r.id === role) return r.role_name;
                          })}
                          {!role && "---"}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <>
              <NoAvailableData />
            </>
          )}
        </>
      )}
      {itemsToShow < data?.length && (
        <button className="btn btn-primary col-md-2 mt-3" onClick={handleViewMore}>
          Load More
        </button>
      )}
    </div>
  );
};
export default AllEmployee;
