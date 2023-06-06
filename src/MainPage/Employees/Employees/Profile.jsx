import React, { useState, useEffect, useReducer, useMemo } from "react";
import moment from "moment";

const Profile = ({ 
  getSelectedData, 
  DefaultImage, 
  isSelectedLoading,
  skeletonLoading 
}) => {

  const selectedEmployeeId = getSelectedData?.id;
  const first_name = getSelectedData?.first_name;
  const middle_name = getSelectedData?.middle_name;
  const last_name = getSelectedData?.last_name;
  const photo = getSelectedData?.photo;
  const role = getSelectedData?.role;
  const employee_number = getSelectedData?.employee_number;
  const hire_date = getSelectedData?.hire_date;
  const phone_number = getSelectedData?.phone_number;
  const email = getSelectedData?.email;
  const date_of_birth = getSelectedData?.date_of_birth;
  const gender = getSelectedData?.gender;
  const nationality = getSelectedData?.nationality;
  const ni_numbber = getSelectedData?.ni_numbber;
  const marital_status = getSelectedData?.marital_status;
  const employee_bank_accounts = getSelectedData?.employee_bank_accounts;
  const employee_emergency_contacts =
    getSelectedData?.employee_emergency_contacts;
  const employee_addresses = getSelectedData?.employee_addresses;
  const employee_review = getSelectedData?.employee_review;
  const employee_qualifications = getSelectedData?.employee_qualifications;
  const employee_work_experiences = getSelectedData?.employee_work_experiences;
  const department = getSelectedData?.department;
  const organisation = getSelectedData?.organisation;
  const employee_contract = getSelectedData?.employee_contract;
  const employee_leave = getSelectedData?.employee_leave;
  const employee_status = getSelectedData?.employee_status;
  const employee_documents = getSelectedData?.employee_documents;

  return (
    <>
      <div className="card mb-0">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-view">
                <div className="profile-img-wrap">
                  <div className="profile-img">
                    <a>
                      <img alt="" src={photo ? photo : DefaultImage} />
                    </a>
                  </div>
                </div>
                <div className="profile-basic">
                  <div className="row">
                    {isSelectedLoading || skeletonLoading ? (
                      <div className="skeleton-container1">
                        <div className="skeleton-content1">
                          <div className="skeleton-line1"></div>
                          <div className="skeleton-line2"></div>
                          <div className="skeleton-line3"></div>
                          <div className="skeleton-line4"></div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">{`${first_name} ${middle_name} ${last_name}`}</h3>
                            <h6 className="text-muted">
                              Role: {role?.role_name}
                            </h6>
                            <div className="small doj text-muted">
                              Employee ID : {employee_number}
                            </div>
                            <div className="small doj text-muted">
                              NI Number : {ni_numbber}
                            </div>
                            <div className="small doj text-muted">
                              Date of Join:{" "}
                              {moment(hire_date).format("DD MMM YYYY")}
                            </div>
                            <div className="small doj text-muted">
                              Nationality : {nationality}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="col-md-7">
                      <ul className="personal-info">
                        <li>
                          <div className="title">Phone:</div>
                          <div className="text">
                            <a>{phone_number}</a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Email:</div>
                          <div className="text">
                            <a>{email}</a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Birthday:</div>
                          <div className="text">
                            {moment(date_of_birth).format("DD MMM YYYY")}
                          </div>
                        </li>
                        <li>
                          <div className="title">Gender:</div>
                          <div className="text">{gender}</div>
                        </li>
                        <li>
                          <div className="title">Marital Status:</div>
                          <div className="text">{marital_status}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <div className="pro-edit">
                      <a onClick={handleEditAcct} className="edit-icon">
                        <i className="fa fa-pencil" />
                      </a>
                    </div> */}
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
                  href="#emp_profile"
                  data-bs-toggle="tab"
                  className="nav-link active"
                >
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a href="#emp_tasks" data-bs-toggle="tab" className="nav-link">
                  Tasks
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#document_upload"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
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
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Bank information</h3>
                  {employee_bank_accounts?.map((banks, index) => {
                    const {
                      id,
                      employee,
                      account_name,
                      account_number,
                      sort_code,
                      bank_name,
                      bank_address,
                      swift_code,
                      iban,
                      routing_number,
                      account_type,
                      currency,
                      upload_document,
                    } = banks;
                    if (employee == selectedEmployeeId) {
                      return (
                        <ul key={id} className="personal-info">
                          <li>
                            <div className="title">Bank name</div>
                            <div className="text">{bank_name}</div>
                          </li>
                          <li>
                            <div className="title">Bank account Name.</div>
                            <div className="text">{account_name}</div>
                          </li>
                          <li>
                            <div className="title">Bank account No.</div>
                            <div className="text">{account_number}</div>
                          </li>
                          <li>
                            <div className="title">Bank account Type.</div>
                            <div className="text">{account_type}</div>
                          </li>
                          <li>
                            <div className="title">Currency.</div>
                            <div className="text">{currency}</div>
                          </li>
                          <li>
                            <div className="title">Bank address.</div>
                            <div className="text">{bank_address}</div>
                          </li>
                          <li>
                            <div className="title">Sort Code</div>
                            <div className="text">{sort_code}</div>
                          </li>
                          <li>
                            <div className="title">Swift Code</div>
                            <div className="text">{swift_code}</div>
                          </li>
                          <li>
                            <div className="title">Iban</div>
                            <div className="text">{iban}</div>
                          </li>
                          <li>
                            <div className="title">Routing No</div>
                            <div className="text">{routing_number}</div>
                          </li>
                        </ul>
                      );
                    }
                  })}
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Emergency Contact</h3>
                  {employee_emergency_contacts?.map((contacts, index) => {
                    const {
                      id,
                      employee,
                      name,
                      relationship,
                      phone_number,
                      email,
                      address,
                      post_code,
                    } = contacts;
                    if (employee == selectedEmployeeId) {
                      return (
                        <ul key={id} className="personal-info">
                          <li>
                            <div className="title">Name</div>
                            <div className="text">{name}</div>
                          </li>
                          <li>
                            <div className="title">Relationship</div>
                            <div className="text">{relationship}</div>
                          </li>
                          <li>
                            <div className="title">Phone</div>
                            <div className="text">{phone_number}</div>
                          </li>
                          <li>
                            <div className="title">Email</div>
                            <div className="text">{email}</div>
                          </li>
                          <li>
                            <div className="title">Address.</div>
                            <div className="text">{address}</div>
                          </li>
                          <li>
                            <div className="title">Post Code</div>
                            <div className="text">{post_code}</div>
                          </li>
                        </ul>
                      );
                    }
                  })}
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Address</h3>
                  {employee_addresses?.map((address, index) => {
                    const {
                      id,
                      employee,
                      street,
                      city,
                      state,
                      country,
                      postal_code,
                    } = address;
                    if (employee == selectedEmployeeId) {
                      return (
                        <ul key={id} className="personal-info">
                          <li>
                            <div className="title">Street</div>
                            <div className="text">{street}</div>
                          </li>
                          <li>
                            <div className="title">City</div>
                            <div className="text">{city}</div>
                          </li>
                          <li>
                            <div className="title">State</div>
                            <div className="text">{state}</div>
                          </li>
                          <li>
                            <div className="title">Country</div>
                            <div className="text">{country}</div>
                          </li>
                          <li>
                            <div className="title">Postal Code</div>
                            <div className="text">{postal_code}</div>
                          </li>
                        </ul>
                      );
                    }
                  })}
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Review</h3>
                  {employee_review?.map((review, index) => {
                    const {
                      id,
                      employee,
                      review_type,
                      description,
                      review_date,
                      review_status,
                      review_file,
                      review_manager,
                    } = review;
                    if (employee == selectedEmployeeId) {
                      return (
                        <ul key={id} className="personal-info">
                          <li>
                            <div className="title">Review Type</div>
                            <div className="text">{review_type}</div>
                          </li>
                          <li>
                            <div className="title">Description</div>
                            <div className="text">{description}</div>
                          </li>
                          <li>
                            <div className="title">Review Date</div>
                            <div className="text">{review_date}</div>
                          </li>
                          <li>
                            <div className="title">Review Status</div>
                            <div className="text">{review_status}</div>
                          </li>
                          <li>
                            <div className="title">Review Manager</div>
                            <div className="text">
                              {review_manager != Number(review_manager)
                                ? review_manager
                                : "Admin"}
                            </div>
                          </li>
                        </ul>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Qualifications{" "}
                    {/* <a onClick={handleEducationInfo} className="edit-icon">
                      <i className="fa fa-plus" />
                    </a> */}
                  </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      {employee_qualifications?.map((qualifications, index) => {
                        const {
                          id,
                          employee,
                          qualification_name,
                          institute_name,
                          start_date,
                          end_date,
                        } = qualifications;
                        if (employee == selectedEmployeeId) {
                          return (
                            <li key={id}>
                              <div className="experience-user">
                                <div className="before-circle" />
                              </div>
                              <div className="experience-content">
                                <div className="timeline-content">
                                  <a className="name">
                                    {institute_name}
                                    {/* <span
                                      className="edit-icon"
                                      onClick={() =>
                                        editEduInfo(fieldsIndex, index)
                                      }
                                    >
                                      <i className="fa fa-pencil" />
                                    </span> */}
                                  </a>
                                  <div style={{ fontWeight: "900" }}>
                                    {qualification_name}
                                  </div>
                                  <span className="time">
                                    {start_date} - {end_date}
                                  </span>
                                </div>
                              </div>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Work Experience{" "}
                    {/* <a onClick={handleEducationInfo} className="edit-icon">
                      <i className="fa fa-plus" />
                    </a> */}
                  </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      {employee_work_experiences?.map((experience, index) => {
                        const {
                          id,
                          employee,
                          job_title,
                          company_name,
                          description,
                          start_date,
                          end_date,
                        } = experience;
                        if (employee == selectedEmployeeId) {
                          return (
                            <li key={id}>
                              <div className="experience-user">
                                <div className="before-circle" />
                              </div>
                              <div className="experience-content">
                                <div className="timeline-content">
                                  <a className="name">
                                    {company_name}
                                    {/* <span
                                      className="edit-icon"
                                      onClick={() =>
                                        editEduInfo(fieldsIndex, index)
                                      }
                                    >
                                      <i className="fa fa-pencil" />
                                    </span> */}
                                  </a>
                                  <div style={{ fontWeight: "900" }}>
                                    {job_title}
                                  </div>
                                  <div>{description}</div>
                                  <span className="time">
                                    {start_date} - {end_date}
                                  </span>
                                </div>
                              </div>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Role</h3>
                  <ul className="personal-info">
                    <li>
                      <div className="title">Role Name</div>
                      <div className="text">{role?.role_name}</div>
                    </li>
                    <li>
                      <div className="title">Description</div>
                      <div className="text">{role?.description}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Department</h3>
                  <ul className="personal-info">
                    <li>
                      <div className="title">Department Name</div>
                      <div className="text">{department?.department_name}</div>
                    </li>
                    <li>
                      <div className="title">Description</div>
                      <div className="text">{department?.description}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Organisation</h3>
                  <ul className="personal-info">
                    <li>
                      <div className="title">Organisation Name</div>
                      <div className="text">
                        {organisation?.organisation_name}
                      </div>
                    </li>
                    <li>
                      <div className="title">Manager Name</div>
                      <div className="text">{organisation?.manager_name}</div>
                    </li>
                    <li>
                      <div className="title">Phone</div>
                      <div className="text">{organisation?.mobile}</div>
                    </li>
                    <li>
                      <div className="title">Office Phone</div>
                      <div className="text">{organisation?.office_phone}</div>
                    </li>
                    <li>
                      <div className="title">Email</div>
                      <div className="text">{organisation?.email}</div>
                    </li>
                    <li>
                      <div className="title">City</div>
                      <div className="text">{organisation?.city}</div>
                    </li>
                    <li>
                      <div className="title">Street</div>
                      <div className="text">{organisation?.street}</div>
                    </li>
                    <li>
                      <div className="title">Country</div>
                      <div className="text">{organisation?.country}</div>
                    </li>
                    <li>
                      <div className="title">Post Code</div>
                      <div className="text">{organisation?.post_code}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Contract</h3>
                  {employee_contract?.map((contract, index) => {
                    const {
                      id,
                      employee_contract,
                      contract_owner,
                      description,
                      contract_type,
                      start_date,
                      end_date,
                      contract_status,
                      contract_file,
                    } = contract;
                    if (employee_contract == selectedEmployeeId) {
                      return (
                        <ul key={id} className="personal-info">
                          <li>
                            <div className="title">Contract Owner</div>
                            <div className="text">{contract_owner}</div>
                          </li>
                          <li>
                            <div className="title">Contract Type</div>
                            <div className="text">{contract_type}</div>
                          </li>
                          <li>
                            <div className="title">Description</div>
                            <div className="text">{description}</div>
                          </li>
                          <li>
                            <div className="title">Start Date</div>
                            <div className="text">{start_date}</div>
                          </li>
                          <li>
                            <div className="title">End Date</div>
                            <div className="text">{end_date}</div>
                          </li>
                          <li>
                            <div className="title">Contract Status</div>
                            <div className="text">{contract_status}</div>
                          </li>
                          <li>
                            <div className="title">Contract File</div>
                            <div className="text">
                              {contract_file != null ? review_manager : "--"}
                            </div>
                          </li>
                        </ul>
                      );
                    }
                  })}
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Leave</h3>
                  {employee_leave?.map((leave, index) => {
                    const {
                      id,
                      employee,
                      number_of_days,
                      comments,
                      authorising_manager,
                      start_date,
                      end_date,
                      status,
                      supporting_document,
                      leave_type,
                      authorised_by,
                    } = leave;
                    if (employee == selectedEmployeeId) {
                      return (
                        <ul key={id} className="personal-info">
                          <li>
                            <div className="title">Authorising Manager</div>
                            <div className="text">{authorising_manager}</div>
                          </li>
                          <li>
                            <div className="title">Number of days</div>
                            <div className="text">{number_of_days}</div>
                          </li>
                          <li>
                            <div className="title">Comment</div>
                            <div className="text">{comments}</div>
                          </li>
                          <li>
                            <div className="title">Start Date</div>
                            <div className="text">{start_date}</div>
                          </li>
                          <li>
                            <div className="title">End Date</div>
                            <div className="text">{end_date}</div>
                          </li>
                          <li>
                            <div className="title">Leave Status</div>
                            <div className="text">{status}</div>
                          </li>
                          <li>
                            <div className="title">Supporting File</div>
                            <div className="text">
                              {supporting_document != null
                                ? supporting_document
                                : "--"}
                            </div>
                          </li>
                        </ul>
                      );
                    }
                  })}
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Status{" "}
                    {/* <a onClick={handleEducationInfo} className="edit-icon">
                      <i className="fa fa-plus" />
                    </a> */}
                  </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      {employee_status?.map((employee_status, index) => {
                        const {
                          id,
                          employee,
                          status,
                          authorising_manager,
                          comments,
                          start_date,
                          end_date,
                          authorised_by,
                        } = employee_status;
                        if (employee == selectedEmployeeId) {
                          return (
                            <li key={id}>
                              <div className="experience-user">
                                <div className="before-circle" />
                              </div>
                              <div className="experience-content">
                                <div className="timeline-content">
                                  <a className="name">
                                    {authorising_manager}
                                    {/* <span
                                      className="edit-icon"
                                      onClick={() =>
                                        editEduInfo(fieldsIndex, index)
                                      }
                                    >
                                      <i className="fa fa-pencil" />
                                    </span> */}
                                  </a>
                                  <div style={{ fontWeight: "900" }}>
                                    {status == Number(status)
                                      ? "Active"
                                      : status}
                                  </div>
                                  <div>{comments}</div>
                                  <span className="time">
                                    {start_date} - {end_date}
                                  </span>
                                </div>
                              </div>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Profile Info Tab */}
        {/* Tasks Tab */}
        {/* <div className="tab-pane fade" id="emp_tasks">
          <div className="row">
            {taskList?.map((task, index) => {
              const {
                id,
                dateCreated,
                description,
                employee,
                manager,
                resident,
                taskPriority,
                taskStatus,
                taskType,
                taskTitle,
                timeAllocated,
              } = task;
              return (
                <Fragment key={id}>
                  {employee?.map((employee, index) => {
                    const { value, label, role, image } = employee;
                    if (value === selectedEmployeeId) {
                      return (
                        <>
                          <div
                            key={value}
                            className="col-lg-6 col-sm-12 col-md-6 col-xl-4"
                          >
                            <div className="card">
                              <div className="card-body">
                                <h4 className="project-title">
                                  <Link
                                    onClick={(e) => e.preventDefault()}
                                    to="#"
                                  >
                                    {taskTitle}
                                  </Link>
                                </h4>
                                <p className="text-muted">{description}</p>
                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">Task Type: </span>
                                  <span
                                    style={{
                                      backgroundColor:
                                        taskType == "Paid Task"
                                          ? "#55CE63"
                                          : "#ff9b44",
                                      color: "#fff",
                                      padding: "5px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {taskType ? taskType : "--"}
                                  </span>{" "}
                                </small>

                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">
                                    Task Priority:{" "}
                                  </span>
                                  <span
                                    style={{
                                      backgroundColor:
                                        (taskPriority?.label == "low" &&
                                          "red") ||
                                        (taskPriority?.label == "medium" &&
                                          "#ff9b44") ||
                                        (taskPriority?.label == "highest" &&
                                          "#55CE63"),
                                      color: "#fff",
                                      padding: "5px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {taskPriority ? taskPriority.label : "--"}
                                  </span>{" "}
                                </small>

                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">Task Status: </span>
                                  <span
                                    style={{
                                      backgroundColor:
                                        (taskStatus?.label == "not-started" &&
                                          "red") ||
                                        (taskStatus?.label == "started" &&
                                          "#f20d91") ||
                                        (taskStatus?.label == "middle" &&
                                          "#ff9b44") ||
                                        (taskStatus?.label == "rounding-up" &&
                                          "#73AB00") ||
                                        (taskStatus?.label == "completed" &&
                                          "#55CE63"),
                                      color: "#fff",
                                      padding: "5px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {taskStatus
                                      ? (taskStatus?.label == "not-started" &&
                                          "Not started") ||
                                        (taskStatus?.label == "started" &&
                                          "Started") ||
                                        (taskStatus?.label == "middle" &&
                                          "Middle") ||
                                        (taskStatus?.label == "rounding-up" &&
                                          "Rounding up") ||
                                        (taskStatus?.label == "completed" &&
                                          "Completed")
                                      : "--"}
                                  </span>{" "}
                                </small>

                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">
                                    Date Created:{" "}
                                  </span>
                                  <span className="text-muted">
                                    {dateCreated ? dateCreated : "--"}
                                  </span>{" "}
                                </small>

                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">
                                    Task Manager:{" "}
                                  </span>
                                  <span className="text-muted">
                                    {manager ? manager : "--"}
                                  </span>{" "}
                                </small>

                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">
                                    Time Allocated:{" "}
                                  </span>
                                  <span className="text-muted">
                                    {timeAllocated
                                      ? timeAllocated + "hr"
                                      : "--"}
                                  </span>{" "}
                                </small>
                                <div className="project-members m-b-15">
                                  <div>Team:</div>
                                  <ul className="team-members">
                                    <li>
                                      <a data-bs-toggle="tooltip" title={label}>
                                        <img
                                          alt=""
                                          src={image ? image : DefaultImage}
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <p className="m-b-5">
                                  Progress
                                  <span
                                    className={
                                      (taskStatus?.label == "not-started"
                                        ? "float-end color-not-started"
                                        : undefined) ||
                                      (taskStatus?.label == "started"
                                        ? "float-end color-started"
                                        : undefined) ||
                                      (taskStatus?.label == "middle"
                                        ? "float-end color-middle"
                                        : undefined) ||
                                      (taskStatus?.label == "rounding-up"
                                        ? "float-end color-rounding-up"
                                        : undefined) ||
                                      (taskStatus?.label == "completed"
                                        ? "float-end color-completed"
                                        : undefined)
                                    }
                                  >
                                    {(taskStatus?.label == "not-started" &&
                                      "0%") ||
                                      (taskStatus?.label == "started" &&
                                        "25%") ||
                                      (taskStatus?.label == "middle" &&
                                        "50%") ||
                                      (taskStatus?.label == "rounding-up" &&
                                        "75%") ||
                                      (taskStatus?.label == "completed" &&
                                        "100%")}
                                  </span>
                                </p>
                                <div className="progress progress-xs mb-0">
                                  <div
                                    className={
                                      (taskStatus?.label == "not-started"
                                        ? " progress-bar bg-not-started"
                                        : undefined) ||
                                      (taskStatus?.label == "started"
                                        ? "progress-bar bg-started"
                                        : undefined) ||
                                      (taskStatus?.label == "middle"
                                        ? "progress-bar bg-middle"
                                        : undefined) ||
                                      (taskStatus?.label == "rounding-up"
                                        ? "progress-bar bg-rounding-up"
                                        : undefined) ||
                                      (taskStatus?.label == "completed"
                                        ? "progress-bar bg-completed"
                                        : undefined)
                                    }
                                    role="progressbar"
                                    data-bs-toggle="tooltip"
                                    title={
                                      (taskStatus?.label == "not-started"
                                        ? "0%"
                                        : undefined) ||
                                      (taskStatus?.label == "started"
                                        ? "25%"
                                        : undefined) ||
                                      (taskStatus?.label == "middle"
                                        ? "50%"
                                        : undefined) ||
                                      (taskStatus?.label == "rounding-up"
                                        ? "75%"
                                        : undefined) ||
                                      (taskStatus?.label == "completed" &&
                                        "100%")
                                    }
                                    style={{
                                      width:
                                        (taskStatus?.label == "not-started" &&
                                          "0%") ||
                                        (taskStatus?.label == "started" &&
                                          "25%") ||
                                        (taskStatus?.label == "middle" &&
                                          "50%") ||
                                        (taskStatus?.label == "rounding-up" &&
                                          "75%") ||
                                        (taskStatus?.label == "completed" &&
                                          "100%"),
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </Fragment>
              );
            })}
          </div>
        </div> */}
        {/* /Tasks Tab */}

        {/* Document Upload Tab */}
        <div className="tab-pane fade" id="document_upload">
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  {/* <h3 className="card-title">
                    Upload Files{" "}
                    <a onClick={handleOpeneFileUpload} className="edit-icon">
                      <i className="fa fa-plus" />
                    </a>
                  </h3> */}
                  <div className="experience-box">
                    <ul className="experience-list">
                      {employee_documents?.map((documents, index) => {
                        const {
                          id,
                          employee,
                          document_number,
                          document_name,
                          document,
                          issue_date,
                          expiry_date,
                          status,
                          verified,
                          document_type,
                          verified_by,
                        } = documents;
                        if (employee == selectedEmployeeId) {
                          return (
                            <li key={id}>
                              <div className="experience-user">
                                <div className="before-circle" />
                              </div>
                              <div className="experience-content">
                                <div className="timeline-content">
                                  <a className="name">
                                    {document_name}
                                    {/* <div className="dropdown profile-action">
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
                                    </div> */}
                                  </a>
                                  <div>Document No: {document_number}</div>
                                  <span className="time">
                                    Document Type: {document_type}
                                  </span>
                                  <span className="time">status: {status}</span>
                                  <span className="time">
                                    Verified: {verified}
                                  </span>
                                  {issue_date && expiry_date ? (
                                    <span className="time">
                                      Issue Date: {issue_date} - Expiry Date:{" "}
                                      {expiry_date}
                                    </span>
                                  ) : null}
                                  {/* {fileDetails?.type &&
                                  fileDetails?.type?.startsWith("image/") ? (
                                    <img
                                      className="img-preview"
                                      src={fileDetails?.data}
                                      alt="Preview"
                                    />
                                  ) : (
                                    <span className="files-icon">
                                      <i className="fa fa-file-pdf-o" />
                                    </span>
                                  )} */}
                                  Document:{" "}
                                  {document != null ? (
                                    <span className="files-icon">
                                      <i className="fa fa-file-pdf-o" />
                                    </span>
                                  ) : (
                                    "Null"
                                  )}
                                </div>
                              </div>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Document Upload Tab */}
      </div>
    </>
  );
};
export default Profile;
