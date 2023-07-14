import React, {useState, useEffect, useReducer} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper, Card } from './Addemployee.style';
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import Select from "react-select";
import "./style.css";
import { useDataFetching } from "../../utils/employeeCustomFetchHook";
import { RadioBtn } from './styles';

const AddDepartment = ({
  dispatchHouse,
  indexToEdit,
  houseIdToEdit,
}) => {
  const [selectedHouse] = useGlobalState("selectedHouse");

  const { data: allEmployee, isLoading } = useDataFetching();

  let id = houseIdToEdit;
  const imageUrlFromServer = selectedHouse[indexToEdit]?.photo;

 const [photo, setPhoto] = useState("");

  const [name, setName] = useState(
    selectedHouse[indexToEdit]?.name || ""
  );

  const [manager, setManager] = useState(
    selectedHouse[indexToEdit]?.manager || ""
  );

  const [street_address, setStreetAddress] = useState(
    selectedHouse[indexToEdit]?.street_address || ""
  );

  const [postcode, setPostcode] = useState(
    selectedHouse[indexToEdit]?.postcode || ""
  );

  const [city, setCity] = useState(
    selectedHouse[indexToEdit]?.city || ""
  );

  const [mobile, setMobile] = useState(
    selectedHouse[indexToEdit]?.mobile || ""
  );

  const [email, setEmail] = useState(
    selectedHouse[indexToEdit]?.email || ""
  );

  const [house_type, setHouseType] = useState(
    selectedHouse[indexToEdit]?.house_type || ""
  );

  const [num_bedrooms, setNumBedrooms] = useState(
    selectedHouse[indexToEdit]?.num_bedrooms || ""
  );

  const [num_bathrooms, setNumBathrooms] = useState(
    selectedHouse[indexToEdit]?.num_bathrooms || ""
  );

  const [num_kitchens, setNumKitchens] = useState(
    selectedHouse[indexToEdit]?.num_kitchens || ""
  );

  const [square_footage, setSquareFootage] = useState(
    selectedHouse[indexToEdit]?.square_footage || ""
  );

  const [garage, setGarage] = useState(
    selectedHouse[indexToEdit]?.garage || false
  );

  const [basement, setBasement] = useState(
    selectedHouse[indexToEdit]?.basement || false
  );

  const [pool, setPool] = useState(
    selectedHouse[indexToEdit]?.pool || false
  );

  const [back_yard, setBackYard] = useState(
    selectedHouse[indexToEdit]?.back_yard || false
  );

  const [year_built, setYearBuilt] = useState(
    selectedHouse[indexToEdit]?.year_built || ""
  );

  const [air_conditioning, setAirConditioning] = useState(
    selectedHouse[indexToEdit]?.air_conditioning || false
  );

  const [heating_system, setHeatingSystem] = useState(
    selectedHouse[indexToEdit]?.heating_system || ""
  );

  const [roof_type, setRoofType] = useState(
    selectedHouse[indexToEdit]?.roof_type || ""
  );

  const [fireplace, setFireplace] = useState(
    selectedHouse[indexToEdit]?.fireplace || false
  );

  const [security_system, setSecuritySystem] = useState(
    selectedHouse[indexToEdit]?.security_system || false
  );

  const [solar_panels, setSolarPanels] = useState(
    selectedHouse[indexToEdit]?.solar_panels || false
  );

  const [num_floors, setNumFloors] = useState(
    selectedHouse[indexToEdit]?.num_floors || ""
  );

  const [floor_type, setFloorType] = useState(
    selectedHouse[indexToEdit]?.floor_type || ""
  );

  const [other_features, setOtherFeatures] = useState(
    selectedHouse[indexToEdit]?.other_features || ""
  );

  const [description, setDescription] = useState(
    selectedHouse[indexToEdit]?.description || ""
  );



  //  const isEdit = () => !!(deptIdToEdit && depts[indexToEdit]);
  const [houseNameError, setHouseNameError] = useState("");
  const [streetAddError, setStreetAddError] = useState("");
  const [cityError, setCityeError] = useState("");
  const [postcodeError, setPostCodeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setHouseNameError("Name is required.");
      return;
    }
    if (city === "") {
      setCityeError("City is required.");
      return;
    }
    if (street_address === "") {
      setStreetAddError("Street Address is required.");
      return;
    }
    if (postcode === "") {
      setPostCodeError("Postcode is required.");
      return;
    }
    if (description === "") {
      setDescriptionError("Description is required.");
      return;
    }

    // Clear any existing error messages
    setHouseNameError("");
    setCityeError("");
    setStreetAddError("");
    setPostCodeError("");
    setDescriptionError("")

    const fields = {
      name: name,
      street_address: street_address,
      postcode: postcode,
      city: city,
      mobile: mobile,
      email: email,
      house_type: house_type,
      num_bedrooms: num_bedrooms,
      num_bathrooms: num_bathrooms,
      num_kitchens: num_kitchens,
      square_footage: square_footage,
      garage: garage,
      basement: basement,
      pool: pool,
      back_yard: back_yard,
      year_built: year_built,
      air_conditioning: air_conditioning,
      heating_system: heating_system,
      roof_type: roof_type,
      fireplace: fireplace,
      security_system: security_system,
      solar_panels: solar_panels,
      num_floors: num_floors,
      floor_type: floor_type,
      // other_features: other_features,
      description: description,
      photo: photo,
      manager: manager,
    };

    Object.entries(fields).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedHouse[indexToEdit]?.id) {
      dispatchHouse({ type: "update", payload: {id, formData} });
    } else {
      dispatchHouse({ type: "add", payload: formData });
    }
    setGlobalState("showModal", false);
  };

  const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected && "#FF9B44",
      color: state.isSelected && "#262626",
      "&:hover": {
        backgroundColor: "#FF9B44",
        color: "#262626",
      },
    }),
  };


  const imageOnChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };


  const handleHouseNameChange = (e) => {
    setName(e.target.value);
    setHouseNameError("");
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
    setCityeError("");
  };
  const handleStreetChange = (e) => {
    setStreetAddress(e.target.value);
    setStreetAddError("");
  };
  const handlePostCodeChange = (e) => {
    setPostcode(e.target.value);
    setPostCodeError("");
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };


  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={true} className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedHouse[indexToEdit]?.id ? "Edit House" : "Add House"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div style={{ borderRadius: "5px" }} className="profile-img-wrap edit-img">
                          <img
                            style={{ borderRadius: "5px" }}
                            className="inline-block"
                            src={photo ? URL.createObjectURL(photo) : imageUrlFromServer}
                            alt="house_image"
                          />
                          <div className="fileupload btn">
                            <span className="btn-text">
                              {selectedHouse[indexToEdit]?.id ? "Update" : "Upload"}
                            </span>
                            <input
                              className="upload"
                              type="file"
                              accept="image/*"
                              onChange={imageOnChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            House Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={name}
                            onChange={handleHouseNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="House Name"
                          />
                          {houseNameError && <p className="error-message">{houseNameError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            City <span className="text-danger">*</span>
                          </label>
                          <input
                            value={city}
                            onChange={handleCityChange}
                            className="form-control floating"
                            type="text"
                            placeholder="City"
                          />
                          {cityError && <p className="error-message">{cityError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Street Address <span className="text-danger">*</span>
                          </label>
                          <input
                            value={street_address}
                            onChange={handleStreetChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Street Address"
                          />
                          {streetAddError && <p className="error-message">{streetAddError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Postcode <span className="text-danger">*</span>
                          </label>
                          <input
                            value={postcode}
                            onChange={handlePostCodeChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Postcode"
                          />
                          {postcodeError && <p className="error-message">{postcodeError}</p>}
                        </div>
                      </div>
                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Manager</label>
                          <input
                            value={manager}
                            onChange={(e) => setManager(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Manager"
                          />
                        </div>
                      </div> */}
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Manager</label>
                          <select
                            value={manager}
                            onChange={(e) => setManager(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Manager
                            </option>
                            {allEmployee?.map((employee) => (
                              <option key={employee.id} value={employee.id}>
                                {`${employee.first_name} ${employee.middle_name} ${employee.last_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Mobile</label>
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
                          <label className="col-form-label">House Type</label>
                          <input
                            value={house_type}
                            onChange={(e) => setHouseType(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="House Type"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">No of Bedrooms</label>
                          <input
                            value={num_bedrooms}
                            onChange={(e) => setNumBedrooms(e.target.value)}
                            className="form-control floating"
                            type="number"
                            placeholder="No of Bedrooms"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">No of Bathrooms</label>
                          <input
                            value={num_bathrooms}
                            onChange={(e) => setNumBathrooms(e.target.value)}
                            className="form-control floating"
                            type="number"
                            placeholder="No of Bathrooms"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">No of Kitchens</label>
                          <input
                            value={num_kitchens}
                            onChange={(e) => setNumKitchens(e.target.value)}
                            className="form-control floating"
                            type="number"
                            placeholder="No of Kitchens"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Square Footage</label>
                          <input
                            value={square_footage}
                            onChange={(e) => setSquareFootage(e.target.value)}
                            className="form-control floating"
                            type="number"
                            placeholder="Square Footage"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Garage</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="Garage"
                              checked={garage}
                              id="Garage"
                              placeholder="Garage"
                              onChange={(e) => setGarage(e.target.checked)}
                            />
                            <label htmlFor="Garage">
                              <span>Garage</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Basement</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="Garage"
                              checked={basement}
                              id="Basement"
                              placeholder="Basement"
                              onChange={(e) => setBasement(e.target.checked)}
                            />
                            <label htmlFor="Basement">
                              <span>Basement</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Pool</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="Pool"
                              checked={pool}
                              id="Pool"
                              placeholder="Pool"
                              onChange={(e) => setPool(e.target.checked)}
                            />
                            <label htmlFor="Pool">
                              <span>Pool</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Back Yard</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="Back_Yard"
                              checked={back_yard}
                              id="Back_Yard"
                              placeholder="Back Yard"
                              onChange={(e) => setBackYard(e.target.checked)}
                            />
                            <label htmlFor="Back_Yard">
                              <span>Back Yard</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Year Built</label>
                          <input
                            value={year_built}
                            onChange={(e) => setYearBuilt(e.target.value)}
                            className="form-control floating"
                            type="number"
                            placeholder="Year Built"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Air Conditioning</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="air_conditioning"
                              checked={air_conditioning}
                              id="air_conditioning"
                              placeholder="Air Conditioning"
                              onChange={(e) => setAirConditioning(e.target.checked)}
                            />
                            <label htmlFor="air_conditioning">
                              <span>Air Conditioning</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Heating System</label>
                          <input
                            value={heating_system}
                            onChange={(e) => setHeatingSystem(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Heating System"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Roof Type</label>
                          <input
                            value={roof_type}
                            onChange={(e) => setRoofType(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Roof Type"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Fire Place</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="fireplace"
                              checked={fireplace}
                              id="fireplace"
                              placeholder="Fire Place"
                              onChange={(e) => setFireplace(e.target.checked)}
                            />
                            <label htmlFor="fireplace">
                              <span>Fire Place</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Security System</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="security_system"
                              checked={security_system}
                              id="security_system"
                              placeholder="Security System"
                              onChange={(e) => setSecuritySystem(e.target.checked)}
                            />
                            <label htmlFor="security_system">
                              <span>Security System</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Solar Panels</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="solar_panels"
                              checked={solar_panels}
                              id="solar_panels"
                              placeholder="Solar Panels"
                              onChange={(e) => setSolarPanels(e.target.checked)}
                            />
                            <label htmlFor="solar_panels">
                              <span>Solar Panels</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">No FLoors</label>
                          <input
                            value={num_floors}
                            onChange={(e) => setNumFloors(e.target.value)}
                            className="form-control floating"
                            type="number"
                            placeholder="No FLoors"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">FLoor Type</label>
                          <input
                            value={floor_type}
                            onChange={(e) => setFloorType(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="FLoor Type"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Description</label>{" "}
                          <span className="text-danger">*</span>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{ height: "70px" }}
                          />
                          {descriptionError && <p className="error-message">{descriptionError}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedHouse[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddDepartment;
