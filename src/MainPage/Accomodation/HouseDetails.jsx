import React, {useEffect, useState, useMemo, useReducer } from 'react'
import { Link, useLocation } from "react-router-dom";
import DefaultImage from "../../assets/img/placeholder.jpg";
import AddRoom from '../../_components/modelbox/AddRoom';
import AddHouseEmployee from "../../_components/modelbox/AddHouseEmployee";
import AddHouseResident from "../../_components/modelbox/AddHouseResident";
import AddHouseImages from "../../_components/modelbox/AddHouseImages";
import AddHouseDocuments from "../../_components/modelbox/AddHouseDocuments";
import AddHouseBills from "../../_components/modelbox/AddHouseBills";
import AddHouseMaintenance from "../../_components/modelbox/AddHouseMaintenance";
import AddHouseNotice from '../../_components/modelbox/AddHouseNotice';
import AddHouseItem from '../../_components/modelbox/AddHouseItem';
import AddHouseInspection from "../../_components/modelbox/AddHouseInspection";
import { setGlobalState, useGlobalState } from '../../context/GlobalState';
import { Wrapper } from "../ServiceWork/style";
import axios from "axios"
import { BaseUrl } from '../../utils/baseUrl';
import {
  add_update_delete_room,
  add_update_delete_house_employee,
  add_update_delete_house_resident,
  add_update_delete_house_image,
  add_update_delete_house_document,
  add_update_delete_bill,
  add_update_delete_maintenance,
  add_update_delete_notice,
  add_update_delete_item,
  add_update_delete_inspection,
} from "../../utils/sendToServer";
import {
  useRoomFetching,
  useHouseEmployeeFetching,
  useHouseResidentFetching,
  useHouseImageFetching,
  useHouseDocumentFetching,
  useBillFetching,
  useHouseMaintenanceData,
  useDataFetching,
  useResidentFetching,
  useOrganisationFetching,
  useHouseNoticesFetching,
  useHouseItemsFetching,
  useHouseInspectionsFetching
} from "../../utils/employeeCustomFetchHook";
import DeleteModal from '../../_components/modelbox/DeleteModal';
import moment from "moment";
import Header from '../../initialpage/Sidebar/header';
import Sidebar from '../../initialpage/Sidebar/sidebar';
import { Helmet } from 'react-helmet';

