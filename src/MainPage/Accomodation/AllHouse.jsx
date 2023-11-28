import React from 'react'
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/img/placeholder.jpg";
import NoAvailableData from '../../_components/noAvailableData';

const AllHouse = ({
  houseData,
  houseError,
  isHouseDataLoading,
  handleHouseEdit,
  handleHouseDelete
}) => {

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
        <p>Error Loading Data</p>
      ) : (
        <>
          {houseData?.length != 0 || !houseData ? (
            <>
              {houseData?.map((house, index) => {
                const { id, photo, name, manager } = house;
                return (
                  <div key={id} className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <Link
                          className="avatar"
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "#00000000",
                          }}
                          to={{
                            pathname: "/app/accomodation/HouseDetails",
                            state: { id: id, index: index },
                          }}
                        >
                          <img
                            style={{
                              borderRadius: "50px",
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
                          <a className="dropdown-item" onClick={() => handleHouseEdit(id, index)}>
                            <i className="fa fa-pencil m-r-5" /> Edit
                          </a>
                          <a className="dropdown-item" onClick={() => handleHouseDelete(id)}>
                            <i className="fa fa-trash-o m-r-5" /> Delete
                          </a>
                        </div>
                      </div>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                        <Link
                          to={{
                            pathname: "/app/accomodation/HouseDetails",
                            state: { id: id, index: index },
                          }}
                        >
                          {name}
                        </Link>
                      </h4>
                      {/* <div className="small text-muted">Manager: {manager}</div>*/}
                    </div>
                  </div>
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
    </div>
  );
};
export default AllHouse;