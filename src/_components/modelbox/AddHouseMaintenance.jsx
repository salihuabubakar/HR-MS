import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import Dropzone from "react-dropzone";
import {
  useHouseDocumentFetching,
  useDataFetching,
  useHouseImageFetching,
  useOrganisationFetching
} from "../../utils/employeeCustomFetchHook";
import { MenuItem, Autocomplete, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";

const AddHouseMaintenance = ({ dispatchMaintenance, maintenanceIndexToEdit, house, id }) => {
  const { houseDocumentsData } = useHouseDocumentFetching();
  const { data: allEmployee } = useDataFetching();
  const { houseImagesData } = useHouseImageFetching();
  const { organisationData } = useOrganisationFetching();
  const [selectedMaintenance] = useGlobalState("selectedMaintenance");

  const [date, setDate] = useState(
    selectedMaintenance[maintenanceIndexToEdit]?.date || ""
  );

  const [cost, setCost] = useState(
    selectedMaintenance[maintenanceIndexToEdit]?.cost || ""
  );

  const [beforeImage, setBeforeImage] = useState(
    selectedMaintenance[maintenanceIndexToEdit]?.Before_Image || []
  );

  const [afterImage, setAfterImage] = useState(
    selectedMaintenance[maintenanceIndexToEdit]?.After_Image || []
  );

  const [documents, setDocuments] = useState(
    selectedMaintenance[maintenanceIndexToEdit]?.documents || []
  );

  const [status, setStatus] = useState(
    selectedMaintenance[maintenanceIndexToEdit]?.status || ""
  );

  const [Employee, setEmployee] = useState(
    selectedMaintenance[maintenanceIndexToEdit]?.Employee || ""
  );

  const [Organization, setOrganization] = useState(
    selectedMaintenance[maintenanceIndexToEdit]?.Organization || ""
  );

  const [description, setDescription] = useState(
    selectedMaintenance[maintenanceIndexToEdit]?.description || ""
  );

  const [costError, setCostError] = useState("");
  const [dateError, setDateError] = useState("");
  const [beforeImageError, setBeforeImageError] = useState("");
  const [afterImageError, setAfterImageError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [documentsError, setDocumentsError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cost === "") {
      setCostError("Cost is required.");
      return;
    }
    if (date === "") {
      setDateError("Date is required.");
      return;
    }
    if (beforeImage?.length === 0) {
      setBeforeImageError("Before Image is required.");
      return;
    }
    if (afterImage?.length === 0) {
      setAfterImageError("After Image is required.");
      return;
    }
    if (status === "") {
      setStatusError("Status is required.");
      return;
    }
    if (documents?.length === 0) {
      setDocumentsError("Document is required.");
      return;
    }
    if (description === "") {
      setDescriptionError("Description is required.");
      return;
    }

    // Clear any existing error messages
    setCostError("");
    setDateError("");
    setBeforeImageError("");
    setAfterImageError("");
    setStatusError("");
    setDocumentsError("");
    setDescriptionError("");

    const fields = {
      id,
      house,
      date,
      cost,
      Before_Image: beforeImage,
      After_Image: afterImage,
      status,
      Employee,
      Organization,
      documents,
      description,
    };

    if (selectedMaintenance[maintenanceIndexToEdit]?.id) {
      dispatchMaintenance({ type: "update", payload: fields });
      toast.success("House Maintenance Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchMaintenance({ type: "add", payload: fields });
      toast.success("House Maintenance Added", {
        autoClose: 1500,
      });
    }
    setGlobalState("showMaintenanceModal", false);
  };

  const handleCostChange = (e) => {
    setCost(e.target.value);
    setCostError("");
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setDateError("");
  };

  const image = [];
  houseImagesData?.map((img) => {
    image.push({id: img.id, name: img.name});
  })

  const handleBeforeImageChange = (e, value) => {
    const list = value?.map((v) => v.id);
    setBeforeImage(list);
    setBeforeImageError("");
  };

  const handleAfterImageChange = (e, value) => {
    const list = value?.map((v) => v.id);
    setAfterImage(list);
    setAfterImageError("");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusError("");
  };

  const getHouseImagesDefaultValues = (image) => {
    if (Array.isArray(image)) {
      return image?.map((img) => ({
        id: img.id,
      }));
    }
    return [];
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const document = [];
  houseDocumentsData?.map((doc) => {
    document.push({
      name: doc.title,
      id: doc.id,
    });
  });

  const handleHouseDocuments = (event, value) => {
    const list = value?.map((v) => v.id);
    setDocuments(list);
    setDocumentsError("");
  };

  const getHouseDocumentDefaultValues = (document) => {
    if (Array.isArray(document)) {
      return document?.map((doc) => ({
        id: doc.id,
      }));
    }
    return [];
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
                    {selectedMaintenance[maintenanceIndexToEdit]?.id
                      ? "Edit Maintenance"
                      : "Add Maintenance"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showMaintenanceModal", false)
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
                            Cost <span className="text-danger">*</span>
                          </label>
                          <input
                            value={cost}
                            onChange={handleCostChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Cost"
                          />
                          {costError && (
                            <p className="error-message">{costError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Date <span className="text-danger">*</span>
                          </label>
                          <input
                            value={date}
                            onChange={handleDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Date"
                          />
                          {dateError && (
                            <p className="error-message">{dateError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Before Image</label> {""}
                          <span className="text-danger">*</span>
                          <Autocomplete
                            sx={{
                              m: 1,
                              width: 350,
                              // "& .MuiInputBase-root": {
                              //   height: "45px", // Adjust the height here
                              // },
                            }}
                            multiple
                            id="tags-standard"
                            options={image}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            defaultValue={getHouseImagesDefaultValues(
                              selectedMaintenance[maintenanceIndexToEdit]
                                ?.Before_Image
                            )}
                            onChange={(event, value) =>
                              handleBeforeImageChange(event, value)
                            }
                            disableCloseOnSelect
                            renderOption={(props, option, { selected }) => (
                              <MenuItem
                                key={option.id}
                                value={option.id}
                                sx={{ justifyContent: "space-between" }}
                                {...props}
                              >
                                {option.name}
                                {selected ? <CheckIcon color="info" /> : null}
                              </MenuItem>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Select Multiple Image"
                                placeholder="Before Image"
                              />
                            )}
                          />
                          {beforeImageError && (
                            <p className="error-message">{beforeImageError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">After Image</label> {""}
                          <span className="text-danger">*</span>
                          <Autocomplete
                            sx={{
                              m: 1,
                              width: 350,
                              // "& .MuiInputBase-root": {
                              //   height: "45px", // Adjust the height here
                              // },
                            }}
                            multiple
                            id="tags-standard"
                            options={image}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            defaultValue={getHouseImagesDefaultValues(
                              selectedMaintenance[maintenanceIndexToEdit]
                                ?.After_Image
                            )}
                            onChange={(event, value) =>
                              handleAfterImageChange(event, value)
                            }
                            disableCloseOnSelect
                            renderOption={(props, option, { selected }) => (
                              <MenuItem
                                key={option.id}
                                value={option.id}
                                sx={{ justifyContent: "space-between" }}
                                {...props}
                              >
                                {option.name}
                                {selected ? <CheckIcon color="info" /> : null}
                              </MenuItem>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Select Multiple Image"
                                placeholder="After Image"
                              />
                            )}
                          />
                          {afterImageError && (
                            <p className="error-message">{afterImageError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Status <span className="text-danger">*</span>
                          </label>
                          <select
                            value={status}
                            onChange={handleStatusChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select
                            </option>
                            <option value="Pending">Pending</option>
                            <option value="Progress">Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                          {statusError && (
                            <p className="error-message">{statusError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Employee</label>
                          <select
                            value={Employee}
                            onChange={(e) => setEmployee(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select
                            </option>
                            {allEmployee?.map((employee, index) => (
                              <option key={employee.id} value={employee.id}>
                                {`${employee.first_name} ${employee.middle_name} ${employee.last_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Organisation</label>
                          <select
                            value={Organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select
                            </option>
                            {organisationData?.map((organisationData) => (
                              <option key={organisationData.id} value={organisationData.id}>
                                {organisationData.organisation_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Document</label> {""}
                          <span className="text-danger">*</span>
                          <Autocomplete
                            sx={{
                              m: 1,
                              width: 350,
                              // "& .MuiInputBase-root": {
                              //   height: "45px", // Adjust the height here
                              // },
                            }}
                            multiple
                            id="tags-standard"
                            options={document}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            defaultValue={getHouseDocumentDefaultValues(
                              selectedMaintenance[maintenanceIndexToEdit]
                                ?.documents
                            )}
                            onChange={(event, value) =>
                              handleHouseDocuments(event, value)
                            }
                            disableCloseOnSelect
                            renderOption={(props, option, { selected }) => (
                              <MenuItem
                                key={option.id}
                                value={option.id}
                                sx={{ justifyContent: "space-between" }}
                                {...props}
                              >
                                {option.name}
                                {selected ? <CheckIcon color="info" /> : null}
                              </MenuItem>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Select Multiple Document"
                                placeholder="Photo Names"
                              />
                            )}
                          />
                          {documentsError && (
                            <p className="error-message">{documentsError}</p>
                          )}
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
                        {selectedMaintenance[maintenanceIndexToEdit]?.id
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

export default AddHouseMaintenance;
