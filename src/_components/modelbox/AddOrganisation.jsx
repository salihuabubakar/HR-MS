import React, {useState} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper, Card } from './Addemployee.style';
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { toast } from "react-toastify";

const AddOrganisation = ({
  indexToEdit,
  getOrganisationId,
  dispatchOrganisation,
}) => {
  const [selectedOrganisation] = useGlobalState("selectedOrganisation");
  let id = getOrganisationId;

  const [organisation_name, setOrganisationName] = useState(
    selectedOrganisation[indexToEdit]?.organisation_name || ""
  );

  const [manager_name, setManagerName] = useState(
    selectedOrganisation[indexToEdit]?.manager_name || ""
  );

  const [mobile, setMobile] = useState(
    selectedOrganisation[indexToEdit]?.mobile || ""
  );

  const [office_phone, setOfficePhone] = useState(
    selectedOrganisation[indexToEdit]?.office_phone || ""
  );

  const [email, setEmail] = useState(
    selectedOrganisation[indexToEdit]?.email || ""
  );

  const [city, setCity] = useState(
    selectedOrganisation[indexToEdit]?.city || ""
  );

  const [street, setStreet] = useState(
    selectedOrganisation[indexToEdit]?.street || ""
  );

  const [post_code, setPostCode] = useState(
    selectedOrganisation[indexToEdit]?.post_code || ""
  );

  const [country, setCountry] = useState(
    selectedOrganisation[indexToEdit]?.country || ""
  );


  const [orgNameError, setOrgNameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (organisation_name === "") {
      setOrgNameError("Organisation Name is required.");
      return;
    }

    // Clear any existing error messages
    setOrgNameError("");
    const organisation = {
      id,
      organisation_name,
      manager_name,
      mobile,
      office_phone,
      email,
      city,
      street,
      post_code,
      country,
    };
    if (selectedOrganisation[indexToEdit]?.id) {
      dispatchOrganisation({ type: "update", payload: organisation });
      toast.success("Organisation Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchOrganisation({ type: "add", payload: organisation });
      toast.success("Organisation Added", {
        autoClose: 1500,
      });
    }
    setGlobalState("showOrganisationModal", false);
  };

  const handleOrgNameChange = (event) => {
    setOrganisationName(event.target.value);
    setOrgNameError("");
  };
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
                  <h5 className="card-title">
                    {selectedOrganisation[indexToEdit]?.id
                      ? "Edit Organisation"
                      : "Add Organisation"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showOrganisationModal", false)
                    }
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Organisation Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={organisation_name}
                            onChange={handleOrgNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Organisation Name"
                          />
                          {orgNameError && (
                            <p className="error-message">{orgNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Manager Name
                          </label>
                          <input
                            value={manager_name}
                            onChange={(e) => setManagerName(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Manager Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Mobile
                          </label>
                          <input
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Mobile"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Office Phone
                          </label>
                          <input
                            value={office_phone}
                            onChange={(e) => setOfficePhone(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Office Phone"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Email
                          </label>
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
                          <label className="label">
                            City
                          </label>
                          <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="City"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Street
                          </label>
                          <input
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Street"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Post Code
                          </label>
                          <input
                            value={post_code}
                            onChange={(e) => setPostCode(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Post Code"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Country
                          </label>
                          <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Country"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedOrganisation[indexToEdit]?.id
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

export default AddOrganisation;
