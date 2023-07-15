import React, {useEffect, useState, useMemo, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import Header from '../../initialpage/Sidebar/header'
import Sidebar from '../../initialpage/Sidebar/sidebar'
import { setGlobalState, useGlobalState } from '../../context/GlobalState';
import AddHouse from "../../_components/modelbox/AddHouse";
import DeleteModal from '../../_components/modelbox/DeleteModal';
import HouseDetails from './HouseDetails';
import AllHouse from './AllHouse';
import HouseList from './HouseList';
import { useHouseFetching } from '../../utils/employeeCustomFetchHook';
import { add_update_delete_house } from '../../utils/sendToServer';
import "../Employees/Employees/style.css"


const Accomodations = () => {
  const [tab, setTab] = useState("allHouse" || "houseList");
  const { houseData, houseError, isHouseDataLoading } =
    useHouseFetching();
  const [state, dispatchHouse] = useReducer(add_update_delete_house, []);
  const [showModal] = useGlobalState("showModal");
  const [deleteModal] = useGlobalState("deleteModal");
  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [houseIdToEdit, setHouseIdToEdit] = useState("");
  const [getHouseId, setGetHouseId] = useState();

  useEffect(() => {
    if (!showModal) {
      setGlobalState("selectedHouse", "");
      setHouseIdToEdit("");
      setIndexToEdit("")
    }
  }, [showModal]);

  const handleHouseEdit = (id, index) => {
    setHouseIdToEdit(id);
    setIndexToEdit(index);
    setGlobalState("showModal", true);
    setGlobalState("selectedHouse", houseData);
  };

  const handleHouseDelete = (id) => {
    setGetHouseId(id);
    setGlobalState("deleteModal", true);
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

    useEffect( ()=>{
      if($('.select').length > 0) {
        $('.select').select2({
          minimumResultsForSearch: -1,
          width: '100%'
        });
      }
    }); 
    
    const [isHouseError] = useGlobalState("isHouseError");

    const clearErrorMessage = () => {
      setGlobalState("isHouseError", "");
    };

      return (
        <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
          <Header onMenuClick={(value) => toggleMobileMenu()} />
          <Sidebar />
          <div className="page-wrapper">
            <Helmet>
              <title>Accomodation - Peepal Tree HRMS</title>
              <meta name="description" content="Accomodation page" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
              {/* Page Header */}
              <div className="page-header">
                  <>
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">House</h3>
                        <ul className="breadcrumb">
                          <li className="breadcrumb-item">
                            <Link to="/app/main/dashboard">Dashboard</Link>
                          </li>
                          <li className="breadcrumb-item active">House</li>
                        </ul>
                      </div>
                      <div className="col-auto float-end ml-auto">
                        <a
                          className="btn add-btn"
                          onClick={() => setGlobalState("showModal", true)}
                        >
                          <i className="fa fa-plus" /> Add House
                        </a>
                        <div className="view-icons">
                          <a
                            onClick={() => setTab("allHouse")}
                            className={`grid-view btn btn-link ${
                              tab == `allHouse` ? `active` : null
                            }`}
                          >
                            <i className="fa fa-th" />
                          </a>
                          <a
                            onClick={() => setTab("houseList")}
                            className={`list-view btn btn-link ${
                              tab == `houseList` ? `active` : null
                            }`}
                          >
                            <i className="fa fa-bars" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
              </div>
              {/* /Page Header */}
              {/* Search Filter */}
                <>
                  {/* Search Filter */}
                  <div className="row filter-row">
                    <div className="col-sm-6 col-md-4">
                      <div className="form-group form-focus">
                        <input type="text" className="form-control floating" />
                        <label className="focus-label">House ID</label>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <div className="form-group form-focus">
                        <input type="text" className="form-control floating" />
                        <label className="focus-label">House Name</label>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <a href="#" className="btn btn-success btn-block w-100">
                        {" "}
                        Search{" "}
                      </a>
                    </div>
                  </div>
                  <span style={{ color: "red", fontSize: "0.7rem" }}>
                    {isHouseError?.length > 0 && (
                      <>
                        Error: {isHouseError}
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
                  {/* Search Filter */}
                </>
              {/* Search Filter */}

              {tab == "allHouse" && (
                <AllHouse
                  setTab={setTab}
                  houseData={houseData}
                  houseError={houseError}
                  isHouseDataLoading={isHouseDataLoading}
                  setGetHouseId={setGetHouseId}
                  handleHouseEdit={handleHouseEdit}
                  handleHouseDelete={handleHouseDelete}
                />
              )}
              {tab == "houseList" && (
                <HouseList
                  houseData={houseData}
                  isHouseDataLoading={isHouseDataLoading}
                  handleHouseEdit={handleHouseEdit}
                  handleHouseDelete={handleHouseDelete}
                />
              )}
            </div>

            {showModal && (
              <AddHouse
                dispatchHouse={dispatchHouse}
                indexToEdit={indexToEdit}
                houseIdToEdit={houseIdToEdit}
              />
            )}

            {deleteModal && (
              <DeleteModal
                deleteAction={dispatchHouse}
                iDToDelete={getHouseId}
                modalTitle={"House"}
              />
            )}
          </div>
        </div>
      );
  }

export default Accomodations;
