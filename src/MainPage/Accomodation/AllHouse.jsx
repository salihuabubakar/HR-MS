import React from 'react'
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/img/placeholder.jpg";

const AllHouse = ({
  houseData,
  houseError,
  isHouseDataLoading,
  showHouseSkeleton,
  setTab, 
  setGetHouseId,
  handleHouseEdit,
  handleHouseDelete
}) => {

  const handleHouseDetailPage = (id) => {
    setTab("houseDetail")
    setGetHouseId(id)
  }

  return (
    <div className="row staff-grid-row">
      {isHouseDataLoading ? (
        <div className="skeleton-container">
          <div className="skeleton-content">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      ) : houseError ? (
        <p>{houseError}</p>
      ) : (
        <>
          {houseData ? (
            <>
              {houseData?.map((house, index) => {
                const { id, photo, name, manager } = house;
                return (
                  <div
                    key={id}
                    className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                  >
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a
                          onClick={() => handleHouseDetailPage(id)}
                          className="avatar"
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "#00000000",
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
                            onClick={() => handleHouseEdit(id, index)}
                          >
                            <i className="fa fa-pencil m-r-5" /> Edit
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={() => handleHouseDelete(id)}
                          >
                            <i className="fa fa-trash-o m-r-5" /> Delete
                          </a>
                        </div>
                      </div>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                        <a onClick={() => handleHouseDetailPage(id)}>{name}</a>
                      </h4>
                      {/* <div className="small text-muted">Manager: {manager}</div>*/}
                    </div>
                  </div>
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
export default AllHouse;