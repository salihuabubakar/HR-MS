import React, {useEffect, useState, useMemo, useReducer } from 'react'
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/img/placeholder.jpg";
import AddRoom from '../../_components/modelbox/AddRoom';
import AddHouseEmployee from "../../_components/modelbox/AddHouseEmployee";
import AddHouseResident from "../../_components/modelbox/AddHouseResident";
import AddHouseImages from "../../_components/modelbox/AddHouseImages";
import AddHouseDocuments from "../../_components/modelbox/AddHouseDocuments";
import { setGlobalState, useGlobalState } from '../../context/GlobalState';
import {
  add_update_delete_room,
  add_update_delete_house_employee,
  add_update_delete_house_resident,
  add_update_delete_house_image,
  add_update_delete_house_document,
} from "../../utils/sendToServer";
import {
  useRoomFetching,
  useHouseEmployeeFetching,
  useHouseResidentFetching,
  useHouseImageFetching,
  useHouseDocumentFetching
} from "../../utils/employeeCustomFetchHook";
import DeleteModal from '../../_components/modelbox/DeleteModal';
import moment from "moment";

const HouseDetails = ({ isSelectedLoading, getSelectedData, getHouseId }) => {
  // House Employee
  const [houseEmployeeState, dispatchHouseEmployee] = useReducer(
    add_update_delete_house_employee,
    []
  );
  const [houseEmployeeIndexToEdit, setHouseEmployeeIndexToEdit] =
    useState(null);
  const [showHouseEmployeeModal] = useGlobalState("showHouseEmployeeModal");
  const { houseEmployeeData, isHouseEmployeeLoading, houseEmployeeError } =
    useHouseEmployeeFetching();
  const [getHouseEmployeeId, setGetHouseEmployeeId] = useState();
  const [deleteHouseEmployeeModal] = useGlobalState("deleteHouseEmployeeModal");
  useEffect(() => {
    if (!showHouseEmployeeModal) {
      setGlobalState("selectedHouseEmployee", "");
    }
  }, [showHouseEmployeeModal]);

  const handleAddHouseEmployye = () => {
    setGlobalState("showHouseEmployeeModal", true);
  };

  const handleEditHouseEmployee = (id, index) => {
    setGetHouseEmployeeId(id);
    setHouseEmployeeIndexToEdit(index);
    setGlobalState("selectedHouseEmployee", houseEmployeeData);
    setGlobalState("showHouseEmployeeModal", true);
  };

  const handleDeleteHouseEmployee = (id) => {
    setGetHouseEmployeeId(id);
    setGlobalState("deleteHouseEmployeeModal", true);
  };

  // House Resident
  const [houseResidentState, dispatchHouseResident] = useReducer(
    add_update_delete_house_resident,
    []
  );
  const [houseResidentIndexToEdit, setHouseResidentIndexToEdit] =
    useState(null);
  const [showHouseResidentModal] = useGlobalState("showHouseResidentModal");
  const { houseResidentData, isHouseResidentLoading, houseResidentError } =
    useHouseResidentFetching();
  const [getHouseResidentId, setGetHouseResidentId] = useState();
  const [deleteHouseResidentModal] = useGlobalState("deleteHouseResidentModal");
  useEffect(() => {
    if (!showHouseResidentModal) {
      setGlobalState("selectedHouseResident", "");
    }
  }, [showHouseResidentModal]);

  const handleAddHouseResident = () => {
    setGlobalState("showHouseResidentModal", true);
  };

  const handleEditHouseResident = (id, index) => {
    setGetHouseResidentId(id);
    setHouseResidentIndexToEdit(index);
    setGlobalState("selectedHouseResident", houseResidentData);
    setGlobalState("showHouseResidentModal", true);
  };

  const handleDeleteHouseResident = (id) => {
    setGetHouseResidentId(id);
    setGlobalState("deleteHouseResidentModal", true);
  };

  // House Images
  const [houseImagesState, dispatchHouseImages] = useReducer(
    add_update_delete_house_image,
    []
  );
  const [houseImagesIndexToEdit, setHouseImagesIndexToEdit] = useState(null);
  const [showHouseImagesModal] = useGlobalState("showHouseImagesModal");
  const { houseImagesData, isHouseImagesLoading, houseImagesError } =
    useHouseImageFetching();
  const [getHouseImagesId, setGetHouseImagesId] = useState();
  const [deleteHouseImagesModal] = useGlobalState("deleteHouseImagesModal");
  useEffect(() => {
    if (!showHouseImagesModal) {
      setGlobalState("selectedHouseImages", "");
    }
  }, [showHouseImagesModal]);

  const handleAddHouseImages = () => {
    setGlobalState("showHouseImagesModal", true);
  };

  const handleEditHouseImages = (id, index) => {
    setGetHouseImagesId(id);
    setHouseImagesIndexToEdit(index);
    setGlobalState("selectedHouseImages", houseImagesData);
    setGlobalState("showHouseImagesModal", true);
  };

  const handleDeleteHouseImages = (id) => {
    setGetHouseImagesId(id);
    setGlobalState("deleteHouseImagesModal", true);
  };

  // Room
  const [roomState, dispatchRoom] = useReducer(add_update_delete_room, []);
  const [roomIndexToEdit, setRoomIndexToEdit] = useState(null);
  const [showRoomModal] = useGlobalState("showRoomModal");
  const { roomData, isRoomLoading, roomError } = useRoomFetching();
  const [getRoomId, setGetRoomId] = useState();
  const [deleteRoomModal] = useGlobalState("deleteRoomModal");
  useEffect(() => {
    if (!showRoomModal) {
      setGlobalState("selectedRoom", "");
    }
  }, [showRoomModal]);

  const handleAddRoom = () => {
    setGlobalState("showRoomModal", true);
  };
  const handleEdditRoom = (id, index) => {
    setGetRoomId(id);
    setRoomIndexToEdit(index);
    setGlobalState("selectedRoom", roomData);
    setGlobalState("showRoomModal", true);
  };

  const handleDeleteRoom = (id) => {
    setGetRoomId(id);
    setGlobalState("deleteRoomModal", true);
  };

  // House Document
const [houseDocumentsState, dispatchHouseDocuments] = useReducer(
  add_update_delete_house_document,
  []
);
const [houseDocumentsIndexToEdit, setHouseDocumentsIndexToEdit] =
  useState(null);
const [showHouseDocumentsModal] = useGlobalState("showHouseDocumentsModal");
const { houseDocumentsData, isHouseDocumentsLoading, houseDocumentsError } =
  useHouseDocumentFetching();
const [getHouseDocumentsId, setGetHouseDocumentsId] = useState();
const [deleteHouseDocumentsModal] = useGlobalState("deleteHouseDocumentsModal");
useEffect(() => {
  if (!showHouseDocumentsModal) {
    setGlobalState("selectedHouseDocuments", "");
  }
}, [showHouseDocumentsModal]);

const handleAddHouseDocuments = () => {
  setGlobalState("showHouseDocumentsModal", true);
};

const handleEditHouseDocuments = (id, index) => {
  setGetHouseDocumentsId(id);
  setHouseDocumentsIndexToEdit(index);
  setGlobalState("selectedHouseDocuments", houseDocumentsData);
  setGlobalState("showHouseDocumentsModal", true);
};

const handleDeleteHouseDocuments = (id) => {
  setGetHouseDocumentsId(id);
  setGlobalState("deleteHouseDocumentsModal", true);
};


  const houseId = getHouseId;
  const selectedHouseId = getSelectedData?.id;
  const name = getSelectedData?.name;
  const street_address = getSelectedData?.street_address;
  const postcode = getSelectedData?.postcode;
  const city = getSelectedData?.city;
  const mobile = getSelectedData?.mobile;
  const email = getSelectedData?.email;
  const house_type = getSelectedData?.house_type;
  const manager = getSelectedData?.manager;
  const num_bedrooms = getSelectedData?.num_bedrooms;
  const num_bathrooms = getSelectedData?.num_bathrooms;
  const num_kitchens = getSelectedData?.num_kitchens;
  const square_footage = getSelectedData?.square_footage;
  const garage = getSelectedData?.garage;
  const basement = getSelectedData?.basement;
  const pool = getSelectedData?.pool;
  const back_yard = getSelectedData?.back_yard;
  const year_built = getSelectedData?.year_built;
  const air_conditioning = getSelectedData?.air_conditioning;
  const heating_system = getSelectedData?.heating_system;
  const roof_type = getSelectedData?.roof_type;
  const fireplace = getSelectedData?.fireplace;
  const security_system = getSelectedData?.security_system;
  const solar_panels = getSelectedData?.solar_panels;
  const num_floors = getSelectedData?.num_floors;
  const floor_type = getSelectedData?.floor_type;
  const other_features = getSelectedData?.other_features;
  const description = getSelectedData?.description;
  const photo = getSelectedData?.photo;
  const house_maintenance = getSelectedData?.house_maintenance;
  const house_images = getSelectedData?.house_images;
  const house_documents = getSelectedData?.house_documents;
  const house_bills = getSelectedData?.house_bills;
  const house_rooms = getSelectedData?.house_rooms;
  const house_employees = getSelectedData?.house_employees;
  const house_residents = getSelectedData?.house_residents;

  return (
    <>
      <div className="tab-content">
        {/* Profile Info Tab */}
        <div>
          <div className="row">
            {isSelectedLoading ? (
              <div className="skeleton-container-profile">
                <div className="skeleton-content-profile">
                  <div className="skeleton-line-profile"></div>
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <div className="">
                        <div className="profile-img">
                          <a>
                            <img
                              className="inline-block"
                              style={{
                                borderRadius: "5px",
                                width: "80px",
                                height: "80px",
                              }}
                              alt=""
                              src={photo ? photo : DefaultImage}
                            />
                          </a>
                        </div>
                      </div>
                      <h3 className="card-title">House information</h3>
                      <ul className="personal-info">
                        <li>
                          <div className="title">House name</div>
                          <div className="text">{name}</div>
                        </li>
                        <li>
                          <div className="title">Address</div>
                          <div className="text">{`${street_address}, ${city}`}</div>
                        </li>
                        <li>
                          <div className="title">Manager</div>
                          <div className="text">{manager}</div>
                        </li>
                        <li>
                          <div className="title">Number of employees</div>
                          <div className="text">
                            {house_employees?.length
                              ? house_employees?.length
                              : "0"}
                          </div>
                        </li>
                        <li>
                          <div className="title">Number of residents</div>
                          <div className="text">
                            {house_residents?.length
                              ? house_residents?.length
                              : "0"}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Employees
                        <a
                          onClick={handleAddHouseEmployye}
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      {houseEmployeeData?.length > 0
                        ? houseEmployeeData?.map((employees, index) => {
                            const {
                              id,
                              status,
                              employee,
                              house,
                              join_date,
                              end_date,
                            } = employees;
                            if (house === houseId) {
                              return (
                                <React.Fragment key={id}>
                                  <ul className="personal-info">
                                    <li>
                                      <span className="text">
                                        Employee: {employee}
                                      </span>
                                      <span className="text">
                                        Status: {status}
                                      </span>
                                      <span className="text">
                                        Join Date:{" "}
                                        {moment(join_date).format(
                                          "DD MMM YYYY"
                                        )}
                                      </span>
                                      <span className="text">
                                        End Date:{" "}
                                        {moment(end_date).format("DD MMM YYYY")}
                                      </span>
                                      <div className="dropdown dropdown-action text-end">
                                        <a
                                          className="action-icon dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleEditHouseEmployee(id, index)
                                            }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleDeleteHouseEmployee(id)
                                            }
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </React.Fragment>
                              );
                            }
                          })
                        : "Ops! No employee in the house."}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* /Profile Info Tab */}
      </div>
      <div className="card tab-box">
        <div className="row user-tabs">
          <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  href="#residents"
                  data-bs-toggle="tab"
                  className="nav-link active"
                >
                  Residents
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#maintenance"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  Maintenance
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#house_image"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  House Images
                </a>
              </li>
              <li className="nav-item">
                <a href="#house_bill" data-bs-toggle="tab" className="nav-link">
                  House Bills
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#house_rooms"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  House Rooms
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#document_upload"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  House Document
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tab-content">
        {/* Resident Info Tab */}
        <div id="residents" className="pro-overview tab-pane fade show active">
          <div className="row">
            {isSelectedLoading ? (
              <div className="skeleton-container-profile">
                <div className="skeleton-content-profile">
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">
                      Residents
                      <a onClick={handleAddHouseResident} className="edit-icon">
                        <i className="fa fa-plus" />
                      </a>
                    </h3>
                    {houseResidentData?.length > 0
                      ? houseResidentData?.map((resident, index) => {
                          const {
                            id,
                            status,
                            room,
                            residents,
                            house,
                            occupancy_start_date,
                            occupancy_end_date,
                          } = resident;
                          if (house == houseId) {
                            return (
                              <React.Fragment key={index}>
                                <ul className="personal-info">
                                  <li>
                                    <span className="text">
                                      Resident: {residents}
                                    </span>
                                    <span className="text">
                                      Status: {status}
                                    </span>
                                    <span className="text">Room: {room}</span>
                                    <span className="text">
                                      Occupancy Start Date:{" "}
                                      {moment(occupancy_start_date).format(
                                        "DD MMM YYYY"
                                      )}
                                    </span>
                                    <span className="text">
                                      Occupancy End Date:{" "}
                                      {moment(occupancy_end_date).format(
                                        "DD MMM YYYY"
                                      )}
                                    </span>
                                    <div className="dropdown dropdown-action text-end">
                                      <a
                                        className="action-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="material-icons">
                                          more_vert
                                        </i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleEditHouseResident(id, index)
                                          }
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleDeleteHouseResident(id)
                                          }
                                        >
                                          <i className="fa fa-trash-o m-r-5" />{" "}
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </React.Fragment>
                            );
                          }
                        })
                      : "Ops! No resident in the house."}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* /Resident Info Tab */}
        {/* Maintenance Info Tab */}
        <div id="maintenance" className="tab-pane fade">
          <div className="row">
            {isSelectedLoading ? (
              <div className="skeleton-container-profile">
                <div className="skeleton-content-profile">
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Maintenance</h3>
                    {house_maintenance?.length > 0
                      ? house_maintenance?.map((maintenance, index) => {
                          const {
                            status,
                            id,
                            description,
                            date,
                            cost,
                            house,
                            Employee,
                            Organization,
                            documents,
                            Before_Image,
                            After_Image,
                          } = maintenance;
                          return (
                            <React.Fragment key={id}>
                              <ul className="personal-info">
                                <li>
                                  <span className="text">
                                    {/* <img
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50px",
                                      }}
                                      alt=""
                                      src={image ? image : DefaultImage}
                                    />{" "} */}
                                    {status}
                                  </span>
                                </li>
                              </ul>
                            </React.Fragment>
                          );
                        })
                      : "Ops!"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* /Maintenance Info Tab */}
        {/* House Image Info Tab */}
        <div id="house_image" className="tab-pane fade">
          <div className="row">
            {isSelectedLoading ? (
              <div className="skeleton-container-profile">
                <div className="skeleton-content-profile">
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">
                      House Images
                      <a onClick={handleAddHouseImages} className="edit-icon">
                        <i className="fa fa-plus" />
                      </a>
                    </h3>
                    {houseImagesData?.length > 0
                      ? houseImagesData?.map((images, index) => {
                          const {
                            name,
                            id,
                            description,
                            image,
                            house,
                            cover_image,
                          } = images;
                          if (house == houseId) {
                            return (
                              <React.Fragment key={id}>
                                <ul className="personal-info">
                                  <li>
                                    <span className="text">
                                      <img
                                        style={{
                                          width: "350px",
                                          height: "300px",
                                          borderRadius: "5px",
                                        }}
                                        alt=""
                                        src={image ? image : DefaultImage}
                                      />
                                    </span>
                                    <span className="text">{name}</span>
                                    <span className="text">{description}</span>
                                    <span className="text">{cover_image}</span>
                                    <div className="dropdown dropdown-action text-end">
                                      <a
                                        className="action-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="material-icons">
                                          more_vert
                                        </i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleEditHouseImages(id, index)
                                          }
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleDeleteHouseImages(id)
                                          }
                                        >
                                          <i className="fa fa-trash-o m-r-5" />{" "}
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </React.Fragment>
                            );
                          }
                        })
                      : "Ops! No Image"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* /House Image Info Tab */}
        {/* House Bill Info Tab */}
        <div id="house_bill" className="tab-pane fade">
          <div className="row">
            {isSelectedLoading ? (
              <div className="skeleton-container-profile">
                <div className="skeleton-content-profile">
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">House Bills</h3>
                    {house_bills?.length > 0
                      ? house_bills?.map((bills, index) => {
                          const {
                            title,
                            id,
                            date,
                            amount,
                            house,
                            paid,
                            documents,
                          } = bills;
                          return (
                            <React.Fragment key={id}>
                              <ul className="personal-info">
                                <li>
                                  <span className="text">{title}</span>
                                </li>
                              </ul>
                            </React.Fragment>
                          );
                        })
                      : "Ops! No Bill"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* /House Bill Info Tab */}
        {/* House Room Info Tab */}
        <div id="house_rooms" className="tab-pane fade">
          <div className="row">
            {isSelectedLoading ? (
              <div className="skeleton-container-profile">
                <div className="skeleton-content-profile">
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">
                      House Rooms
                      <a onClick={handleAddRoom} className="edit-icon">
                        <i className="fa fa-plus" />
                      </a>
                    </h3>
                    {roomData?.length > 0
                      ? roomData?.map((room, index) => {
                          const {
                            room_type,
                            id,
                            room_description,
                            room_status,
                            house,
                            room_photos,
                            name,
                          } = room;
                          if (house == houseId) {
                            return (
                              <React.Fragment key={id}>
                                <ul className="personal-info">
                                  <li>
                                    <span className="text">
                                      Room Name: {name}
                                    </span>
                                    <span className="text">
                                      Room Type: {room_type}
                                    </span>
                                    <span className="text">
                                      Room Status: {room_status}
                                    </span>
                                    <span className="text">
                                      Room Photos: {room_photos}
                                    </span>
                                    <span className="text">
                                      Room Description: {room_description}
                                    </span>
                                    <div className="dropdown dropdown-action text-end">
                                      <a
                                        className="action-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="material-icons">
                                          more_vert
                                        </i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleEdditRoom(id, index)
                                          }
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleDeleteRoom(id)}
                                        >
                                          <i className="fa fa-trash-o m-r-5" />{" "}
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </React.Fragment>
                            );
                          }
                        })
                      : "Ops! No Room in the house"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* /House Room Info Tab */}
        {/* Document Upload Tab */}
        <div className="tab-pane fade" id="document_upload">
          <div className="row">
            {isSelectedLoading ? (
              <div className="skeleton-container-profile">
                <div className="skeleton-content-profile">
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        House Document
                        <a
                          onClick={handleAddHouseDocuments}
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      {houseDocumentsData?.length > 0
                        ? houseDocumentsData?.map((doc, index) => {
                            const {
                              title,
                              id,
                              description,
                              file,
                              house,
                              expiry_date,
                              valid_from,
                              status
                            } = doc;
                            if (house == houseId) {
                              return (
                                <React.Fragment key={id}>
                                  <ul className="personal-info">
                                    <li>
                                      <span className="text">file: {file}</span>
                                      <span className="text">{title}</span>
                                      <span className="text">
                                        {description}
                                      </span>
                                      <span className="text">
                                        {status}
                                      </span>
                                      <span className="text">{valid_from}</span>
                                      <span className="text">
                                        {expiry_date}
                                      </span>
                                      <div className="dropdown dropdown-action text-end">
                                        <a
                                          className="action-icon dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleEditHouseDocuments(
                                                id,
                                                index
                                              )
                                            }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleDeleteHouseDocuments(id)
                                            }
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </React.Fragment>
                              );
                            }
                          })
                        : "Ops! No Document"}
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    House Documents{" "}
                    <a onClick={handleOpeneFileUpload} className="edit-icon">
                      <i className="fa fa-plus" />
                    </a>
                  </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      {filesList?.length > 0 &&
                      selectedHouseDocumentId === houseID
                        ? filesList?.map((file, index) => {
                            const { id, inputFields, uniqueID } = file;
                            if (uniqueID == houseID) {
                              return (
                                <React.Fragment key={id}>
                                  {inputFields?.map((fields, fieldsIndex) => {
                                    const {
                                      documentName,
                                      documentNumber,
                                      documentType,
                                      expiryDate,
                                      issueDate,
                                      fileDetails,
                                    } = fields;

                                    const handleFileDownload = () => {
                                      const dataUrlParts =
                                        fileDetails.data.split(",");
                                      const base64Data = dataUrlParts[1];
                                      const mimeType = dataUrlParts[0]
                                        .split(":")[1]
                                        .split(";")[0];

                                      const byteCharacters = atob(base64Data);
                                      const byteNumbers = new Array(
                                        byteCharacters.length
                                      );

                                      for (
                                        let i = 0;
                                        i < byteCharacters.length;
                                        i++
                                      ) {
                                        byteNumbers[i] =
                                          byteCharacters.charCodeAt(i);
                                      }

                                      const byteArray = new Uint8Array(
                                        byteNumbers
                                      );
                                      const blob = new Blob([byteArray], {
                                        type: mimeType,
                                      });

                                      const url = URL.createObjectURL(blob);
                                      const a = document.createElement("a");
                                      a.href = url;
                                      a.download = fileDetails.name;
                                      document.body.appendChild(a);
                                      a.click();
                                      document.body.removeChild(a);
                                      URL.revokeObjectURL(url);
                                    };

                                    return (
                                      <li key={fieldsIndex}>
                                        <div className="experience-user">
                                          <div className="before-circle" />
                                        </div>
                                        <div className="experience-content">
                                          <div className="timeline-content">
                                            <a className="name">
                                              {documentName}
                                              <div className="dropdown profile-action">
                                                <a
                                                  className="action-icon dropdown-toggle"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  <i className="material-icons">
                                                    more_vert
                                                  </i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                  <a
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                      handleFileUploadEdit(
                                                        fieldsIndex,
                                                        index
                                                      )
                                                    }
                                                  >
                                                    <i className="fa fa-pencil m-r-5" />{" "}
                                                    Edit
                                                  </a>
                                                  <a
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                      handleFileDownload(index)
                                                    }
                                                  >
                                                    <i className="fa fa-download m-r-5" />{" "}
                                                    Download
                                                  </a>
                                                </div>
                                              </div>
                                            </a>
                                            <div>{documentNumber}</div>
                                            <span className="time">
                                              Type: {documentType}
                                            </span>
                                            {issueDate && expiryDate ? (
                                              <span className="time">
                                                Issue Date: {issueDate} - Expiry
                                                Date: {expiryDate}
                                              </span>
                                            ) : null}
                                            {fileDetails?.type &&
                                            fileDetails?.type?.startsWith(
                                              "image/"
                                            ) ? (
                                              <img
                                                className="img-preview"
                                                src={fileDetails?.data}
                                                alt="Preview"
                                              />
                                            ) : (
                                              <span className="files-icon">
                                                <i className="fa fa-file-pdf-o" />
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </React.Fragment>
                              );
                            }
                          })
                        : "No uploaded file(s) yet"}
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* /Document Upload Tab */}
      </div>

      {/* House Employee Modals */}
      {showHouseEmployeeModal && (
        <AddHouseEmployee
          house={houseId}
          dispatchHouseEmployee={dispatchHouseEmployee}
          houseEmployeeIndexToEdit={houseEmployeeIndexToEdit}
          id={getHouseEmployeeId}
        />
      )}
      {deleteHouseEmployeeModal && (
        <DeleteModal
          deleteAction={dispatchHouseEmployee}
          iDToDelete={getHouseEmployeeId}
          modalTitle={"House Employee"}
        />
      )}

      {/* House Resident Modals */}
      {showHouseResidentModal && (
        <AddHouseResident
          house={houseId}
          dispatchHouseResident={dispatchHouseResident}
          houseResidentIndexToEdit={houseResidentIndexToEdit}
          id={getHouseResidentId}
          roomData={roomData}
        />
      )}
      {deleteHouseResidentModal && (
        <DeleteModal
          deleteAction={dispatchHouseResident}
          iDToDelete={getHouseResidentId}
          modalTitle={"House Resident"}
        />
      )}

      {/* House Images Modals */}
      {showHouseImagesModal && (
        <AddHouseImages
          house={houseId}
          dispatchHouseImages={dispatchHouseImages}
          houseImagesIndexToEdit={houseImagesIndexToEdit}
          id={getHouseImagesId}
        />
      )}
      {deleteHouseImagesModal && (
        <DeleteModal
          deleteAction={dispatchHouseImages}
          iDToDelete={getHouseImagesId}
          modalTitle={"House Image"}
        />
      )}

      {/* Room Modals */}
      {showRoomModal && (
        <AddRoom
          house={houseId}
          dispatchRoom={dispatchRoom}
          roomIndexToEdit={roomIndexToEdit}
          id={getRoomId}
        />
      )}
      {deleteRoomModal && (
        <DeleteModal
          deleteAction={dispatchRoom}
          iDToDelete={getRoomId}
          modalTitle={"Room"}
        />
      )}

      {/* House Documents Modals */}
      {showHouseDocumentsModal && (
        <AddHouseDocuments
          house={houseId}
          dispatchHouseDocuments={dispatchHouseDocuments}
          houseDocumentsIndexToEdit={houseDocumentsIndexToEdit}
          id={getHouseDocumentsId}
        />
      )}
      {deleteHouseDocumentsModal && (
        <DeleteModal
          deleteAction={dispatchHouseDocuments}
          iDToDelete={getHouseDocumentsId}
          modalTitle={"House Document"}
        />
      )}
    </>
  );
};
export default HouseDetails;