import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import DefaultImage from "../../assets/img/placeholder.jpg";
import { useHouseFetching, useDataFetching, } from "../../utils/employeeCustomFetchHook";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";
import NoAvailableData from "../../_components/noAvailableData";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";
import { useGlobalState } from "../../context/GlobalState";
import { Loader } from "../../_components/Loader";

const house = () => {
  const { houseData, isHouseDataLoading, houseError } = useHouseFetching();
  const { data } = useDataFetching();
  const [menu, setMenu] = useState(false);
  /* The code is using the `useSearch` custom hook to implement search functionality in the `house`
  component. */
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(houseData);
  let searchResult = !searchQuery ? houseData : filteredResults;
  // const filteredEmployees = houseEmployeeData?.filter(
  //   (employee) => employee.house === houseId
  // );

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Select House - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="text-4xl text-orange-500">House</h3>
                <ul className="breadcrumb">
                  <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/main/dashboard">Dashboard</Link>
                  <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Houses</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"House Name"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* Search Filter */}
          <div className="row staff-grid-row">
            {isHouseDataLoading ? (
              <Loader />
            ) : houseError ? (
              <p>Error Loading Data</p>
            ) : (
              <>
                {searchResult?.length != 0 || !searchResult ? (
                  searchResult?.map((house) => {
                    const { id, photo, name, manager } = house;
                    return (
                      <div key={id} className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div
                          style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}}
                          className="profile-widget border border-gray-300 rounded-md shadow-md"
                        >
                          <div className="profile-img">
                            <Link
                              to={`/app/shiftschedule/shift-scheduling/${id}`}
                              className="avatar"
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "#00000000",
                                height: "100%",
                                marginRight: "40px",
                              }}
                            >
                              <img
                                style={{
                                  borderRadius: "50px",
                                  width: "80px",
                                  height: "80px",
                                }}
                                alt=""
                                src={photo ? photo : DefaultImage}
                              />
                            </Link>
                          </div>
                          <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                            <Link
                              to={`/app/shiftschedule/shift-scheduling/${id}`}
                            >
                              {highlightSearchQuery(name, searchQuery, isDarkMode)}
                            </Link>
                          </h4>
                          {data?.map((manage) => {
                            if (manager === manage.id)
                              return (
                                <p key={manage.id} className="small text-muted">
                                  {`House Manager: ${manage.first_name} ${manage.middle_name} ${manage.last_name}`}
                                </p>
                              );
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <NoAvailableData />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default house;
