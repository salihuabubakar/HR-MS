import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Header from '../../initialpage/Sidebar/header';
import Sidebar from '../../initialpage/Sidebar/sidebar';
import { Helmet } from 'react-helmet';
import DOMPurify from "dompurify";
import useJobData from '../../utils/Hooks/jobList';
import { useGlobalState } from '../../context/GlobalState';
import { Loader2, Loader3 } from '../../_components/Loader';

const CareerDetails = () => {

  const { id: pageId } = useParams();

  let jobdetailId = parseInt(pageId, 10);

  const { getSelectedJobData, isSelectedJobLoading } = useJobData(jobdetailId);

  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const id = getSelectedJobData?.id;
  const active = getSelectedJobData?.active;
  const application_deadline = getSelectedJobData?.application_deadline;
  const date_posted = getSelectedJobData?.date_posted;
  const description = getSelectedJobData?.description;
  const experience_years = getSelectedJobData?.experience_years;
  const hours = getSelectedJobData?.hours;
  const job_type = getSelectedJobData?.job_type;
  const salary_range = getSelectedJobData?.salary_range;
  const title = getSelectedJobData?.title;
  const vacancy = getSelectedJobData?.vacancy;

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <>
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()}/>
      <Sidebar />
      <div className='page-wrapper'>
        <Helmet>
          <title>Career Details - Peepal Tree HRMS</title>
          <meta name="description" content="Career Details" />
        </Helmet>
        <div className="content container-fluid">
          <div className='page-header'>
            <div className="row">
              <div className="col-sm-12">
                <h3 className="text-4xl text-orange-500">Details</h3>
                <ul className="breadcrumb">
                  <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/administration/careers">All Career</Link>
                  <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Details</li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ padding: "1%" }} className="row">

          {isSelectedJobLoading ? (
            <Loader3 />
          ) : (
            <>
              <div className="col-md-12">
                <div className="card border border-gray-300 rounded-md shadow-md bg-transparent">
                  <div className="card-body">
                    <div className="job-info job-widget bg-transparent border-0">
                      {/* <span className="job-dept">App Development</span> */}
                      <ul className="job-post-det">
                        <li><i className="fa fa-calendar" /> Post Date: <span className="text-orange-500">{moment(date_posted).format("DD MMM YYYY")}</span></li>
                        <li><i className="fa fa-calendar" /> Last Date: <span className="text-orange-500">{moment(application_deadline).format("DD MMM YYYY")}</span></li>
                        <li><i className="fa fa-user-o" /> Applications: <span className="text-orange-500">4</span></li>
                      </ul>
                    </div>
                    <div className="info-list text-center">
                      <a className="app-ends text-orange-500" href="#">Application ends on {moment(application_deadline).format("DD MMM YYYY")}</a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {isSelectedJobLoading ? (
            <Loader2 />
          ) : (
            <>
              <div className="col-lg-6 col-sm-12 col-md-8 col-xl-4">
                <div className="card border border-gray-300 rounded-md shadow-md bg-transparent">
                  <div className="card-body">
                    <h4 className="project-title text-2xl">
                      <Link
                        onClick={(e) => e.preventDefault()}
                        to="#"
                        style={{color: `${isDarkMode ? '#898888' : '#000'}`}}
                      >
                        {title}
                      </Link>
                    </h4>
                    <div className="small-div flex justify-between">
                      <div 
                        className="border shadow-md p-2 rounded-md size-full m-2"
                        style={{backgroundColor: `${isDarkMode ? '' : '#FCF5EB'}`}}
                      >
                        <small className="block text-ellipsis m-b-15">
                          <span style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="text-xs">Job Type: </span>
                          <span
                            style={{
                              backgroundColor: job_type === "Full Time" ? "#55CE63" : "#ff9b44",
                              color: "#fff",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {job_type}
                          </span>{" "}
                        </small>
                        <small className="block text-ellipsis m-b-15">
                          <span style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="text-xs">Salary Range: </span>
                          <span className="text-muted">
                            {salary_range ? salary_range : "--"}
                          </span>{" "}
                        </small>
                        <small className="block text-ellipsis m-b-15">
                          <span style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="text-xs">
                            Experience:{" "}
                          </span>
                          <span className="text-muted">
                            {experience_years ? experience_years : "--"}
                          </span>{" "}
                        </small>
                        <small className="block text-ellipsis m-b-15">
                          <span style={{color: `${isDarkMode ? '#898888' : '#000'}`}} className="text-xs">
                            Vacancy:{" "}
                          </span>
                          <span className="text-muted">
                            {vacancy ? vacancy : "--"}
                          </span>{" "}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="card border border-gray-300 rounded-md shadow-md bg-transparent">
                  <div className="card-body">
                    <div className="job-content job-widget bg-transparent border-0">
                      <div className="job-desc-title"><h4>Job Description</h4></div>
                      <div className="job-description">
                        {
                        /**
                         * Render HTML Content Safely
                         *
                         * Renders HTML content in a React component using the 'dangerouslySetInnerHTML' prop
                         * and ensures the content is sanitized with DOMPurify to prevent potential security risks.
                         *
                         * @param {string} description - The HTML content to be rendered.
                         * @returns {JSX.Element} - Returns a React element rendering the sanitized HTML content.
                         */}
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default CareerDetails;