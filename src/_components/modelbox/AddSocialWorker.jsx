import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useResidentBoroughFetching } from "../../utils/employeeCustomFetchHook";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { toast } from "react-toastify";

const AddSocialWorker = ({
  indexToEdit,
  id,
  dispatchSocialWorker,
}) => {
  const [selectedSocialWorker] = useGlobalState("selectedSocialWorker");
  const { residentBoroughData } = useResidentBoroughFetching();
  const [first_name, setFirstName] = useState(
    selectedSocialWorker[indexToEdit]?.first_name || ""
  );

  const [middle_name, setMiddleName] = useState(
    selectedSocialWorker[indexToEdit]?.middle_name || ""
  );

  const [last_name, setLastName] = useState(
    selectedSocialWorker[indexToEdit]?.last_name || ""
  );


  const [email, setEmail] = useState(
    selectedSocialWorker[indexToEdit]?.email || ""
  );

  const [mobile_number, setMobileNo] = useState(
    selectedSocialWorker[indexToEdit]?.mobile_number || ""
  );

  const [social_worker_type, setWorkerType] = useState(
    selectedSocialWorker[indexToEdit]?.social_worker_type || ""
  );
  const [social_worker_role, setWorkerRole] = useState(
    selectedSocialWorker[indexToEdit]?.social_worker_role || ""
  );

  const [borough, setBorough] = useState(
    selectedSocialWorker[indexToEdit]?.borough || ""
  );

  const [firstNameError, setFirstNameError] = useState("");
  const [workerTypeError, setWorkerTypeError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();


    if(first_name == "") {
      setFirstNameError("First Name is required");
      return;
    }
    if (social_worker_type == "") {
      setWorkerTypeError("Type is required");
      return;
    }

    setFirstNameError("");
    setWorkerTypeError("");

    const boroughObject = {
      id: id,
      first_name,
      last_name,
      middle_name,
      email,
      mobile_number,
      social_worker_type,
      social_worker_role,
      borough,
    };


    if (selectedSocialWorker[indexToEdit]?.id) {
      dispatchSocialWorker({
        type: "update",
        payload: boroughObject,
      });
      toast.success("Social worker Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchSocialWorker({ type: "add", payload: boroughObject });
      toast.success("Social worker Added", {
        autoClose: 1500,
      });
    }
    setGlobalState("showSocialWorkerModal", false);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const handleWorkerTypeChange = (e) => {
    setWorkerType(e.target.value);
    setWorkerTypeError("");
  }


  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedSocialWorker[indexToEdit]?.id
                      ? "Edit Borough"
                      : "Add Borough"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showSocialWorkerModal", false)
                    }
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">First Name</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={first_name}
                            onChange={handleFirstNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="First Name"
                          />
                          {firstNameError && (
                            <p className="error-message">{firstNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Middle Name</label>
                          <input
                            value={middle_name}
                            onChange={(e) => setMiddleName(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Middle Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Last Name</label>
                          <input
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Email</label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control floating"
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Mobile Number
                          </label>
                          <input
                            value={mobile_number}
                            onChange={(e) => setMobileNo(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Type</label>{" "}
                          <span className="text-danger">*</span>
                          <select
                            value={social_worker_type}
                            onChange={handleWorkerTypeChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select
                            </option>
                            <option value="Social Worker">Social Worker</option>
                            <option value="Personal Adviser">
                              Personal Advicer
                            </option>
                            <option value="Team Manager">Team Manager</option>
                          </select>
                          {workerTypeError && (
                            <p className="error-message">{workerTypeError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Role</label>
                          <input
                            value={social_worker_role}
                            onChange={(e) => setWorkerRole(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Role"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Borough</label>
                          <select
                            value={borough}
                            onChange={(e) => setBorough(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Borough
                            </option>
                            {residentBoroughData?.map((b) => (
                              <option key={b.id} value={b.id}>
                                {`${b.borough_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedSocialWorker[indexToEdit]?.id
                          ? "Update"
                          : "Save"}
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

export default AddSocialWorker;
