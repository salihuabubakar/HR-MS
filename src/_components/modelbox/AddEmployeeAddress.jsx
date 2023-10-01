import React, {useState} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper, Card } from './Addemployee.style';
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddEmployeeAddress = ({
  employeeAddressIndexToEdit,
  id,
  dispatchEmployeeAddress,
  employee,
}) => {
  const [selectedEmployeeAddress] = useGlobalState("selectedEmployeeAddress");

  const [street, setStreet] = useState(
    selectedEmployeeAddress[employeeAddressIndexToEdit]?.street || ""
  );

  const [city, setCity] = useState(
    selectedEmployeeAddress[employeeAddressIndexToEdit]?.city || ""
  );

  const [state, setState] = useState(
    selectedEmployeeAddress[employeeAddressIndexToEdit]?.state || ""
  );

  const [postal_code, setPostalCode] = useState(
    selectedEmployeeAddress[employeeAddressIndexToEdit]?.postal_code || ""
  );

  const [country, setCountry] = useState(
    selectedEmployeeAddress[employeeAddressIndexToEdit]?.country || ""
  );


  const [streetNameError, setStreetNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (street === "") {
      setStreetNameError("Street is required.");
      return;
    }
    if (city === "") {
      setCityError("City is required.");
      return;
    }
    if (state === "") {
      setStateError("State is required.");
      return;
    }
    if (country === "") {
      setCountryError("Country is required.");
      return;
    }
    if (postal_code === "") {
      setPostalCodeError("Postal Code is required.");
      return;
    }

    // Clear any existing error messages
    setStreetNameError("");
    setCityError("");
    setStateError("");
    setCountryError("");
    setPostalCodeError("");
    const address = {
      id,
      employee,
      street,
      city,
      state,
      country,
      postal_code
    };
    if (selectedEmployeeAddress[employeeAddressIndexToEdit]?.id) {
      dispatchEmployeeAddress({ type: "update", payload: address });
    } else {
      dispatchEmployeeAddress({ type: "add", payload: address });
    }
    setGlobalState("showEmployeeAddressModal", false);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
    setStreetNameError("");
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
    setCityError("");
  };
  const handleStateChange = (event) => {
    setState(event.target.value);
    setStateError("");
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    setCountryError("");
  };
  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
    setPostalCodeError("");
  };
  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer  className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedEmployeeAddress[employeeAddressIndexToEdit]?.id
                      ? "Edit Address"
                      : "Add Address"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showEmployeeAddressModal", false)
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
                            Street <span className="text-danger">*</span>
                          </label>
                          <input
                            value={street}
                            onChange={handleStreetChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Street"
                          />
                          {streetNameError && (
                            <p className="error-message">{streetNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">City</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={city}
                            onChange={handleCityChange}
                            className="form-control floating"
                            type="text"
                            placeholder="City"
                          />
                          {cityError && (
                            <p className="error-message">{cityError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">State</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={state}
                            onChange={handleStateChange}
                            className="form-control floating"
                            type="text"
                            placeholder="State"
                          />
                          {stateError && (
                            <p className="error-message">{stateError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Country</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={country}
                            onChange={handleCountryChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Country"
                          />
                          {countryError && (
                            <p className="error-message">{countryError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Postal Code</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={postal_code}
                            onChange={handlePostalCodeChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Postal Code"
                          />
                          {postalCodeError && (
                            <p className="error-message">{postalCodeError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedEmployeeAddress[employeeAddressIndexToEdit]?.id
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

export default AddEmployeeAddress;
