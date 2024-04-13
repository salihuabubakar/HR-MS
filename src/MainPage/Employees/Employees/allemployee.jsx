import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Link } from "react-router-dom";
import { useRoleFetching } from "../../../utils/employeeCustomFetchHook";
import NoAvailableData from "../../../_components/noAvailableData";
import { highlightSearchQuery } from "../../../utils/highlightSearchQuery";
import { useGlobalState } from "../../../context/GlobalState";
import { Loader } from "../../../_components/Loader";

const AllEmployee = ({
  DefaultImage,
  handleEditEmployee,
  handleDeleteAcct,
  data,
  isLoading,
  showSkeleton,
  error,
  searchQuery,
}) => {

  const {roleData} = useRoleFetching();

  const [itemsToShow, setItemsToShow] = useState(16);

  const handleViewMore = () => {
    setItemsToShow(itemsToShow + 16);
  };

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <div className="row staff-grid-row">
      {isLoading || showSkeleton ? (
        <Loader />
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
                      <div
                        style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}}
                        className="profile-widget border border-gray-300 rounded-md shadow-md"
                      >
                        <div className="profile-img">
                          <Link
                            className="avatar"
                            style={{
                              borderRadius: "5px",
                              backgroundColor: "#00000000",
                              height: "100%",
                            }}
                            to={`/app/employee/profile/${id}`}
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
                          <div 
                            className="dropdown-menu dropdown-menu-right border"
                            style={{ backgroundColor: `${isDarkMode ? 'transparent' : 'white'}`}}
                          >
                            <a
                              className="dropdown-item"
                              onClick={() => handleEditEmployee(id, index)}
                              style={{ color: 'orange'}}
                            >
                              <i className="fa fa-pencil m-r-5" /> Edit
                            </a>
                          </div>
                        </div>
                        <Link
                          to={`/app/employee/profile/${id}`}
                        >
                          {highlightSearchQuery(`${first_name} ${middle_name} ${last_name}`, searchQuery, isDarkMode)}
                        </Link>
                        <div className="text-sm text-[#625F5C]">
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
        <button className="col-md-2 mt-3 bg-transparent text-orange-500 rounded-md p-2" onClick={handleViewMore}>
          Load More
        </button>
      )}
    </div>
  );
};
export default AllEmployee;
