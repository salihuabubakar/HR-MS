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
import { Popup, Segment  } from "semantic-ui-react";
import { CardWidth } from '../Employees/Employees/styles';
import PopUpText from '../../_components/modelbox/PopUpText';
import { EmployeeImgCard, BillCard } from '../Employees/Employees/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useMediaQuery } from "react-responsive";
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
import { handleFileDownload } from '../../utils/helperFucntions';
import Gallery from './Components/Gallery';
import './style.css'
import './Components/calendar.css'
import DisplayFileType from '../../_components/fileExtension';
import ResAppointment from './Components/ResAppointment';

const HouseDetails = () => {
  const location = useLocation();
  let getHouseId = location?.state?.id;
  const [isSelectedLoading, setIsSelectedLoading] = useState(false);
  const [getSelectedData, setGetSelectedData] = useState();

// This is staging branch

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
  const [noticeIndexToEdit, setNoticeIndexToEdit] = useState();
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
    (resident) => resident.house === houseId && resident.status === "Active"
  );

  const filteredEmployees = houseEmployeeData?.filter(
    (employee) => employee.house === houseId && employee.status === "Active"
  );

  // Checks if the uploaded document contain any of this extentions.
  const regex = /(png|jpg|webp|JPG|PNG)/;


  const barchartdata = [
    {
      name: 'Employee',
      Total: filteredEmployees?.length
      ? filteredEmployees?.length
      : "0",
    },
    {
      name: 'Resident',
      Total: filteredResidents?.length
      ? filteredResidents?.length
      : "0",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="desc"></p>
        </div>
      );
    }
  
    return null;
  };

  const isMobile = useMediaQuery({ maxWidth: 768 }); // Define your mobile breakpoint

  const chartWidth = isMobile ? 300 : 500; // Adjust the chart width based on screen size
  const chartHeight = isMobile ? 200 : 300; // Adjust the chart height based on screen size

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
                            <Popup
                              inline
                              hoverable
                              position="bottom center"
                              delay={{
                                show: 300,
                                hide: 800,
                              }}
                              content={
                                <Segment.Group>
                                      <Segment style={{ width: "250px" }}>
                                        <div className="ui column relaxed divided grid">
                                          <div className="column">
                                            <div className="ui link list">
                                              <a className="item">{`House Type: ${house_type}`}</a>
                                              <a className="item">{`Roof Type: ${roof_type}`}</a>
                                              <a className="item">{`Floor Type: ${floor_type}`}</a>
                                              <a className="item">{`Garage: ${garage ? "True" : "False"}`}</a>
                                              <a className="item">{`Basement: ${basement ? "True" : "False"}`}</a>
                                              <a className="item">{`Pool: ${pool ? "True" : "False"}`}</a>
                                              <a className="item">{`Back Yard: ${back_yard ? "True" : "False"}`}</a>
                                              <a className="item">{`Air Condition: ${air_conditioning ? "True" : "False"}`}</a>
                                              <a className="item">{`Heating System: ${heating_system ? "True" : "False"}`}</a>
                                              <a className="item">{`Security System: ${security_system ? "True" : "False"}`}</a>
                                              <a className="item">{`Solar Panel: ${solar_panels ? "True" : "False"}`}</a>
                                            </div>
                                          </div>
                                        </div>
                                      </Segment>
                                </Segment.Group>
                              }
                              trigger={
                                  <a>
                                    View More
                                  </a>
                              }
                            />
                            <h6 style={{ width: "10px", height: "10px" }} className="text-muted"></h6>
                          </div>
                        </div>

                        <div className="col-md-7 profile-right-div">
                          <ul className="personal-info">
                            <Popup
                              inline
                              hoverable
                              position="bottom left"
                              delay={{
                                show: 300,
                                hide: 800,
                              }}
                              content={
                                <Segment.Group>
                                      <Segment style={{ width: "250px" }}>
                                        <div className="ui column relaxed divided grid">
                                          <div className="column">
                                            <div className="ui link list">
                                              <a className="item">{`Address: ${street_address}, ${city}`}</a>
                                              <a className="item">{`Post Code: ${postcode}`}</a>
                                              <a className="item">{`Year Built: ${year_built}`}</a>
                                              <a className="item">{`Square Footage: ${square_footage}`}</a>
                                              <a className="item">{`No of bedromm: ${num_bedrooms}`}</a>
                                              <a className="item">{`No of bathroom: ${num_bathrooms}`}</a>
                                              <a className="item">{`No of kitchens: ${num_kitchens}`}</a>
                                              <a className="item">{`No of floors: ${num_floors}`}</a>
                                            </div>
                                          </div>
                                        </div>
                                      </Segment>
                                </Segment.Group>
                              }
                              trigger={
                                  <a>
                                    View More
                                  </a>
                              }
                            />
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
                  href="#dashboard"
                  data-bs-toggle="tab"
                  className="nav-link active"
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#persons"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  Persons
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#appointment"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  Appointments
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
      {/* Dashboard Info Tab */}
      <div id="dashboard" className="pro-overview tab-pane fade show active">
            {isSelectedLoading ? (
              <div className="skeleton-container-profile">
                <div className="skeleton-content-profile">
                  <div className="skeleton-line-profile"></div>
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <>
                <div class="row">
                  {/* <div className="col-lg-12">
                    <div className="card bg-white calendarIndex">
                      <div className="card-header">
				                <h4 className="card-title mb-0">
                          Residents appointment
                        </h4>
				              </div>
                      <div className="card-body">
                        <ResAppointment 
                          houseId={houseId}
                          houseResidentData={houseResidentData}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
				                <h4 className="card-title mb-0">
                          Chart
                        </h4>
				              </div>
                      <div style={{display: "flex", justifyContent: "center"}} className="card-body text-center">
                        <div>
                          <h3 className="card-title">Total No of Employee/Resident</h3>
                          <BarChart
                            width={chartWidth}
                            height={300}
                            data={barchartdata}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="Total" barSize={20} fill="#ff9b44" />
                          </BarChart>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>
        {/* /Dashboard Info Tab */}
        {/* Appointment Tab */}
        <div className="tab-pane fade" id="appointment">
                {isSelectedLoading ? (
                  <div className="skeleton-container-profile">
                    <div className="skeleton-content-profile">
                      <div className="skeleton-line-profile"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row">
                    <div className="col-lg-12">
				              <div className="card bg-white calendarIndex">
				              	<div className="card-header">
				              	  <h4 className="card-title mb-0">
                            Resident Appointments
                          </h4>
				              	</div>
                        <div className="card-body">
                          <ResAppointment 
                            houseId={houseId}
                            houseResidentData={houseResidentData}
                          />
								        </div>
				                </div>
				              </div>
                    </div>
                  </>
                )}
              </div>
              {/* /Appointment Tab */}
        {/* Resident Info Tab */}
        <div id="persons" className="tab-pane fade">
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
                    <div className="card-header">
				              <h4 className="card-title mb-0">
                        Employee {""}
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
                          className="edit-icon"
                          onClick={handleAddHouseEmployye}
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h4>
				            </div>
                    <div className="card-body">
                      <Wrapper>
                        {houseEmployeeData?.length > 0 ? (
                          houseEmployeeData.map((employees, index) => {
                            const {
                              id,
                              employee,
                              status,
                              house,
                              join_date,
                              end_date,
                            } = employees;
                            if (house === houseId && status === "Active") {
                              return (
                                <EmployeeImgCard key={id} className="card employee-img-card">
                                  <span style={{width: "90%"}}>
                                    <Popup
                                      inline
                                      hoverable
                                      position="bottom left"
                                      delay={{
                                        show: 300,
                                        hide: 800,
                                      }}
                                      content={
                                        <Segment.Group>
                                              <Segment style={{ width: "250px" }}>
                                                <div className="ui column relaxed divided grid">
                                                  <div className="column">
                                                    <h4>
                                                    {allEmployee?.map((allE) => {
                                                      if (employee === allE.id)
                                                        return (
                                                          <React.Fragment key={employee}>
                                                            {`${allE.first_name} ${allE.middle_name} ${allE.last_name}`}
                                                          </React.Fragment>
                                                        );
                                                    })}
                                                    </h4>
                                                    <div className="ui link list">
                                                      {join_date && (
                                                        <a className="item">{`Start Date: ${moment(join_date).format("DD MMM YYYY")}`}</a>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </Segment>
                                        </Segment.Group>
                                      }
                                      trigger={
                                          <a style={{color: "black"}}>
                                            {allEmployee?.map((allE) => {
                                              if (employee === allE.id)
                                                return (
                                                  <React.Fragment key={allE.id}>
                                                    <h2 className="table-avatar">
                                                      <Link
                                                        to="#"
                                                        onClick={(e) => e.preventDefault()}
                                                        className="avatar"
                                                        style={{
                                                          borderRadius: "5px",
                                                          backgroundColor: "#00000000",
                                                          height: "100%",
                                                        }}
                                                      >
                                                        <img
                                                          style={{ width: "40px", height: "40px" }}
                                                          alt=""
                                                          src={allE.photo ? allE.photo : DefaultImage}
                                                        />
                                                      </Link>
                                                    </h2>
                                                  </React.Fragment>
                                                );
                                            })}
                                          </a>
                                      }
                                    />
                                  </span>
                                  <span
                                    className="edit-icon"
                                  >
                                    <div className="dropdown dropdown-action text-end">
                                      <a
                                        className="action-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="material-icons">more_vert</i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleEditHouseEmployee(id, index)}
                                        >
                                          <i className="fa fa-pencil m-r-5" /> Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleDeleteHouseEmployee(id)}
                                        >
                                          <i className="fa fa-trash-o m-r-5" /> Delete
                                        </a>
                                      </div>
                                    </div>
                                  </span>
                                </EmployeeImgCard>
                              );
                            }
                          })
                        ) : (
                          <><p>Ops! No employee in the house.</p></>
                        )}
                      </Wrapper>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-header">
				              <h4 className="card-title mb-0">
                        Residents {""}
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
                          className="edit-icon"
                          onClick={handleAddHouseResident}
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h4>
				            </div>
                    <div className="card-body">
                      <Wrapper>
                        {houseResidentData?.length > 0 ? (
                          houseResidentData.map((residents, index) => {
                            const {
                              id,
                              status,
                              house,
                              room,
                              resident,
                              occupancy_start_date,
                              occupancy_end_date,
                            } = residents;
                            if (house === houseId && status === "Active") {
                              return (
                                <EmployeeImgCard key={id} className="card employee-img-card">
                                  <span style={{width: "90%"}}>
                                    <Popup
                                      inline
                                      hoverable
                                      position="bottom left"
                                      delay={{
                                        show: 300,
                                        hide: 800,
                                      }}
                                      content={
                                        <Segment.Group>
                                              <Segment style={{ width: "250px" }}>
                                                <div className="ui column relaxed divided grid">
                                                  <div className="column">
                                                    <h4>
                                                    {residentData?.map((allR) => {
                                                      if (resident === allR.id)
                                                        return (
                                                          <React.Fragment key={allR.id}>
                                                            {`${allR.first_name} ${allR.middle_name} ${allR.last_name}`}
                                                          </React.Fragment>
                                                        );
                                                    })}
                                                    </h4>
                                                    <div className="ui link list">
                                                      <a className="item">
                                                      {roomData?.map((allR) => {
                                                        if (room === allR.id)
                                                          return (
                                                            <React.Fragment key={room}>
                                                              {`Room: ${allR.name}`}
                                                            </React.Fragment>
                                                          );
                                                      })}
                                                      </a>
                                                      {occupancy_start_date && (
                                                        <a className="item">{`Start Date: ${moment(occupancy_start_date).format("DD MMM YYYY")}`}</a>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </Segment>
                                        </Segment.Group>
                                      }
                                      trigger={
                                          <a style={{color: "black"}}>
                                            {residentData?.map((allR) => {
                                              if (resident === allR.id)
                                                return (
                                                  <React.Fragment key={resident}>
                                                    <h2 className="table-avatar">
                                                      <Link
                                                        to="#"
                                                        onClick={(e) => e.preventDefault()}
                                                        className="avatar"
                                                        style={{
                                                          borderRadius: "5px",
                                                          backgroundColor: "#00000000",
                                                          height: "100%",
                                                        }}
                                                      >
                                                        <img
                                                          style={{ width: "40px", height: "40px" }}
                                                          alt=""
                                                          src={allR.photo ? allR.photo : DefaultImage}
                                                        />
                                                      </Link>
                                                    </h2>
                                                  </React.Fragment>
                                                );
                                            })}
                                          </a>
                                      }
                                    />
                                  </span>
                                  <span
                                    className="edit-icon"
                                  >
                                    <div className="dropdown dropdown-action text-end">
                                      <a
                                        className="action-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="material-icons">more_vert</i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleEditHouseResident(id, index)}
                                        >
                                          <i className="fa fa-pencil m-r-5" /> Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleDeleteHouseResident(id)}
                                        >
                                          <i className="fa fa-trash-o m-r-5" /> Delete
                                        </a>
                                      </div>
                                    </div>
                                  </span>
                                </EmployeeImgCard>
                              );
                            }
                          })
                        ) : (
                          <><p>Ops! No resident in the house.</p></>
                        )}
                      </Wrapper>
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
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="col-lg-12">
				          <div className="card">
				        	<div className="card-header">
				        	  <h4 className="card-title mb-0">
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
                    </h4>
				        	</div>
				        	<div className="card-body">
				        	  <div className="table-responsive">
				        		<table className="table table-striped mb-0">
				        		  <thead>
				        			<tr>
				        			  <th>Status</th>
				        			  <th>Employee</th>
				        			  <th>Organization</th>
                        <th>Cost</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Document</th>
                        <th>After Image</th>
                        <th>Before Image</th>
                        <th>Action</th>
				        			</tr>
				        		  </thead>
				        		  <tbody>
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
                                <tr>
				        			            <td>
                                      <span
                                      className={
                                        (status === "Progress" && "badge bg-inverse-info") ||
                                        (status === "Pending" && "badge bg-inverse-warning") ||
                                        (status === "Completed" && "badge bg-inverse-success")
                                      }
                                    >
                                      {status}
                                    </span>
                                  </td>
                                  <td>
                                    {allEmployee?.map((allE) => {
                                        if (Employee === allE.id)
                                          return (
                                            <React.Fragment key={allE.id}>
                                              {`${allE.first_name} ${allE.middle_name} ${allE.last_name}`}
                                            </React.Fragment>
                                          );
                                    })}
                                  </td>
				        			            <td>
                                    {organisationData?.map((org) => {
                                      if (Organization === org.id)
                                        return (
                                          <React.Fragment key={org.id}>
                                            {`${org.organisation_name}`}
                                          </React.Fragment>
                                        );
                                    })}
                                  </td>
                                  <td>{cost}</td>
                                  <td>{date}</td>
                                  {description ? (
                                      <td><PopUpText text={description}/></td>
                                    ) : <td></td>
                                  }
                                  <td>
                                    <Popup
                                      inline
                                      hoverable
                                      position="bottom left"
                                      delay={{
                                        show: 300,
                                        hide: 800,
                                      }}
                                      content={
                                        <Segment.Group>
                                          <Segment style={{ width: "250px" }}>
                                            <div className="ui column relaxed divided grid">
                                              <div className="column">
                                                <div className="ui link list">
                                                  {houseDocumentsData?.map((doc) => {
                                                      if (documents.includes(doc.id))
                                                        return (
                                                          <a key={doc.id} className="item">
                                                            {`Doc: ${doc.title}`}
                                                          </a>
                                                        );
                                                    })}
                                                </div>
                                              </div>
                                            </div>
                                          </Segment>
                                        </Segment.Group>
                                      }
                                      trigger={
                                        <span style={{
                                          display: "inline-block",
                                          padding: "0.5em 1em",
                                          border: "1px solid #ccc",
                                          borderRadius: "4px",
                                        }}>
                                          Hover/Click to show
                                        </span>
                                      }
                                    />
                                  </td>
                                  <td>
                                    <Popup
                                      inline
                                      hoverable
                                      position="bottom left"
                                      delay={{
                                        show: 300,
                                        hide: 800,
                                      }}
                                      content={
                                        <Segment.Group>
                                          <Segment style={{ width: "250px" }}>
                                            <div className="ui column relaxed divided grid">
                                              <div className="column">
                                                <div className="ui link list">
                                                {houseImagesData?.map((img) => {
                                                    if (Before_Image.includes(img.id))
                                                      return (
                                                        <React.Fragment key={img.id}>
                                                          <a key={img.id} className="item">
                                                            {`Img: ${img.name}`}
                                                          </a>
                                                        </React.Fragment>
                                                      );
                                                })}
                                                </div>
                                              </div>
                                            </div>
                                          </Segment>
                                        </Segment.Group>
                                      }
                                      trigger={
                                        <span style={{
                                          display: "inline-block",
                                          padding: "0.5em 1em",
                                          border: "1px solid #ccc",
                                          borderRadius: "4px",
                                        }}>
                                          Hover/Click to show
                                        </span>
                                      }
                                    />
                                  </td>
                                  <td>
                                    <Popup
                                      inline
                                      hoverable
                                      position="bottom left"
                                      delay={{
                                        show: 300,
                                        hide: 800,
                                      }}
                                      content={
                                        <Segment.Group>
                                          <Segment style={{ width: "250px" }}>
                                            <div className="ui column relaxed divided grid">
                                              <div className="column">
                                                <div className="ui link list">
                                                {houseImagesData?.map((img) => {
                                                    if (After_Image.includes(img.id))
                                                      return (
                                                        <React.Fragment key={img.id}>
                                                          <a key={img.id} className="item">
                                                            {`Img: ${img.name}`}
                                                          </a>
                                                        </React.Fragment>
                                                      );
                                                })}
                                                </div>
                                              </div>
                                            </div>
                                          </Segment>
                                        </Segment.Group>
                                      }
                                      trigger={
                                        <span style={{
                                          display: "inline-block",
                                          padding: "0.5em 1em",
                                          border: "1px solid #ccc",
                                          borderRadius: "4px",
                                        }}>
                                          Hover/Click to show
                                        </span>
                                      }
                                    />
                                  </td>
                                  <td className="dropdown dropdown-action text-end">
                                    <a
                                      className="action-icon dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="material-icons">more_vert</i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleEditMaintenance(id, index)}
                                      >
                                        <i className="fa fa-pencil m-r-5" /> Edit
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleDeleteMaintenance(id)}
                                      >
                                        <i className="fa fa-trash-o m-r-5" /> Delete
                                      </a>
                                    </div>
                                  </td>
				        			          </tr>
                                </React.Fragment>
                              );
                            }
                          })
                        : "Ops! No Data"}
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
                <Gallery 
                  data={houseImagesData} 
                  onLoading={isHouseImagesLoading} 
                  houseId={houseId}
                  handleFileDownload={handleFileDownload}
                  handleEditHouseImages={handleEditHouseImages}
                  handleDeleteHouseImages={handleDeleteHouseImages}
                />
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
              <div className="col-md-12 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-header">
				            <h4 className="card-title mb-0">
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
                      <a
                        onClick={handleAddBill}
                        className="edit-icon"
                      >
                        <i className="fa fa-plus" />
                      </a>
                    </h4>
				          </div>
                  <div className="card-body">
                    <Wrapper>
                      {billData?.length > 0 ? (
                        billData.map((bills, index) => {
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
                              <BillCard style={{position: "relative"}} key={id} className="card bill-card">
                                <span style={{width: "90%"}}>
                                  <Popup
                                    inline
                                    hoverable
                                    position="bottom left"
                                    delay={{
                                      show: 300,
                                      hide: 800,
                                    }}
                                    content={
                                      <Segment.Group>
                                            <Segment style={{ width: "250px" }}>
                                              <div className="ui column relaxed divided grid">
                                                <div className="column">
                                                  <h4>{title}</h4>
                                                  <div className="ui link list">
                                                    <a className="item">{`Amount: ${amount ? amount : '--'}`}</a>
                                                    <a className="item">{`Paid: ${paid ? paid : '--'}`}</a>
                                                    <a className="item">{`Date: ${date}`}</a>
                                                    {houseDocumentsData?.map((doc) => {
                                                          if (documents.includes(doc.id))
                                                            return (
                                                              <a key={doc.id} className="item">
                                                                {`Doc: ${doc.title}`}
                                                              </a>
                                                            );
                                                      })}
                                                  </div>
                                                </div>
                                              </div>
                                            </Segment>
                                      </Segment.Group>
                                    }
                                    trigger={
                                      <a style={{color: "black"}}>
                                        {title}
                                      </a>
                                    }
                                  />
                                </span>
                                <span
                                  className="edit-icon"
                                >
                                  <div className="dropdown dropdown-action text-end">
                                    <a
                                      className="action-icon dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="material-icons">more_vert</i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleEditBill(id, index)}
                                      >
                                        <i className="fa fa-pencil m-r-5" /> Edit
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleDeleteBill(id)}
                                      >
                                        <i className="fa fa-trash-o m-r-5" /> Delete
                                      </a>
                                    </div>
                                  </div>
                                </span>
                              </BillCard>
                            );
                          }
                        })
                      ) : (
                        <>Ops! No Bill</>
                      )}
                    </Wrapper>
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
              <div className="col-md-12 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-header">
				            <h4 className="card-title mb-0">
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
                    </h4>
				          </div>
                  <div className="card-body">
                    <Wrapper>
                      {roomData?.length > 0 ? (
                        roomData.map((room, index) => {
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
                              <BillCard style={{position: "relative"}} key={id} className="card bill-card">
                                <span style={{width: "90%"}}>
                                  <Popup
                                    inline
                                    hoverable
                                    position="bottom left"
                                    delay={{
                                      show: 300,
                                      hide: 800,
                                    }}
                                    content={
                                      <Segment.Group>
                                            <Segment style={{ width: "250px" }}>
                                              <div className="ui column relaxed divided grid">
                                                <div className="column">
                                                  <h4>{name}</h4>
                                                  <div className="ui link list">
                                                    <a className="item">{`Room status: ${room_status}`}</a>
                                                    <a className="item">{`Room Type: ${room_type}`}</a>
                                                    <a className="item">Des: <PopUpText text={room_description}/></a>
                                                    {houseImagesData?.map((img) => {
                                                        if (room_photos.includes(img.id))
                                                          return (
                                                            <a key={img.id} className="item">{`Room Photos: ${img.name}`}</a>
                                                          );
                                                    })}
                                                  </div>
                                                </div>
                                              </div>
                                            </Segment>
                                      </Segment.Group>
                                    }
                                    trigger={
                                      <a style={{color: "black"}}>
                                        {name}
                                      </a>
                                    }
                                  />
                                </span>
                                <span
                                  className="edit-icon"
                                >
                                  <div className="dropdown dropdown-action text-end">
                                    <a
                                      className="action-icon dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="material-icons">more_vert</i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleEdditRoom(id, index)}
                                      >
                                        <i className="fa fa-pencil m-r-5" /> Edit
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleDeleteRoom(id)}
                                      >
                                        <i className="fa fa-trash-o m-r-5" /> Delete
                                      </a>
                                    </div>
                                  </div>
                                </span>
                              </BillCard>
                            );
                          }
                        })
                      ) : (
                        <>Ops! No Room in the house</>
                      )}
                    </Wrapper>
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
                    <div className="card-header">
				              <h4 className="card-title mb-0">
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
                      </h4>
				            </div>
                    <div className="card-body">
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
                                <CardWidth key={id} className="card card-width card-file col-6 col-sm-4 col-md-3 col-lg-6 col-xl-3">
                                  <div className="dropdown-file">
                                    <a href="" className="dropdown-link" data-bs-toggle="dropdown"><i className="fa fa-ellipsis-v" /></a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleEditHouseDocuments(id, index)
                                        }
                                      >
                                        <i className="fa fa-pencil m-r-5" /> Edit
                                      </a>
                                      {file && (
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleFileDownload(file)
                                          }
                                        >
                                          <i className="fa fa-download m-r-5" /> Download
                                        </a>
                                      )}
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleDeleteHouseDocuments(id)}
                                      >
                                        <i className="fa fa-trash-o m-r-5" /> Delete
                                      </a>
                                    </div>
                                  </div>
                                  <div className="card-file-thumb">
                                    {file &&
                                      regex.test(file) ? (
                                        <img
                                          className="img-preview doc-image"
                                          src={file}
                                          alt="Preview"
                                        />
                                      ) : !file ? (
                                        <span>No File</span>
                                      ) : (
                                        <DisplayFileType file={file} />
                                    )}
                                  </div>
                                  <div className="card-body">
                                    <h6>
                                      <a href="">
                                        <Popup
                                          inline
                                          hoverable={true}
                                          position="top left"
                                          delay={{
                                            show: 300,
                                            hide: 800,
                                          }}
                                          content={
                                            <Segment.Group>
                                                  <Segment style={{ width: "250px" }}>
                                                    <div className="ui column relaxed divided grid">
                                                      <div className="column">
                                                        <h4>{`Doc Name: ${title}`}</h4>
                                                        <div className="ui link list">
                                                          <a className="item">{`Valid From: ${valid_from}`}</a>
                                                          <a className="item">{`Expiry Date: ${expiry_date}`}</a>
                                                          <a className="item">
                                                              {description && description && (
                                                                  <>
                                                                    <div className="text">
                                                                      Description:{" "}
                                                                      <span>
                                                                        <PopUpText text={description}/>
                                                                      </span>
                                                                    </div>
                                                                  </>
                                                                )}
                                                            </a>
                                                          <a className="item">{`Status: ${status}`}</a>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </Segment>
                                            </Segment.Group>
                                          }
                                          trigger={
                                              <a style={{color: "black"}}>
                                                {title}
                                              </a>
                                          }
                                        />
                                      </a>
                                    </h6>
                                  </div>
                                </CardWidth>
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
          </div>
        </div>
        {/* /Document Upload Tab */}
        {/* Notice Info Tab */}
        <div id="notice" className="tab-pane fade">
          <div className="row">
            {isSelectedLoading ? (
              <div className="skeleton-container-profile">
                <div className="skeleton-content-profile">
                  <div className="skeleton-line-profile"></div>
                </div>
              </div>
            ) : (
              <div className="col-md-12 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-header">
				            <h4 className="card-title mb-0">
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
                        <a
                          onClick={handleAddNotice}
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                    </h4>
				          </div>
                  <div className="card-body">
                    <Wrapper>
                      {houseNoticeData?.length > 0 ? (
                        houseNoticeData.map((notice, index) => {
                          const {
                            title,
                            id,
                            description,
                            notice_date,
                            house,
                            residents_applicable,
                            documents,
                          } = notice;
                          if (house == houseId) {
                            return (
                              <BillCard style={{position: "relative"}} key={id} className="card bill-card">
                                <span style={{width: "90%"}}>
                                  <Popup
                                    inline
                                    hoverable
                                    position="bottom left"
                                    delay={{
                                      show: 300,
                                      hide: 800,
                                    }}
                                    content={
                                      <Segment.Group>
                                            <Segment style={{ width: "250px" }}>
                                              <div className="ui column relaxed divided grid">
                                                <div className="column">
                                                  <h4>{title}</h4>
                                                  <div className="ui link list">
                                                    <a className="item">{`Notice date: ${notice_date}`}</a>
                                                    <a className="item">Des: <PopUpText text={description}/></a>
                                                    {residents_applicable.length > 0 && (
                                                      <a className="item">
                                                        Resident Applicable: {""}
                                                        {residentData?.map((allR) => {
                                                          if (residents_applicable.includes(allR.id))
                                                            return (
                                                              <React.Fragment key={allR.id}>
                                                                <img 
                                                                  title={`${allR.first_name} ${allR.middle_name} ${allR.last_name}`}
                                                                  style={{width: "20px", height: "20px", borderRadius: "50px"}} 
                                                                  src={allR.photo}
                                                                />
                                                              </React.Fragment>
                                                            );
                                                        })}
                                                      </a>
                                                    )}
                                                    {houseDocumentsData?.map((doc) => {
                                                          if (documents.includes(doc.id))
                                                            return (
                                                              <a key={doc.id} className="item">
                                                                {`Doc: ${doc.title}`}
                                                              </a>
                                                            );
                                                      })}
                                                  </div>
                                                </div>
                                              </div>
                                            </Segment>
                                      </Segment.Group>
                                    }
                                    trigger={
                                      <a style={{color: "black"}}>
                                        {title}
                                      </a>
                                    }
                                  />
                                </span>
                                <span
                                  className="edit-icon"
                                >
                                  <div className="dropdown dropdown-action text-end">
                                    <a
                                      className="action-icon dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="material-icons">more_vert</i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleEditNotice(id, index)}
                                      >
                                        <i className="fa fa-pencil m-r-5" /> Edit
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleDeleteNotice(id)}
                                      >
                                        <i className="fa fa-trash-o m-r-5" /> Delete
                                      </a>
                                    </div>
                                  </div>
                                </span>
                              </BillCard>
                            );
                          }
                        })
                      ) : (
                        <>Ops! No house notice available</>
                      )}
                    </Wrapper>
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
              <div className="col-lg-12">
				          <div className="card">
				        	  <div className="card-header">
				        	    <h4 className="card-title mb-0">
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
                      </h4>
				        	  </div>
				        	  <div className="card-body">
				        	    <div className="table-responsive">
				        	  	<table className="table table-striped mb-0">
				        	  	  <thead>
				        	  		<tr>
				        	  		  <th>Name</th>
                          <th>Category</th>
                          <th>Expiry Date</th>
                          <th>Purchase Date</th>
                          <th>Description</th>
                          <th>Document</th>
                          <th>Quantity</th>
                          <th>Location</th>
                          <th>Action</th>
				        	  		</tr>
				        	  	  </thead>
				        	  	  <tbody>
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
                                  <tr>
                                    <td className='capitalize'>{name}</td>
				        	  		            <td>{category}</td>
                                    <td>{expiry_date}</td>
                                    <td>{purchase_date}</td>
                                    {description ? (
                                      <td><PopUpText text={description}/></td>
                                     ) : <td></td>}
                                    <td>
                                      {houseDocumentsData?.map((doc) => {
                                          if (documents.includes(doc.id))
                                            return (
                                              <React.Fragment key={doc.id}>
                                                {`${doc.title}`}
                                              </React.Fragment>
                                            );
                                      })}
                                    </td>
                                    <td>{quantity}</td>
                                    <td>{location}</td>
                                    <td className="dropdown dropdown-action text-end">
                                      <a
                                        className="action-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="material-icons">more_vert</i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleEditItem(id, index)}
                                        >
                                          <i className="fa fa-pencil m-r-5" /> Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleDeleteItem(id)}
                                        >
                                          <i className="fa fa-trash-o m-r-5" /> Delete
                                        </a>
                                      </div>
                                    </td>
				        	  		          </tr>
                                  </React.Fragment>
                                );
                              }
                            })
                          : "Ops! No house item available"}
				        	  	  </tbody>
				        	  	</table>
				        	  </div>
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
              <div className="col-lg-12">
				          <div className="card">
				        	  <div className="card-header">
				        	    <h4 className="card-title mb-0">
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
                      </h4>
				        	  </div>
				        	  <div className="card-body">
				        	    <div className="table-responsive">
				        	  	<table className="table table-striped mb-0">
				        	  	  <thead>
				        	  		<tr>
				        	  		  <th>Status</th>
                          <th>House Item</th>
                          <th>Date</th>
                          <th>Comment</th>
                          <th>Document</th>
                          <th>Inspected By</th>
                          <th>Action</th>
				        	  		</tr>
				        	  	  </thead>
				        	  	  <tbody>
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
                                  <tr>
                                    <td>
                                        <span
                                        className={
                                          ((inspection_status === "Needs Repair" || inspection_status === "Needs Replacement") && "badge bg-inverse-info") ||
                                          (inspection_status === "Bad" && "badge bg-inverse-warning") ||
                                          (inspection_status === "Good" && "badge bg-inverse-success")
                                        }
                                      >
                                        {inspection_status}
                                      </span>
                                    </td>
                                    <td className='capitalize'>
                                      {houseItemData?.map((i) => {
                                          if (house_item === i.id)
                                            return (
                                              <React.Fragment key={i.id}>
                                                {`${i.name}`}
                                              </React.Fragment>
                                            );
                                      })}
                                    </td>
                                    <td>{inspection_date}</td>
                                    {comments ? (
                                      <td><PopUpText text={comments}/></td>
                                     ) : <td></td>}
                                    <td>
                                      {houseDocumentsData?.map((doc) => {
                                          if (documents.includes(doc.id))
                                            return (
                                              <React.Fragment key={doc.id}>
                                                {`${doc.title}`}
                                              </React.Fragment>
                                            );
                                      })}
                                    </td>
                                    <td className='capitalize'>{inspected_by}</td>
                                    <td className="dropdown dropdown-action text-end">
                                      <a
                                        className="action-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="material-icons">more_vert</i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleEditInspection(id, index)}
                                        >
                                          <i className="fa fa-pencil m-r-5" /> Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleDeleteInspection(id)}
                                        >
                                          <i className="fa fa-trash-o m-r-5" /> Delete
                                        </a>
                                      </div>
                                    </td>
				        	  		          </tr>
                                  </React.Fragment>
                                );
                              }
                            })
                          : "Ops! No house inspection available"}
				        	  	  </tbody>
				        	  	</table>
				        	  </div>
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