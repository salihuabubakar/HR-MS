import React, { useEffect, useState, useMemo, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import AddResident from "../../_components/modelbox/AddResident";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import { add_update_delete_resident } from "../../utils/sendToServer";
import DefaultImage from "../../assets/img/placeholder.jpg";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import {
  useResidentFetching
} from "../../utils/employeeCustomFetchHook";
import "../Employees/Employees/style.css";
import AllResident from "./AllResident";
import AllResidentList from "./AllResidentList";
import Profile from "./Profile";
import { DivContainer } from "../TaskManagement/style";
import axios from "axios";
import { BaseUrl } from "../../utils/baseUrl";

const AllServiceWorkers = () => {
  const [showModal] = useGlobalState("showModal");
  const [deleteModal] = useGlobalState("deleteModal");
  const [tab, setTab] = useState(
    "residentAll" || "residentList" || "residentProfile"
  );
const [getResidentId, setGetResidentId] = useState(null);
const { residentData, isResidentLoading, residentError } =
  useResidentFetching();
const [getSelectedData, setGetSelectedData] = useState();
const [isSelectedLoading, setIsSelectedLoading] = useState(false);

useEffect(() => {
  let isMounted = true;
  const fetchResidentSelectedData = async () => {
    try {
      setIsSelectedLoading(true);
      const response = await axios.get(
        `${BaseUrl}/resident/detail/${getResidentId}?format=json`
      );
      if (isMounted) {
        setGetSelectedData(response.data);
        setIsSelectedLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsSelectedLoading(false);
    }
  };
  getResidentId != null ? fetchResidentSelectedData() : null;

  return () => {
    isMounted = false;
  };
}, [getResidentId]);

const initialUserData = [];

const [state, dispatchResident] = useReducer(
  add_update_delete_resident,
  initialUserData
);

useEffect(() => {
  if (!showModal) {
    setGlobalState("selectedResidentAccount", "");
  }
}, [showModal]);

const [menu, setMenu] = useState(false);

const [indexToEdit, setIndexToEdit] = useState();

const handleAddResident = () => {
  setGlobalState("showModal", true);
  setGlobalState("selectedResidentAccount", "");
};

// Pagination

const itemsPerPage = 10; // Number of items per page
const [currentPage, setCurrentPage] = useState(1);

const handleEditResident = (id, index) => {
  setGetResidentId(id);
  setIndexToEdit((currentPage - 1) * itemsPerPage + index);
  setGlobalState("showModal", true);
  setGlobalState("selectedResidentAccount", residentData);
};

const handleDeleteAcct = (id) => {
  setGetResidentId(id);
  setGlobalState("deleteModal", true);
};


  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  return (
    <DivContainer className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Resident - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            {tab == "residentProfile" ? (
              <>
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="page-title">Profile</h3>
                    <ul className="breadcrumb breadcrumb-nav">
                      <li className="breadcrumb-item">
                        <a onClick={() => setTab("residentAll")}>
                          All Resident
                        </a>
                      </li>
                      <li className="breadcrumb-item active">Profile</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Resident</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/app/main/dashboard">Dashboard</Link>
                      </li>
                      <li className="breadcrumb-item active">Resident</li>
                    </ul>
                  </div>
                  <div className="col-auto float-end ml-auto">
                    <a className="btn add-btn" onClick={handleAddResident}>
                      <i className="fa fa-plus" /> Add Resident
                    </a>
                    <div className="view-icons">
                      <a
                        onClick={() => setTab("residentAll")}
                        className={`grid-view btn btn-link ${
                          tab == `residentAll` ? `active` : null
                        }`}
                      >
                        <i className="fa fa-th" />
                      </a>
                      <a
                        onClick={() => setTab("residentList")}
                        className={`list-view btn btn-link ${
                          tab == `residentList` ? `active` : null
                        }`}
                      >
                        <i className="fa fa-bars" />
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* /Page Header */}
          {tab != "residentProfile" ? (
            <>
              {/* Search Filter */}
              <div className="row filter-row">
                <div className="col-sm-6 col-md-4">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">Resident ID</label>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">Resident Name</label>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <a href="#" className="btn btn-success btn-block w-100">
                    {" "}
                    Search{" "}
                  </a>
                </div>
              </div>
              {/* Search Filter */}
            </>
          ) : null}
          {tab == "residentAll" && (
            <AllResident
              data={residentData}
              isLoading={isResidentLoading}
              error={residentError}
              handleEditResident={handleEditResident}
              handleDeleteAcct={handleDeleteAcct}
              DefaultImage={DefaultImage}
              setTab={setTab}
              setGetResidentId={setGetResidentId}
            />
          )}
          {tab == "residentList" && (
            <AllResidentList
              handleEditResident={handleEditResident}
              handleDeleteAcct={handleDeleteAcct}
              DefaultImage={DefaultImage}
              data={residentData}
              setTab={setTab}
              setGetResidentId={setGetResidentId}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          {tab == "residentProfile" && (
            <Profile
              getSelectedData={getSelectedData}
              DefaultImage={DefaultImage}
              isSelectedLoading={isSelectedLoading}
              getResidentId={getResidentId}
            />
          )}
        </div>

        {showModal && (
          <AddResident
            dispatchResident={dispatchResident}
            indexToEdit={indexToEdit}
            getResidentId={getResidentId}
          />
        )}
        {deleteModal && (
          <DeleteModal
            deleteAction={dispatchResident}
            iDToDelete={getResidentId}
            modalTitle={"Resident"}
          />
        )}
      </div>
    </DivContainer>
  );
};

export default AllServiceWorkers;
