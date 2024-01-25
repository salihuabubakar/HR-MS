import React, {useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Header from '../../initialpage/Sidebar/header';
import Sidebar from '../../initialpage/Sidebar/sidebar';
import { Helmet } from 'react-helmet';
import DOMPurify from "dompurify";
import useJobData from '../../utils/Hooks/jobList';

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
                <h3 className="page-title">Details</h3>
                <ul className="breadcrumb breadcrumb-nav">
                  <li className="breadcrumb-item">
                    <Link to="/app/administration/careers">All Career</Link>
                  </li>
                  <li className="breadcrumb-item active">Details</li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ padding: "1%" }} className="row">
            <div className="col-md-8">
              {isSelectedJobLoading ? (
                <div className="spinner">
                  <div className="loader" />
                </div>
              ) : (
                <>
                  <div className="job-info job-widget">
                    <h3 className="job-title">
                      {title}
                    </h3>
                    {/* <span className="job-dept">App Development</span> */}
                    <ul className="job-post-det">
                      <li><i className="fa fa-calendar" /> Post Date: <span className="text-blue">{moment(date_posted).format("DD MMM YYYY")}</span></li>
                      <li><i className="fa fa-calendar" /> Last Date: <span className="text-blue">{moment(application_deadline).format("DD MMM YYYY")}</span></li>
                      <li><i className="fa fa-user-o" /> Applications: <span className="text-blue">4</span></li>
                    </ul>
                  </div>
                  <div className="job-content job-widget">
                    <div className="job-desc-title"><h4>Job Description</h4></div>
                    <div className="job-description">
                      {/* <p>{description}</p> */}
                      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description)}} />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-md-4">
              {isSelectedJobLoading ? (
                <div className="spinner">
                  <div className="loader" />
                </div>
              ): (
                <>
                  <div className="job-det-info job-widget">
                    <div className="info-list">
                      <span><i className="fa fa-bar-chart" /></span>
                      <h5>Job Type</h5>
                      <p>{job_type}</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-money" /></span>
                      <h5>Salary</h5>
                      <p>{salary_range}</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-suitcase" /></span>
                      <h5>Experience</h5>
                      <p>{`${experience_years} Year`}</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-ticket" /></span>
                      <h5>Vacancy</h5>
                      <p>{vacancy}</p>
                    </div>
                    <div className="info-list text-center">
                      <a className="app-ends" href="#">Application ends on {moment(application_deadline).format("DD MMM YYYY")}</a>
                    </div>
                  </div>
                </>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default CareerDetails;