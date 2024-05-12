import React from 'react'
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/img/placeholder.jpg";
import NoAvailableData from '../../_components/noAvailableData';
import { highlightSearchQuery } from '../../utils/highlightSearchQuery';
import { Loader } from '../../_components/Loader';
import { useGlobalState } from '../../context/GlobalState';

const AllHouse = ({
  houseData,
  houseError,
  isHouseDataLoading,
  handleHouseEdit,
  handleHouseDelete,
  searchQuery
}) => {

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <div className="row staff-grid-row">
      {isHouseDataLoading ? (
        <Loader />
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
                    <div 
                      style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}}
                      className="profile-widget border border-gray-300 rounded-md shadow-md">
                      <div className="profile-img">
                        <Link
                          className="avatar"
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "#00000000",
                            height: "100%",
                            marginRight: "40px",
                          }}
                          to={`/app/accomodation/house-details/${id}`}
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
                        <div className="dropdown-menu dropdown-menu-right border">
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
                          to={`/app/accomodation/house-details/${id}`}
                        >
                          {highlightSearchQuery(name, searchQuery, isDarkMode)}
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