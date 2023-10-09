import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import TextEditor from "../TextEditor";
import { RadioBtn } from "./styles";

const AddCareer = ({ 
  dispatchCareer, 
  indexToEdit, 
  id
}) => {

  const [selectedCareer] = useGlobalState(
    "selectedCareer"
  );

  const [title, setTitle] = useState(
    selectedCareer[indexToEdit]?.title || ""
  );
  const [date_posted, setDatePosted] = useState(
    selectedCareer[indexToEdit]?.date_posted || ""
  );
  const [application_deadline, setApplicationDeadline] = useState(
    selectedCareer[indexToEdit]?.application_deadline || ""
  );
  const [salary_range, setSalaryRange] = useState(
    selectedCareer[indexToEdit]?.salary_range || ""
  );
  const [job_type, setJobType] = useState(
    selectedCareer[indexToEdit]?.job_type || ""
  );
  const [hours, setHours] = useState(
    selectedCareer[indexToEdit]?.hours || ""
  );
  const [vacancy, setVacancy] = useState(
    selectedCareer[indexToEdit]?.vacancy || ""
  );
  const [active, setActive] = useState(
    selectedCareer[indexToEdit]?.active || false
  );
  const [experience_years, setExperienceYear] = useState(
    selectedCareer[indexToEdit]?.experience_years || ""
  );
  const [description, setDescription] = useState(
    selectedCareer[indexToEdit]?.description || ""
  );

  const [titleError, setTitleError] = useState("");
  const [datePostedError, setDatePostedError] = useState("");
  const [applicationDeadlineError, setApplicationDeadLineError] = useState("");
  const [jobTypeeError, setJobTypeError] = useState("");
  const [salaryRangeError, setSalaryRangeError] = useState("");
  const [experienceYearError, setExperienceYearError] = useState("");
  const [hoursError, setHoursError] = useState("");
  const [vacancyError, setVacancyError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setTitleError("Title is required.");
      return;
    }
    if (date_posted === "") {
      setDatePostedError("Date is required.");
      return;
    }
    if (application_deadline === "") {
      setApplicationDeadLineError("Date is required.");
      return;
    }
    if (job_type === "") {
      setJobTypeError("Job Type is required.");
      return;
    }
    if (salary_range === "") {
      setSalaryRangeError("Salary range is required.");
      return;
    }
    if (experience_years === "") {
      setExperienceYearError("Years of experience is required.");
      return;
    }
    if (hours === "") {
      setHoursError("Job hours is required.");
      return;
    }
    if (vacancy === "") {
      setVacancyError("Vacancy is required.");
      return;
    }
    if (description === "") {
      setDescriptionError("Description is required.");
      return;
    }
    setTitleError("");
    setDatePostedError("");
    setApplicationDeadLineError("");
    setJobTypeError("");
    setSalaryRangeError("");
    setExperienceYearError("");
    setHoursError("");
    setVacancyError("");
    setDescriptionError("");
    const career = {
      id,
      title,
      date_posted,
      application_deadline,
      job_type,
      salary_range,
      hours,
      vacancy,
      experience_years,
      description,
      active,
    };
    if (selectedCareer[indexToEdit]?.id) {
      dispatchCareer({ type: "update", payload: career });
    } else {
      dispatchCareer({ type: "add", payload: career });
    }
    setGlobalState("showCareerModal", false);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    setTitleError("");
  }
  const handlePostDate = (e) => {
    setDatePosted(e.target.value);
    setDatePostedError("");
  }
  const handleApplicationDeadLine = (e) => {
    setApplicationDeadline(e.target.value);
    setApplicationDeadLineError("");
  }
  const handleJobType = (e) => {
    setJobType(e.target.value);
    setJobTypeError("");
  }
  const handleSalaryRange = (e) => {
    setSalaryRange(e.target.value);
    setSalaryRangeError("");
  }
  const handleExperienceYear = (e) => {
    setExperienceYear(e.target.value);
    setExperienceYearError("");
  }
  const handleHours = (e) => {
    setHours(e.target.value);
    setHoursError("");
  }
  const handleVacancy = (e) => {
    setVacancy(e.target.value);
    setVacancyError("");
  }

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={true} className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedCareer[indexToEdit]?.id
                      ? "Edit Career"
                      : "Add Career"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showCareerModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Title <span className="text-danger">*</span>
                          </label>
                          <input
                            value={title}
                            onChange={handleTitleChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Title"
                          />
                          {titleError && <p className="error-message">{titleError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Post Date <span className="text-danger">*</span></label>
                          <input
                            value={date_posted}
                            onChange={handlePostDate}
                            className="form-control floating"
                            type="date"
                            placeholder="Post Date"
                          />
                          {datePostedError && <p className="error-message">{datePostedError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Application DeadLine <span className="text-danger">*</span></label>
                          <input
                            value={application_deadline}
                            onChange={handleApplicationDeadLine}
                            className="form-control floating"
                            type="date"
                            placeholder="Application DeadLine"
                          />
                          {applicationDeadlineError && <p className="error-message">{applicationDeadlineError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Job Type <span className="text-danger">*</span>
                          </label>
                          <select
                            value={job_type}
                            onChange={handleJobType}
                            className="form-control floating"
                          >
                            <option disabled value="">Select</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Full Time">Full Time</option>
                          </select>
                          {jobTypeeError && <p className="error-message">{jobTypeeError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Salary Range <span className="text-danger">*</span>
                          </label>
                          <input
                            value={salary_range}
                            onChange={handleSalaryRange}
                            className="form-control floating"
                            type="text"
                            placeholder="Salary Range"
                          />
                          {salaryRangeError && <p className="error-message">{salaryRangeError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Years of experience <span className="text-danger">*</span>
                          </label>
                          <input
                            value={experience_years}
                            onChange={handleExperienceYear}
                            className="form-control floating"
                            type="text"
                            placeholder="Years of experience"
                          />
                          {experienceYearError && <p className="error-message">{experienceYearError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Hours <span className="text-danger">*</span>
                          </label>
                          <input
                            value={hours}
                            onChange={handleHours}
                            className="form-control floating"
                            type="text"
                            placeholder="Hours"
                          />
                          {hoursError && <p className="error-message">{hoursError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Vacancy <span className="text-danger">*</span>
                          </label>
                          <input
                            value={vacancy}
                            onChange={handleVacancy}
                            className="form-control floating"
                            type="text"
                            placeholder="vacancy"
                          />
                          {vacancyError && <p className="error-message">{vacancyError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Active</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="active"
                              checked={active}
                              id="active"
                              placeholder="Active"
                              onChange={(e) => setActive(e.target.checked)}
                            />
                            <label htmlFor="active">
                              <span>{active ? "Activated" : "Activate"}</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            Description <span className="text-danger">*</span>
                          </label>
                          <TextEditor setDescriptionError={setDescriptionError} report={description} setReport={setDescription} />
                          {descriptionError && <p className="error-message">{descriptionError}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button className="btn btn-primary submit-btn">
                        {selectedCareer[indexToEdit]?.id ? "Update" : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
    </>
  );
};

export default AddCareer;
