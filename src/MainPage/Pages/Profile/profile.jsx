import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { useGlobalState, setGlobalState } from '../../../context/GlobalState';
import DefaultImage from "../../../assets/img/placeholder.jpg";
import { DivContainer } from '../../TaskManagement/style';
import { useProfileFetching, useProfileImageFetching } from '../../../utils/employeeCustomFetchHook';
import { LineLoader, AvatarLoader, Loader2 } from '../../../_components/Loader';
import { Popup, Segment  } from "semantic-ui-react";
import { BillCard } from '../../Employees/Employees/styles';
import { Wrapper } from '../../ServiceWork/style';
import { ProgressDiv, ProgressSpan } from '../../../utils/helperFucntions';
import NoAvailableData from "../../../_components/noAvailableData";
import { isAdmin, isManager } from '../../../utils/helperFucntions';
import EditProfile from '../../../_components/modelbox/EditProfile';
import { add_update_profile_image } from '../../../utils/sendToServer';

const Profile = () => {

  const { profileInfo, isProfileInfoLoading, isProfileInfoError } = useProfileFetching();
  const { profileImageInfo, isProfileImageInfoLoading, isProfileImageInfoError } = useProfileImageFetching();

  const [profileImageState, dispatchProfileImage] = useReducer(add_update_profile_image, []);

  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const [showModal] = useGlobalState("showModal");

  const first_name = profileInfo?.first_name;
  const other_name = profileInfo?.other_name;
  const phone = profileInfo?.phone;
  const username = profileInfo?.username;
  const role = profileInfo?.role;
  const employee_id = profileInfo?.employee_id;
  const photo = profileImageInfo?.profile_image.url;

  const [isDarkMode] = useGlobalState("isDarkMode");


  return (
    <DivContainer className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={() => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Profile - Peepal Tree HRMS</title>
          <meta name="description" content="Profile Page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="text-4xl text-orange-500">Profile</h3>
                  <ul className="breadcrumb">
                    <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Profile</li>
                  </ul>
                </div>
              </div>
            </div>
          {/* /Page Header */}
          <div className="card mb-0 border border-gray-300 rounded-md shadow-md p-2 bg-transparent">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                      <div className="">
                        <a
                          className="edit-icon"
                          onClick={() => setGlobalState("showModal", true)}
                        >
                          <i className="fa fa-plus" />
                        </a>
				            	</div>
                    <div className="profile-img-wrap bg-transparent">
                      {isProfileInfoLoading ? (
                        <AvatarLoader />
                      ) : (
                        <>
                          <img style={{ width: '100px', height: '100px'}} alt="profile-pic" src={photo ? photo : DefaultImage} />
                        </>
                      )}
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        {isProfileInfoLoading ? (
                          <LineLoader />
                        ) : (
                          <>
                            <div className="col-md-5">
                              <div className="profile-info-left">
                                <h3 style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className=" m-t-0 mb-2">{`${first_name} ${other_name}`}</h3>
                                <h3 style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className=" m-t-0 mb-2">{`Role: ${role ? role : "--"}`}</h3>
                                <h3 style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className=" m-t-0 mb-2">{`Employee ID: ${employee_id ? employee_id : "--"}`}</h3>
                                <h6 style={{ width: "10px", height: "40px" }} className="text-muted"></h6>
                              </div>
                            </div>
                            <div className="col-md-7">
                              <ul className="personal-info">
                                <li>
                                  <div style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="title">Phone:</div>
                                  <div style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="text">
                                    <a>{phone ? phone : "--"}</a>
                                  </div>
                                </li>
                                <li>
                                  <div style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="title">Email:</div>
                                  <div style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="text">
                                    <a>{username ? username : "--"}</a>
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
          <div className="card tab-box border border-gray-300 rounded-md shadow-md bg-transparent">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item">
                    <a href="#emp_profile" data-bs-toggle="tab" className="nav-link active">
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#emp_tasks" data-bs-toggle="tab" className="nav-link">
                      Tasks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#document_upload" data-bs-toggle="tab" className="nav-link">
                      Document Upload
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-content">
            {/* Profile Info Tab */}
            <div
              id="emp_profile"
              className="pro-overview tab-pane fade show active"
            >
              {isProfileInfoLoading ? (
                  <Loader2 />
                ) : (
                <>
                  <div className="row">
                    <div className="col-lg-6">
				              <div className="card border border-gray-300 rounded-md shadow-md bg-transparent">
				            	<div className="card-header shadow-md">
				            	  <h4 className="card-title mb-0">
                          Emergency Contact {""}
                          <a
                            className="edit-icon"
                            onClick={() => console.log("Add")}
                          >
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
                            <th>Relationship</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Post Code</th>
                            <th>Action</th>
				            			</tr>
				            		  </thead>
				            		  <tbody>
                            <tr style={{ height: "90px" }}>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"name"}</td>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"relationship"}</td>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"phone_number"}</td>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"address"}</td>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"email"}</td>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"post_code"}</td>
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
                                    onClick={() => console.log("Edit")}
                                  >
                                    <i className="fa fa-pencil m-r-5" /> Edit
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    onClick={() => console.log("Delete")}
                                  >
                                    <i className="fa fa-trash-o m-r-5" /> Delete
                                  </a>
                                </div>
                              </td>
				            			  </tr>
				            		  </tbody>
				            		</table>
				            	  </div>
				            	</div>
				              </div>
				            </div>
                    <div className="col-lg-6">
				              <div className="card border border-gray-300 rounded-md shadow-md bg-transparent">
				            	<div className="card-header shadow-md">
				            	  <h4 className="card-title mb-0">
                          Address {""}
                          <a
                            className="edit-icon"
                            onClick={() => console.log("Add")}
                          >
                            <i className="fa fa-plus" />
                          </a>
                        </h4>
				            	</div>
				            	<div className="card-body">
				            	  <div className="table-responsive">
				            		<table className="table table-striped mb-0">
				            		  <thead>
				            			<tr>
                            <th>Street</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Postal Code</th>
                            <th>Action</th>
				            			</tr>
				            		  </thead>
				            		  <tbody>
                            <tr style={{ height: "90px" }}>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"street"}</td>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"city"}</td>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"state"}</td>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"country"}</td>
                              <td style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>{"postal_code"}</td>
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
                                    onClick={() => console.log("Edit")}
                                  >
                                    <i className="fa fa-pencil m-r-5" /> Edit
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    onClick={() => console.log("Delete")}
                                  >
                                    <i className="fa fa-trash-o m-r-5" /> Delete
                                  </a>
                                </div>
                              </td>
				            			  </tr>
				            		  </tbody>
				            		</table>
				            	  </div>
				            	</div>
				              </div>
				            </div>
                    <div className="col-md-6 d-flex">
                      <div className="card profile-box flex-fill border border-gray-300 rounded-md shadow-md bg-transparent">
                        <div className="card-header shadow-md">
				            	    <h4 className="card-title mb-0">
                          Review
                          </h4>
				            	  </div>
                        <div className="card-body">
                          <Wrapper>
                              <BillCard style={{position: "relative"}} className="card bill-card border border-gray-300 rounded-md shadow-md bg-transparent">
                                <span style={{width: "90%"}}>
                                  <Popup
                                    style={{ backgroundColor: 'transparent' }}
                                    inline
                                    hoverable
                                    position="bottom left"
                                    delay={{
                                      show: 300,
                                      hide: 800,
                                    }}
                                    content={
                                      <Segment.Group>
                                        <Segment className="border" style={{ width: "250px", backgroundColor: `${isDarkMode ? '#110C08' : 'white'}` }}>
                                          <div className="ui column relaxed divided grid">
                                            <div className="column">
                                              <div className="ui link list">
                                                <a style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="item">{`Review Type: ${"review_type"}`}</a>
                                                <a style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="item">{`Date: ${"review_date"}`}</a>
                                                <a style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="item">{`Review Manager: ${"review_manager"}`}</a>
                                                <a style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="item">{`Status: ${"review_status"}`}</a>
                                              </div>
                                            </div>
                                          </div>
                                        </Segment>
                                      </Segment.Group>
                                    }
                                    trigger={
                                      <a style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>
                                        {"review_type"}
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
                                        onClick={() => console.log("Download")}
                                      >
                                        <i className="fa fa-download m-r-5" /> Download
                                      </a>
                                    </div>
                                  </div>
                                </span>
                              </BillCard>
                          </Wrapper>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* /Profile Info Tab */}
            {/* Tasks Tab */}
            <div className="tab-pane fade" id="emp_tasks">
                <div className="row">
                  <div
                    className="col-lg-6 col-sm-12 col-md-6 col-xl-4"
                  >
                    <div className="card border border-gray-300 rounded-md shadow-md bg-transparent">
                      <div className="card-body">
                        <h4 className="project-title text-2xl">
                          <Link
                            onClick={(e) => e.preventDefault()}
                            to="#"
                            style={{color: `${isDarkMode ? '#898888' : '#000'}`}}
                          >
                            {"name"}
                          </Link>
                        </h4>
                        <p className="text-muted">{"description"}</p>
                        <div className="small-div flex justify-between">
                          <div 
                            className="border shadow-md p-2 rounded-md size-full m-2"
                            style={{backgroundColor: `${isDarkMode ? '' : '#FCF5EB'}`}}
                          >
                            <small className="block text-ellipsis m-b-15">
                              <span style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="text-xs">Task Type: </span>
                              <span
                                style={{
                                  backgroundColor: "is_paid" === "is_paid" ? "#55CE63" : "#ff9b44",
                                  color: "#fff",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }}
                              >
                                {"is_paid" === "is_paid" ? "Paid" : "Non Paid"}
                              </span>{" "}
                            </small>
                              
                            <small className="block text-ellipsis m-b-15">
                              <span style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="text-xs">
                                Task Priority:{" "}
                              </span>
                              <span
                                style={{
                                  backgroundColor:
                                    ("high" === "low" && "red") ||
                                    ("high" === "medium" && "#ff9b44") ||
                                    ("high" === "high" && "#55CE63"),
                                  color: "#fff",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }}
                              >
                                {"high"}
                              </span>{" "}
                            </small>
                            <small className="block text-ellipsis m-b-15">
                              <span style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="text-xs">Task Status: </span>
                              <span
                                style={{
                                  backgroundColor: "concluded" === "conc" ? "#55CE63" : "#ff9b44",
                                  color: "#fff",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }}
                              >
                                {"concluded" === "conc" ? "Concluded" : "In Progress"}
                              </span>{" "}
                            </small>
                              
                            <small className="block text-ellipsis m-b-15">
                              <span style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="text-xs">
                                Start At:{" "}
                              </span>
                              <span className="text-muted">
                                05 May 2024
                              </span>{" "}
                            </small>
                            <small className="block text-ellipsis m-b-15">
                              <span style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="text-xs">
                                End At:{" "}
                              </span>
                              <span className="text-muted">
                                05 June 2024
                              </span>{" "}
                            </small>
                            <small className="block text-ellipsis m-b-15">
                              <span style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="text-xs">
                                Time Allocated:{" "}
                              </span>
                              <span className="text-muted">
                                3hr
                              </span>{" "}
                            </small>
                          </div>
                          {/* <div 
                            className="border shadow-md rounded-md p-2 size-full m-2"
                            style={{backgroundColor: `${isDarkMode ? '' : '#FCF5EB'}`}}
                          >
                              <span style={{ color: `${isDarkMode ? '#898888' : '#000'}` }} className="text-xs">
                                Task Manager:{" "}
                              </span>
                              <div key={index} className='flex gap-1'>  
                                {employee?.map((e, index) => (
                                  <img key={index} title={`${e.first_name} ${e.middle_name} ${e.last_name}`} className='people-avatar' alt={'people'} src={e.photo} />
                                ))}
                              </div>
                          </div> */}
                        </div>
                            
                        <div 
                          className="project-members m-b-15 border shadow-md rounded-md p-2 m-2"
                          style={{backgroundColor: `${isDarkMode ? '' : '#FCF5EB'}`}}
                        >
                          <div style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>Team:</div>
                          <div key={0} className='flex gap-1'>
                            <img title={`${first_name} ${other_name}`} className='people-avatar' alt={'avatar'} src={photo ? photo : DefaultImage} />
                          </div>
                        </div>
                        <p style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="m-b-5">
                          Progress
                          <ProgressSpan progress={55} />
                        </p>
                        <ProgressDiv progress={55} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Tasks Tab */}
          </div>
        </div>
        {/* /Page Content */}
      </div>

      {showModal && (
        <EditProfile 
          id={profileImageInfo?._id} 
          img_url={photo}
          dispatchProfileImage={dispatchProfileImage}
        />
      )}
    </DivContainer>
  );
}
export default Profile;
