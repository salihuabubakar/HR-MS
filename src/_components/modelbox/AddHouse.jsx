import React, {useState, useEffect, useReducer} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper, Card } from './Addemployee.style';
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import Select from "react-select";
import "./style.css";
import { useDataFetching } from "../../utils/employeeCustomFetchHook";

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
    selectedHouse[indexToEdit]?.name
      ? selectedHouse[indexToEdit]?.name
      : ""
  );

  const [manager, setManager] = useState(
    selectedHouse[indexToEdit]?.manager
      ? selectedHouse[indexToEdit]?.manager
      : ""
  );

  const [street_address, setStreetAddress] = useState(
    selectedHouse[indexToEdit]?.street_address
      ? selectedHouse[indexToEdit]?.street_address
      : ""
  );

  const [postcode, setPostcode] = useState(
    selectedHouse[indexToEdit]?.postcode
      ? selectedHouse[indexToEdit]?.postcode
      : ""
  );

  const [city, setCity] = useState(
    selectedHouse[indexToEdit]?.city ? selectedHouse[indexToEdit]?.city : ""
  );

  const [mobile, setMobile] = useState(
    selectedHouse[indexToEdit]?.mobile ? selectedHouse[indexToEdit]?.mobile : ""
  );

  const [email, setEmail] = useState(
    selectedHouse[indexToEdit]?.email ? selectedHouse[indexToEdit]?.email : ""
  );

  const [house_type, setHouseType] = useState(
    selectedHouse[indexToEdit]?.house_type
      ? selectedHouse[indexToEdit]?.house_type
      : ""
  );

  const [num_bedrooms, setNumBedrooms] = useState(
    selectedHouse[indexToEdit]?.num_bedrooms
      ? selectedHouse[indexToEdit]?.num_bedrooms
      : ""
  );

  const [num_bathrooms, setNumBathrooms] = useState(
    selectedHouse[indexToEdit]?.num_bathrooms
      ? selectedHouse[indexToEdit]?.num_bathrooms
      : ""
  );

  const [num_kitchens, setNumKitchens] = useState(
    selectedHouse[indexToEdit]?.num_kitchens
      ? selectedHouse[indexToEdit]?.num_kitchens
      : ""
  );

  const [square_footage, setSquareFootage] = useState(
    selectedHouse[indexToEdit]?.square_footage
      ? selectedHouse[indexToEdit]?.square_footage
      : ""
  );

  const [garage, setGarage] = useState(
    selectedHouse[indexToEdit]?.garage
      ? selectedHouse[indexToEdit]?.garage
      : false
  );

  const [basement, setBasement] = useState(
    selectedHouse[indexToEdit]?.basement
      ? selectedHouse[indexToEdit]?.basement
      : false
  );

  const [pool, setPool] = useState(
    selectedHouse[indexToEdit]?.pool ? selectedHouse[indexToEdit]?.pool : false
  );

  const [back_yard, setBackYard] = useState(
    selectedHouse[indexToEdit]?.back_yard
      ? selectedHouse[indexToEdit]?.back_yard
      : false
  );

  const [year_built, setYearBuilt] = useState(
    selectedHouse[indexToEdit]?.year_built
      ? selectedHouse[indexToEdit]?.year_built
      : ""
  );

  const [air_conditioning, setAirConditioning] = useState(
    selectedHouse[indexToEdit]?.air_conditioning
      ? selectedHouse[indexToEdit]?.air_conditioning
      : false
  );

  const [heating_system, setHeatingSystem] = useState(
    selectedHouse[indexToEdit]?.heating_system
      ? selectedHouse[indexToEdit]?.heating_system
      : ""
  );

  const [roof_type, setRoofType] = useState(
    selectedHouse[indexToEdit]?.roof_type
      ? selectedHouse[indexToEdit]?.roof_type
      : ""
  );

  const [fireplace, setFireplace] = useState(
    selectedHouse[indexToEdit]?.fireplace
      ? selectedHouse[indexToEdit]?.fireplace
      : false
  );

  const [security_system, setSecuritySystem] = useState(
    selectedHouse[indexToEdit]?.security_system
      ? selectedHouse[indexToEdit]?.security_system
      : false
  );

  const [solar_panels, setSolarPanels] = useState(
    selectedHouse[indexToEdit]?.solar_panels
      ? selectedHouse[indexToEdit]?.solar_panels
      : false
  );

  const [num_floors, setNumFloors] = useState(
    selectedHouse[indexToEdit]?.num_floors
      ? selectedHouse[indexToEdit]?.num_floors
      : ""
  );

  const [floor_type, setFloorType] = useState(
    selectedHouse[indexToEdit]?.floor_type
      ? selectedHouse[indexToEdit]?.floor_type
      : ""
  );

  const [other_features, setOtherFeatures] = useState(
    selectedHouse[indexToEdit]?.other_features
      ? selectedHouse[indexToEdit]?.other_features
      : ""
  );

  const [description, setDescription] = useState(
    selectedHouse[indexToEdit]?.description
      ? selectedHouse[indexToEdit]?.description
      : ""
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
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedHouse[indexToEdit]?.id
                      ? "Edit House"
                      : "Add House"}
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
                        <div
                          style={{ borderRadius: "5px" }}
                          className="profile-img-wrap edit-img"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            className="inline-block"
                            src={
                              photo
                                ? URL.createObjectURL(photo)
                                : imageUrlFromServer
                            }
                            alt="house_image"
                          />
                          <div className="fileupload btn">
                            <span className="btn-text">
                              {selectedHouse[indexToEdit]?.id
                                ? "Update"
                                : "Upload"}
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
                          <label className="label">
                            House Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={name}
                            onChange={handleHouseNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="House Name"
                          />
                          {houseNameError && (
                            <p className="error-message">{houseNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            City <span className="text-danger">*</span>
                          </label>
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
                          <label className="label">
                            Street Address{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={street_address}
                            onChange={handleStreetChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Street Address"
                          />
                          {streetAddError && (
                            <p className="error-message">{streetAddError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Postcode <span className="text-danger">*</span>
                          </label>
                          <input
                            value={postcode}
                            onChange={handlePostCodeChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Postcode"
                          />
                          {postcodeError && (
                            <p className="error-message">{postcodeError}</p>
                          )}
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
                          <label className="label">Mobile</label>
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
                          <label className="label">Email</label>
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
                          <label className="label">House Type</label>
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
                          <label className="label">No of Bedrooms</label>
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
                          <label className="label">No of Bathrooms</label>
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
                          <label className="label">No of Kitchens</label>
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
                          <label className="label">Square Footage</label>
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
                          <label className="label">Garage</label>
                          <input
                            checked={garage}
                            onChange={(e) => setGarage(e.target.checked)}
                            // className="form-control floating"
                            type="checkbox"
                            placeholder="Garage"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Basement</label>
                          <input
                            checked={basement}
                            onChange={(e) => setBasement(e.target.checked)}
                            // className="form-control floating"
                            type="checkbox"
                            placeholder="Basement"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Pool</label>
                          <input
                            checked={pool}
                            onChange={(e) => setPool(e.target.checked)}
                            // className="form-control floating"
                            type="checkbox"
                            placeholder="Pool"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Back Yard</label>
                          <input
                            checked={back_yard}
                            onChange={(e) => setBackYard(e.target.checked)}
                            // className="form-control floating"
                            type="checkbox"
                            placeholder="Back yard"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Year Built</label>
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
                          <label className="label">Air Conditioning</label>
                          <input
                            checked={air_conditioning}
                            onChange={(e) =>
                              setAirConditioning(e.target.checked)
                            }
                            // className="form-control floating"
                            type="checkbox"
                            placeholder="Air Conditioning"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Heating System</label>
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
                          <label className="label">Roof Type</label>
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
                          <label className="label">Fire Place</label>
                          <input
                            checked={fireplace}
                            onChange={(e) => setFireplace(e.target.checked)}
                            // className="form-control floating"
                            type="checkbox"
                            placeholder="Fire Place"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Security System</label>
                          <input
                            checked={security_system}
                            onChange={(e) =>
                              setSecuritySystem(e.target.checked)
                            }
                            type="checkbox"
                            placeholder="Security System"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Solar Panels</label>
                          <input
                            checked={solar_panels}
                            onChange={(e) => setSolarPanels(e.target.checked)}
                            // className="form-control floating"
                            type="checkbox"
                            placeholder="Solar Panels"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">No FLoors</label>
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
                          <label className="label">FLoor Type</label>
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
                          <label className="label">Description</label>{" "}
                          <span className="text-danger">*</span>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{ height: "70px" }}
                          />
                          {descriptionError && (
                            <p className="error-message">{descriptionError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
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