const HouseDetails = () => {
  const handleFileDownload = (file) => {
    const a = document.createElement("a");
    a.href = file;

    const fileExtension = file.split(".").pop().toLowerCase();

    // Set the MIME type based on the file extension
    let mimeType;
    if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "JPG"
    ) {
      mimeType = "image/jpeg";
    } else if (fileExtension === "png" || fileExtension === "PNG") {
      mimeType = "image/png";
    } else if (fileExtension === "pdf") {
      mimeType = "application/pdf";
    } else if (fileExtension === "webp") {
      mimeType = "image/webp";
    } else if (fileExtension === "txt") {
      mimeType = "text/plain";
    } else if (fileExtension === "xls" || fileExtension === "xlsx") {
      mimeType = "application/vnd.ms-excel";
    } else if (fileExtension === "doc" || fileExtension === "docx") {
      mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else {
      mimeType = "application/octet-stream"; // Fallback MIME type for unknown file types
    }

    // Set the MIME type of the file
    a.type = mimeType;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const location = useLocation();
  let getHouseId = location?.state?.id;
  const [isSelectedLoading, setIsSelectedLoading] = useState(false);
  const [getSelectedData, setGetSelectedData] = useState();


  useEffect(() => {
    let isMounted = true;
    const fetchHouseSelectedData = async () => {
      try {
        setIsSelectedLoading(true);
        const response = await axios.get(
          `${BaseUrl}/house/details/${getHouseId}/?format=json`
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
    getHouseId != null ? fetchHouseSelectedData() : null;

    return () => {
      isMounted = false;
    };
  }, [getHouseId]);

  const [menu, setMenu] = useState(false);
const toggleMobileMenu = () => {
    setMenu(!menu);
  };



  const [houseEmployeeError] = useGlobalState("houseEmployeeError");
  const [houseResidentError] = useGlobalState("houseResidentError");
  const [roomError] = useGlobalState("roomError");
  const [maintenanceError] = useGlobalState("maintenanceError");
  const [houseImageError] = useGlobalState("houseImageError");
  const [houseBillError] = useGlobalState("houseBillError");
  const [houseDocumentError] = useGlobalState("houseDocumentError");
  const [houseNoticeError] = useGlobalState("houseNoticeError");
  const [houseItemError] = useGlobalState("houseItemError");
  const [houseInspectionError] = useGlobalState("houseInspectionError");

  const clearErrorMessage = () => {
    setGlobalState("houseEmployeeError", "");
    setGlobalState("houseResidentError", "");
    setGlobalState("roomError", "");
    setGlobalState("maintenanceError", "");
    setGlobalState("houseImageError", "");
    setGlobalState("houseBillError", "");
    setGlobalState("houseDocumentError", "");
    setGlobalState("houseNoticeError", "");
    setGlobalState("houseItemError", "");
    setGlobalState("houseInspectionError", "");
  };

  const { data: allEmployee } = useDataFetching();
  const { residentData } = useResidentFetching();
  const { organisationData } = useOrganisationFetching();

  // House Employee
  const [houseEmployeeState, dispatchHouseEmployee] = useReducer(
    add_update_delete_house_employee,
    []
  );
  const [houseEmployeeIndexToEdit, setHouseEmployeeIndexToEdit] =
    useState(null);
  const [showHouseEmployeeModal] = useGlobalState("showHouseEmployeeModal");
  const { houseEmployeeData } =
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
  const { houseResidentData } =
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
  const { roomData } = useRoomFetching();
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
  const [deleteHouseDocumentsModal] = useGlobalState(
    "deleteHouseDocumentsModal"
  );
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

  // House Bill
  const [billState, dispatchBill] = useReducer(add_update_delete_bill, []);
  const [billIndexToEdit, setBillIndexToEdit] = useState(null);
  const [showBillModal] = useGlobalState("showBillModal");
  const { billData, isBillLoading, billError } = useBillFetching();
  const [getBillId, setGetBillId] = useState();
  const [deleteBillModal] = useGlobalState("deleteBillModal");
  useEffect(() => {
    if (!showBillModal) {
      setGlobalState("selectedBill", "");
    }
  }, [showBillModal]);

  const handleAddBill = () => {
    setGlobalState("showBillModal", true);
  };

  const handleEditBill = (id, index) => {
    setGetBillId(id);
    setBillIndexToEdit(index);
    setGlobalState("selectedBill", billData);
    setGlobalState("showBillModal", true);
  };

  const handleDeleteBill = (id) => {
    setGetBillId(id);
    setGlobalState("deleteBillModal", true);
  };

  // Maintenance
  const [maintenanceState, dispatchMaintenance] = useReducer(
    add_update_delete_maintenance,
    []
  );
  const [maintenanceIndexToEdit, setMaintenanceIndexToEdit] = useState(null);
  const [showMaintenanceModal] = useGlobalState("showMaintenanceModal");
  const {
    houseMaintenanceData,
    isHouseMaintenanceLoading,
    houseMaintenanceError,
  } = useHouseMaintenanceData();
  const [getMaintenanceId, setGetMaintenanceId] = useState();
  const [deleteMaintenanceModal] = useGlobalState("deleteMaintenanceModal");
  useEffect(() => {
    if (!showMaintenanceModal) {
      setGlobalState("selectedMaintenance", "");
    }
  }, [showMaintenanceModal]);

  const handleAddMaintenance = () => {
    setGlobalState("showMaintenanceModal", true);
  };

  const handleEditMaintenance = (id, index) => {
    setGetMaintenanceId(id);
    setMaintenanceIndexToEdit(index);
    setGlobalState("selectedMaintenance", houseMaintenanceData);
    setGlobalState("showMaintenanceModal", true);
  };

  const handleDeleteMaintenance = (id) => {
    setGetMaintenanceId(id);
    setGlobalState("deleteMaintenanceModal", true);
  };

  // Notice
  const [noticeState, dispatchNotice] = useReducer(
    add_update_delete_notice,
    []
  );
  const [noticeIndexToEdit, setNoticeIndexToEdit] = useState(null);
  const [showNoticeModal] = useGlobalState("showNoticeModal");
  const { houseNoticeData } =
    useHouseNoticesFetching();
  const [getNoticeId, setGetNoticeId] = useState();
  const [deleteNoticeModal] = useGlobalState("deleteNoticeModal");
  useEffect(() => {
    if (!showNoticeModal) {
      setGlobalState("selectedNotice", "");
    }
  }, [showNoticeModal]);

  const handleAddNotice = () => {
    setGlobalState("showNoticeModal", true);
  };

  const handleEditNotice = (id, index) => {
    setGetNoticeId(id);
    setNoticeIndexToEdit(index);
    setGlobalState("selectedNotice", houseNoticeData);
    setGlobalState("showNoticeModal", true);
  };

  const handleDeleteNotice = (id) => {
    setGetNoticeId(id);
    setGlobalState("deleteNoticeModal", true);
  };

  // Item
  const [itemState, dispatchItem] = useReducer(add_update_delete_item, []);
  const [itemIndexToEdit, setItemIndexToEdit] = useState(null);
  const [showItemModal] = useGlobalState("showItemModal");
  const { houseItemData } =
    useHouseItemsFetching();
  const [getItemId, setGetItemId] = useState();
  const [deleteItemModal] = useGlobalState("deleteItemModal");
  useEffect(() => {
    if (!showItemModal) {
      setGlobalState("selectedItem", "");
    }
  }, [showItemModal]);

  const handleAddItem = () => {
    setGlobalState("showItemModal", true);
  };

  const handleEditItem = (id, index) => {
    setGetItemId(id);
    setItemIndexToEdit(index);
    setGlobalState("selectedItem", houseItemData);
    setGlobalState("showItemModal", true);
  };

  const handleDeleteItem = (id) => {
    setGetItemId(id);
    setGlobalState("deleteItemModal", true);
  };

  // Inspection
  const [inspectionState, dispatchInspection] = useReducer(
    add_update_delete_inspection,
    []
  );
  const [inspectionIndexToEdit, setInspectionIndexToEdit] = useState(null);
  const [showInspectionModal] = useGlobalState("showInspectionModal");
  const {
    houseInspectionData,
  } = useHouseInspectionsFetching();
  const [getInspectionId, setGetInspectionId] = useState();
  const [deleteInspectionModal] = useGlobalState("deleteInspectionModal");
  useEffect(() => {
    if (!showInspectionModal) {
      setGlobalState("selectedInspection", "");
    }
  }, [showInspectionModal]);

  const handleAddInspection = () => {
    setGlobalState("showInspectionModal", true);
  };

  const handleEditInspection = (id, index) => {
    setGetInspectionId(id);
    setInspectionIndexToEdit(index);
    setGlobalState("selectedInspection", houseInspectionData);
    setGlobalState("showInspectionModal", true);
  };

  const handleDeleteInspection = (id) => {
    setGetInspectionId(id);
    setGlobalState("deleteInspectionModal", true);
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

  const vacantRooms = house_rooms?.filter(
    (room) => room.room_status === "Vacant"
  );

  const filteredResidents = houseResidentData?.filter(
    (resident) => resident.house === houseId
  );

  const filteredEmployees = houseEmployeeData?.filter(
    (employee) => employee.house === houseId
  );

  // Checks if the uploaded document contain any of this extentions.
  const regex = /(png|jpg|webp|JPG|PNG)/;

  return (
    <>
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()}/>
      <Sidebar />
      <div className='page-wrapper'>
        <Helmet>
          <title>House Profile - Peepal Tree HRMS</title>
          <meta name="description" content="House Profile" />
        </Helmet>
        <div className="content container-fluid">
          <div className='page-header'>
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Profile</h3>
                <ul className="breadcrumb breadcrumb-nav">
                  <li className="breadcrumb-item">
                    <Link to="/app/accomodation/accomodations">All House</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card mb-0">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-view">
                <div className="profile-img-wrap">
                  {isSelectedLoading ? (
                    <div className="skeleton-container1">
                      <div className="skeleton-avatar1"></div>
                    </div>
                  ) : (
                    <>
                      <div className="profile-img">
                        <a>
                          <img alt="" src={photo ? photo : DefaultImage} />
                        </a>
                      </div>
                    </>
                  )}
                </div>
                <div className="profile-basic">
                  <div className="row">
                    {isSelectedLoading ? (
                      <div className="skeleton-container1">
                        <div className="skeleton-content1">
                          <div className="skeleton-line1"></div>
                          <div className="skeleton-line2"></div>
                          <div className="skeleton-line3"></div>
                          <div className="skeleton-line4"></div>
                          <div className="skeleton-line5"></div>
                          <div className="skeleton-line6"></div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">{`${name}`}</h3>
                            <h6 className="text-muted">
                              Manager:{" "}
                              {allEmployee?.map((allE) => {
                                if (manager === allE.id)
                                  return (
                                    <React.Fragment key={allE.id}>
                                      {`${allE.first_name} ${allE.middle_name} ${allE.last_name}`}
                                    </React.Fragment>
                                  );
                              })}
                            </h6>
                            <h6 className="text-muted">Mobile: {mobile}</h6>
                            <h6 className="text-muted">Email: {email}</h6>
                            <h6 className="text-muted">
                              House Type: {house_type}
                            </h6>
                            <h6 className="text-muted">
                              Roof Type: {roof_type}
                            </h6>
                            <h6 className="text-muted">
                              Floor Type: {floor_type}
                            </h6>
                            <h6 className="text-muted">
                              Garage: {garage ? "True" : "False"}
                            </h6>
                            <h6 className="text-muted">
                              Basement: {basement ? "True" : "False"}
                            </h6>
                            <h6 className="text-muted">
                              Pool: {pool ? "True" : "False"}
                            </h6>
                            <h6 className="text-muted">
                              Back Yard: {back_yard ? "True" : "False"}
                            </h6>
                            <h6 className="text-muted">
                              Air Condition:{" "}
                              {air_conditioning ? "True" : "False"}
                            </h6>
                            <h6 className="text-muted">
                              Heating System:{" "}
                              {heating_system ? "True" : "False"}
                            </h6>
                          </div>
                          <h6 className="text-muted">
                            Fire Place: {fireplace ? "True" : "False"}
                          </h6>
                          <h6 className="text-muted">
                            Security System:{" "}
                            {security_system ? "True" : "False"}
                          </h6>
                          <h6 className="text-muted">
                            Solar Panel: {solar_panels ? "True" : "False"}
                          </h6>
                        </div>

                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Address:</div>
                              <div className="text">
                                <a>{`${street_address}, ${city}`}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">Post Code:</div>
                              <div className="text">
                                <a>{`${postcode}`}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">Year Built:</div>
                              <div className="text">
                                <a>{`${year_built}`}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">Square Footage:</div>
                              <div className="text">
                                <a>{`${square_footage}`}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">No of bedromm:</div>
                              <div className="text">
                                <a>{`${num_bedrooms}`}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">No of bathroom:</div>
                              <div className="text">
                                <a>{`${num_bathrooms}`}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">No of kitchens:</div>
                              <div className="text">
                                <a>{`${num_kitchens}`}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">No of floors:</div>
                              <div className="text">
                                <a>{`${num_floors}`}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">
                                Total no of employees:
                              </div>
                              <div className="text">
                                <a>
                                  {filteredEmployees?.length
                                    ? filteredEmployees?.length
                                    : "0"}
                                </a>
                              </div>
                            </li>
                            <li>
                              <div className="title">
                                Total no of residents:
                              </div>
                              <div className="text">
                                <a>
                                  {filteredResidents?.length
                                    ? filteredResidents?.length
                                    : "0"}
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <li className="nav-item">
                <a href="#notice" data-bs-toggle="tab" className="nav-link">
                  House Notices
                </a>
              </li>
              <li className="nav-item">
                <a href="#item" data-bs-toggle="tab" className="nav-link">
                  House Items
                </a>
              </li>
              <li className="nav-item">
                <a href="#inspection" data-bs-toggle="tab" className="nav-link">
                  House Inspection
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
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Employee{" "}
                        <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {houseEmployeeError?.length > 0 && (
                            <>
                              Error: {houseEmployeeError}
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
                        <a
                          onClick={handleAddHouseEmployye}
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {houseEmployeeData?.length > 0 ? (
                              houseEmployeeData?.map((employees, index) => {
                                const {
                                  id,
                                  employee,
                                  status,
                                  house,
                                  join_date,
                                  end_date,
                                } = employees;
                                if (house === houseId) {
                                  return (
                                    <tr style={{ height: "90px" }} key={id}>
                                      <td>
                                        {allEmployee?.map((allE) => {
                                          if (employee === allE.id)
                                            return (
                                              <React.Fragment key={employee}>
                                                {`${allE.first_name} ${allE.middle_name} ${allE.last_name}`}
                                              </React.Fragment>
                                            );
                                        })}
                                      </td>
                                      <td>{status}</td>
                                      <td className="dropdown dropdown-action text-end">
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
                                      </td>
                                    </tr>
                                  );
                                }
                              })
                            ) : (
                              <tr>
                                <td>Ops! No employee in the house.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Residents{" "}
                        <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {houseResidentError?.length > 0 && (
                            <>
                              Error: {houseResidentError}
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
                        <a
                          onClick={handleAddHouseResident}
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Room</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {houseResidentData?.length > 0 ? (
                              houseResidentData?.map((residents, index) => {
                                const {
                                  id,
                                  status,
                                  house,
                                  room,
                                  resident,
                                  occupancy_start_date,
                                  occupancy_end_date,
                                } = residents;
                                if (house === houseId) {
                                  return (
                                    <tr style={{ height: "90px" }} key={id}>
                                      <td>
                                        {residentData?.map((allR) => {
                                          if (resident === allR.id)
                                            return (
                                              <React.Fragment key={resident}>
                                                {`${allR.first_name} ${allR.middle_name} ${allR.last_name}`}
                                              </React.Fragment>
                                            );
                                        })}
                                      </td>
                                      <td>
                                        {roomData?.map((allR) => {
                                          if (room === allR.id)
                                            return (
                                              <React.Fragment key={room}>
                                                {`${allR.name}`}
                                              </React.Fragment>
                                            );
                                        })}
                                      </td>
                                      <td>{status}</td>
                                      <td className="dropdown dropdown-action text-end">
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
                                      </td>
                                    </tr>
                                  );
                                }
                              })
                            ) : (
                              <tr>
                                <td>Ops! No resident in the house.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
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
                    <h3 className="card-title">
                      Maintenance {""}
                      <span style={{ color: "red", fontSize: "0.7rem" }}>
                        {maintenanceError?.length > 0 && (
                          <>
                            Error: {maintenanceError}
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
                      <a onClick={handleAddMaintenance} className="edit-icon">
                        <i className="fa fa-plus" />
                      </a>
                    </h3>
                    {houseMaintenanceData?.length > 0
                      ? houseMaintenanceData?.map((maintenance, index) => {
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
                          if (house === houseId) {
                            return (
                              <React.Fragment key={id}>
                                <ul className="personal-info">
                                  <li>
                                    <span className="text">
                                      Status: {status}
                                    </span>
                                    <span className="text">Cost: {cost}</span>
                                    <span className="text">Date: {date}</span>
                                    <span className="text">
                                      Employee: {""}
                                      {allEmployee?.map((allE) => {
                                        if (Employee === allE.id)
                                          return (
                                            <React.Fragment key={allE.id}>
                                              {`${allE.first_name} ${allE.middle_name} ${allE.last_name}`}
                                            </React.Fragment>
                                          );
                                      })}
                                    </span>
                                    <span className="text">
                                      Organization: {""}
                                      {organisationData?.map((org) => {
                                        if (Organization === org.id)
                                          return (
                                            <React.Fragment key={org.id}>
                                              {`${org.organisation_name}`}
                                            </React.Fragment>
                                          );
                                      })}
                                    </span>
                                    <span className="text">
                                      Document: {documents}
                                    </span>
                                    <span className="text">
                                      Before Image: {Before_Image}
                                    </span>
                                    <span className="text">
                                      After Image: {After_Image}
                                    </span>
                                    <span className="text">
                                      Description: {description}
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
                                            handleEditMaintenance(id, index)
                                          }
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleDeleteMaintenance(id)
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
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="card-title">
                  House Images {""}
                  <span style={{ color: "red", fontSize: "0.7rem" }}>
                    {houseImageError?.length > 0 && (
                      <>
                        Error: {houseImageError}
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
                          <>
                            <div key={id} className="col-md-6 d-flex">
                              <div className="card profile-box flex-fill">
                                <div className="card-body">
                                  <ul className="personal-info">
                                    <li>
                                      <span className="text">
                                        <img
                                          style={{
                                            // maxWidth: "800px",
                                            // maxHeight: "400px",
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                          }}
                                          alt=""
                                          src={image ? image : DefaultImage}
                                        />
                                      </span>
                                      <span className="text">{name}</span>
                                      <span className="text">
                                        {description}
                                      </span>
                                      <span className="text">
                                        {cover_image}
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
                                              handleFileDownload(image)
                                            }
                                          >
                                            <i className="fa fa-download m-r-5" />{" "}
                                            Download
                                          </a>
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
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })
                  : "Ops! No Image"}
              </>
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
                    <h3 className="card-title">
                      House Bills {""}
                      <span style={{ color: "red", fontSize: "0.7rem" }}>
                        {houseBillError?.length > 0 && (
                          <>
                            Error: {houseBillError}
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
                      <a onClick={handleAddBill} className="edit-icon">
                        <i className="fa fa-plus" />
                      </a>
                    </h3>
                    {billData?.length > 0
                      ? billData?.map((bills, index) => {
                          const {
                            title,
                            id,
                            date,
                            amount,
                            house,
                            paid,
                            documents,
                          } = bills;
                          if (house == houseId) {
                            return (
                              <React.Fragment key={id}>
                                <ul className="personal-info">
                                  <li>
                                    <span className="text">Title: {title}</span>
                                    <span className="text">
                                      Amount: {amount}
                                    </span>
                                    <span className="text">Paid: {paid}</span>
                                    <span className="text">
                                      Document: {documents}
                                    </span>
                                    <span className="text">Date: {date}</span>
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
                                            handleEditBill(id, index)
                                          }
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleDeleteBill(id)}
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
                      House Rooms {""}
                      <span style={{ color: "red", fontSize: "0.7rem" }}>
                        {roomError?.length > 0 && (
                          <>
                            Error: {roomError}
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
              <div className="col-md-12 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        House Document {""}
                        <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {houseDocumentError?.length > 0 && (
                            <>
                              Error: {houseDocumentError}
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
                        <a
                          onClick={handleAddHouseDocuments}
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <Wrapper>
                        {houseDocumentsData?.length > 0 ? (
                          houseDocumentsData.map((doc, index) => {
                            const {
                              id,
                              house,
                              title,
                              valid_from,
                              expiry_date,
                              file,
                              status,
                              description,
                            } = doc;
                            if (house == houseId) {
                              return (
                                <div key={id} className="card">
                                  <a className="name">
                                    Document Name: {title}
                                    <span
                                      className="edit-icon"
                                      style={{
                                        background: "none",
                                        border: "none",
                                      }}
                                    >
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
                                              handleFileDownload(
                                                file
                                              )
                                            }
                                          >
                                            <i className="fa fa-download m-r-5" />{" "}
                                            Download
                                          </a>
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
                                    </span>
                                  </a>
                                  <span>
                                    Valid From: {""}
                                    {moment(valid_from).format("DD MMM YYYY")} - To: {" "}
                                    {expiry_date &&
                                      moment(expiry_date).format("DD MMM YYYY")}
                                  </span>
                                  <div>Status: {status}</div>
                                  <div>Description: {description}</div>
                                  <div>
                                    {file &&
                                    regex.test(file) ? (
                                      <img
                                        className="img-preview"
                                        src={file}
                                        alt="Preview"
                                      />
                                    ) : !file ? null : (
                                      <span className="files-icon">
                                        <i className="fa fa-file-pdf-o" />
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          })
                        ) : (
                          <></>
                        )}
                      </Wrapper>
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
        {/* Maintenance Info Tab */}
        <div id="notice" className="tab-pane fade">
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
                      Notice {""}
                      <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {houseNoticeError?.length > 0 && (
                            <>
                              Error: {houseNoticeError}
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
                      <a onClick={handleAddNotice} className="edit-icon">
                        <i className="fa fa-plus" />
                      </a>
                    </h3>
                    {houseNoticeData?.length > 0
                      ? houseNoticeData?.map((notice, index) => {
                          const {
                            title,
                            id,
                            description,
                            notice_date,
                            house,
                            residents_applicable,
                            documents,
                          } = notice;
                          if (house === houseId) {
                            return (
                              <React.Fragment key={id}>
                                <ul className="personal-info">
                                  <li>
                                    <span className="text">Title: {title}</span>
                                    <span className="text">
                                      Notice Date: {notice_date}
                                    </span>

                                    <span className="text">
                                      Resident Applicable:{" "}
                                      {residents_applicable}
                                    </span>
                                    <span className="text">
                                      Document: {documents}
                                    </span>
                                    <span className="text">
                                      Description: {description}
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
                                            handleEditNotice(id, index)
                                          }
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleDeleteNotice(id)}
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
                      : "Ops!"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* /Notice Info Tab */}
        {/* Item Info Tab */}
        <div id="item" className="tab-pane fade">
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
                      Items {""}
                      <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {houseItemError?.length > 0 && (
                            <>
                              Error: {houseItemError}
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
                      <a onClick={handleAddItem} className="edit-icon">
                        <i className="fa fa-plus" />
                      </a>
                    </h3>
                    {houseItemData?.length > 0
                      ? houseItemData?.map((items, index) => {
                          const {
                            name,
                            id,
                            description,
                            expiry_date,
                            category,
                            house,
                            documents,
                            quantity,
                            purchase_date,
                            location,
                          } = items;
                          if (house === houseId) {
                            return (
                              <React.Fragment key={id}>
                                <ul className="personal-info">
                                  <li>
                                    <span className="text">Name: {name}</span>
                                    <span className="text">
                                      Category: {category}
                                    </span>
                                    <span className="text">
                                      Expiry Date: {expiry_date}
                                    </span>
                                    <span className="text">
                                      Location: {location}
                                    </span>

                                    <span className="text">
                                      Document: {documents}
                                    </span>
                                    <span className="text">
                                      Quantity: {quantity}
                                    </span>
                                    <span className="text">
                                      Purchase Date: {purchase_date}
                                    </span>
                                    <span className="text">
                                      Description: {description}
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
                                            handleEditItem(id, index)
                                          }
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleDeleteItem(id)}
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
                      : "Ops!"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* /Item Info Tab */}
        {/* Inspection Info Tab */}
        <div id="inspection" className="tab-pane fade">
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
                      Inspection {""}
                      <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {houseInspectionError?.length > 0 && (
                            <>
                              Error: {houseInspectionError}
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
                      <a onClick={handleAddInspection} className="edit-icon">
                        <i className="fa fa-plus" />
                      </a>
                    </h3>
                    {houseInspectionData?.length > 0
                      ? houseInspectionData?.map((inspect, index) => {
                          const {
                            inspection_status,
                            id,
                            comments,
                            inspection_date,
                            inspected_by,
                            house,
                            documents,
                            house_item,
                          } = inspect;
                          if (house === houseId) {
                            return (
                              <React.Fragment key={id}>
                                <ul className="personal-info">
                                  <li>
                                    <span className="text">
                                      Inspection Status: {inspection_status}
                                    </span>
                                    <span className="text">
                                      Inspected By: {inspected_by}
                                    </span>
                                    <span className="text">
                                      Inspection Date: {inspection_date}
                                    </span>

                                    <span className="text">
                                      Document: {documents}
                                    </span>
                                    <span className="text">
                                      House Item: {house_item}
                                    </span>
                                    <span className="text">
                                      Comment: {comments}
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
                                            handleEditInspection(id, index)
                                          }
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleDeleteInspection(id)
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
                      : "Ops!"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* /Inspection Info Tab */}
      </div>
        </div>
      </div>
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
          roomData={vacantRooms}
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
          modalTitle={"House Room"}
        />
      )}

      {/* House Bill Modals */}
      {showBillModal && (
        <AddHouseBills
          house={houseId}
          dispatchBill={dispatchBill}
          billIndexToEdit={billIndexToEdit}
          id={getBillId}
        />
      )}
      {deleteBillModal && (
        <DeleteModal
          deleteAction={dispatchBill}
          iDToDelete={getBillId}
          modalTitle={"House Bill"}
        />
      )}

      {/* House Maintenance Modals */}
      {showMaintenanceModal && (
        <AddHouseMaintenance
          house={houseId}
          dispatchMaintenance={dispatchMaintenance}
          maintenanceIndexToEdit={maintenanceIndexToEdit}
          id={getMaintenanceId}
        />
      )}
      {deleteMaintenanceModal && (
        <DeleteModal
          deleteAction={dispatchMaintenance}
          iDToDelete={getMaintenanceId}
          modalTitle={"House Maintenance"}
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

      {/* House Notice Modals */}
      {showNoticeModal && (
        <AddHouseNotice
          house={houseId}
          dispatchNotice={dispatchNotice}
          noticeIndexToEdit={noticeIndexToEdit}
          id={getNoticeId}
        />
      )}
      {deleteNoticeModal && (
        <DeleteModal
          deleteAction={dispatchNotice}
          iDToDelete={getNoticeId}
          modalTitle={"House Notice"}
        />
      )}

      {/* House Item Modals */}
      {showItemModal && (
        <AddHouseItem
          house={houseId}
          dispatchItem={dispatchItem}
          itemIndexToEdit={itemIndexToEdit}
          id={getItemId}
        />
      )}
      {deleteItemModal && (
        <DeleteModal
          deleteAction={dispatchItem}
          iDToDelete={getItemId}
          modalTitle={"House Item"}
        />
      )}

      {/* House Inspection Modals */}
      {showInspectionModal && (
        <AddHouseInspection
          house={houseId}
          dispatchInspection={dispatchInspection}
          inspectionIndexToEdit={inspectionIndexToEdit}
          id={getInspectionId}
        />
      )}
      {deleteInspectionModal && (
        <DeleteModal
          deleteAction={dispatchInspection}
          iDToDelete={getInspectionId}
          modalTitle={"House Inspection"}
        />
      )}
    </>
  );
};
export default HouseDetails;