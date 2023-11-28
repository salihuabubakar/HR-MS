import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Link } from "react-router-dom";
import { useRoleFetching } from "../../utils/employeeCustomFetchHook";
import NoAvailableData from "../../_components/noAvailableData";

const AllResident = ({
  DefaultImage,
  handleEditResident,
  handleDeleteAcct,
  data,
  isLoading,
  error,
}) => {

  const {roleData} = useRoleFetching();

  const [itemsToShow, setItemsToShow] = useState(16);

  const handleViewMore = () => {
    setItemsToShow(itemsToShow + 16);
  };

  return (
    <div className="row staff-grid-row">
      {isLoading ? (
        <div className="skeleton-container">
          <div className="skeleton-content">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      ) : error ? (
        <p>Error Loading Data</p>
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
                              pathname: "/app/servicework/Profile",
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
                              onClick={() => handleEditResident(id, index)}
                            >
                              <i className="fa fa-pencil m-r-5" /> Edit
                            </a>
                            <a className="dropdown-item" onClick={() => handleDeleteAcct(id)}>
                              <i className="fa fa-trash-o m-r-5" /> Delete
                            </a>
                          </div>
                        </div>
                        <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                          <Link
                            to={{
                              pathname: "/app/servicework/Profile",
                              state: { id: id, index: index },
                            }}
                          >{`${first_name} ${middle_name} ${last_name}`}</Link>
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
export default AllResident;
