import React, {useEffect, useState, useMemo, useReducer } from 'react'
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/img/placeholder.jpg";
import AddRoom from '../../_components/modelbox/AddRoom';
import AddHouseEmployee from "../../_components/modelbox/AddHouseEmployee";
import AddHouseResident from "../../_components/modelbox/AddHouseResident";
import { setGlobalState, useGlobalState } from '../../context/GlobalState';
import {
  add_update_delete_room,
  add_update_delete_house_employee,
  add_update_delete_house_resident,
} from "../../utils/sendToServer";
import {
  useRoomFetching,
  useHouseEmployeeFetching,
  useHouseResidentFetching,
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
    setGetHouseEmployeeId(id);
    setGlobalState("deleteHouseResidentModal", true);
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
                      {house_employees?.length > 0
                        ? house_employees?.map((employees, index) => {
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
                    {house_residents?.length > 0
                      ? house_residents?.map((resident, index) => {
                          const {
                            id,
                            status,
                            room,
                            resident: houseRes,
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
                                      Resident: {houseRes}
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
                    <h3 className="card-title">House Images</h3>
                    {house_images?.length > 0
                      ? house_images?.map((images, index) => {
                          const {
                            name,
                            id,
                            description,
                            image,
                            house,
                            cover_image,
                          } = images;
                          return (
                            <React.Fragment key={id}>
                              <ul className="personal-info">
                                <li>
                                  <span className="text">
                                    <img
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50px",
                                      }}
                                      alt=""
                                      src={image ? image : DefaultImage}
                                    />{" "}
                                    {name}
                                  </span>
                                </li>
                              </ul>
                            </React.Fragment>
                          );
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
                          } = room;
                          if (house == houseId) {
                            return (
                              <React.Fragment key={id}>
                                <ul className="personal-info">
                                  <li>
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
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    House Documents{" "}
                    {/* <a onClick={handleOpeneFileUpload} className="edit-icon">
                      <i className="fa fa-plus" />
                    </a> */}
                  </h3>
                  <div className="experience-box">
                    {/* <ul className="experience-list">
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
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
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
        />
      )}
      {deleteHouseResidentModal && (
        <DeleteModal
          deleteAction={dispatchHouseResident}
          iDToDelete={getHouseResidentId}
          modalTitle={"House Resident"}
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
    </>
  );
};
export default HouseDetails;