import React, {useEffect, useState, useMemo, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import  Addemployee from "../../../_components/modelbox/Addemployee"
import  Editemployee from "../../../_components/modelbox/Editemployee"
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import { setGlobalState, useGlobalState } from '../../../context/GlobalState';
import { initHouse, savedHouseReducer } from "../../../utils/localStorage";
import SmileImg from "../../../assets/img/smile.png";
import Select from "react-select";
import AddHouse from "../../../_components/modelbox/AddHouse";


const Accomodations = () => {

  const [house, dispatchHouse] = useReducer(savedHouseReducer, [], initHouse);
  const [showModal] = useGlobalState("showModal");

  useEffect(() => {
    localStorage.setItem("house", JSON.stringify(house));
  }, [house]);
  useEffect(() => {
    if (!showModal) {
      setGlobalState("selectedHouse", "");
    }
  }, [showModal]);

  const [houseList, setHouseList] = useState();
  useEffect(() => {
    setHouseList(house);
  }, [house]);


  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [houseIdToEdit, setHouseIdToEdit] = useState("");

  const handleHouseEdit = (id, index) => {
    setHouseIdToEdit(id);
    setIndexToEdit(index);
    setGlobalState("showModal", true);
    setGlobalState("selectedHouse", house);
  };

  const handleHouseDelete = async (index) => {
    dispatchHouse({
      type: "delete",
      payload: house[index],
    });
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

      return (
        <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
          <Header onMenuClick={(value) => toggleMobileMenu()} />
          <Sidebar />
          <div className="page-wrapper">
            <Helmet>
              <title>Employee - HRMS Admin Template</title>
              <meta name="description" content="Login page" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
              {/* Page Header */}
              <div className="page-header">
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
                      href="#"
                      className="btn add-btn"
                      onClick={() => setGlobalState("showModal", true)}
                    >
                      <i className="fa fa-plus" /> Add House
                    </a>
                    <div className="view-icons">
                      <Link
                        to="/app/employee/accomodations"
                        className="grid-view btn btn-link active"
                      >
                        <i className="fa fa-th" />
                      </Link>
                      <Link
                        to="/app/employee/accomodation"
                        className="list-view btn btn-link"
                      >
                        <i className="fa fa-bars" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              {/* Search Filter */}
              <div className="row filter-row">
                <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">Employee ID</label>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">Employee Name</label>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <a href="#" className="btn btn-success btn-block w-100">
                    {" "}
                    Search{" "}
                  </a>
                </div>
              </div>
              {/* Search Filter */}
              <div className="row staff-grid-row">
                {houseList?.map((house, index) => {
                  const { id, houseName, employee, managerName } = house;
                  return (
                    <div
                      key={id}
                      className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                    >
                      <div className="profile-widget">
                        {/* <div className="profile-img">
                          <Link
                            to="/app/profile/employee-profile"
                            className="avatar"
                          >
                            <img src={SmileImg} alt="" />
                          </Link>
                        </div> */}
                        <div className="dropdown profile-action">
                          <a
                            href="#"
                            className="action-icon dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="material-icons">more_vert</i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => handleHouseEdit(house.id, index)}
                            >
                              <i className="fa fa-pencil m-r-5" /> Edit
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => handleHouseDelete(index)}
                            >
                              <i className="fa fa-trash-o m-r-5" /> Delete
                            </a>
                          </div>
                        </div>
                        <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                          <Link to="#">
                            {houseName}
                          </Link>
                        </h4>
                        <div className="small text-muted">
                          Manager: {managerName}
                        </div>
                        {employee?.length}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {showModal && (
              <AddHouse
                dispatchHouse={dispatchHouse}
                indexToEdit={indexToEdit}
                deptIdToEdit={houseIdToEdit}
                house={house}
              />
            )}

            <div
              className="modal custom-modal fade"
              id="delete_employee"
              role="dialog"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="form-header">
                      <h3>Delete Employee</h3>
                      <p>Are you sure want to delete?</p>
                    </div>
                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <a href="" className="btn btn-primary continue-btn">
                            Delete
                          </a>
                        </div>
                        <div className="col-6">
                          <a
                            href=""
                            data-bs-dismiss="modal"
                            className="btn btn-primary cancel-btn"
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Delete Employee Modal */}
          </div>
        </div>
      );
  }

export default Accomodations;
