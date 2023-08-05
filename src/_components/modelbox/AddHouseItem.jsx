import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import {
  useHouseDocumentFetching,
} from "../../utils/employeeCustomFetchHook";
import Select from "react-select";


const AddHouseItem = ({ dispatchItem, itemIndexToEdit, house, id }) => {
  const { houseDocumentsData } = useHouseDocumentFetching();
  const [selectedItem] = useGlobalState("selectedItem");

  const [name, setName] = useState(
    selectedItem[itemIndexToEdit]?.name || ""
  );

  const [quantity, setQuantity] = useState(
    selectedItem[itemIndexToEdit]?.quantity || null
  );

  const [location, setLocation] = useState(
    selectedItem[itemIndexToEdit]?.location || ""
  );

  const [category, setCategory] = useState(
    selectedItem[itemIndexToEdit]?.category || ""
  );

  const [purchase_date, setPurchaseDate] = useState(
    selectedItem[itemIndexToEdit]?.purchase_date || null
  );

  const [expiry_date, setExpiryDate] = useState(
    selectedItem[itemIndexToEdit]?.expiry_date || null
  );

  const [documents, setDocuments] = useState(
    selectedItem[itemIndexToEdit]?.documents || []
  );


  const [description, setDescription] = useState(
    selectedItem[itemIndexToEdit]?.description || ""
  );

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [documentsError, setDocumentsError] = useState("");
  const [purchaseDateError, setPurchaseDateError] = useState("");

  // const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError("Name is required.");
      return;
    }
    if (category === "") {
      setCategoryError("Category is required.");
      return;
    }
    if (purchase_date === null) {
      setPurchaseDateError("Purchase date is required.");
      return;
    }
    if (documents?.length === 0) {
      setDocumentsError("Document is required.");
      return;
    }

    // Clear any existing error messages
    setNameError("");
    setCategoryError("");
    setPurchaseDateError("");
    setDocumentsError("");

    const fields = {
      id,
      house,
      name,
      category,
      purchase_date,
      expiry_date,
      quantity,
      location,
      documents,
      description,
    };

    if (selectedItem[itemIndexToEdit]?.id) {
      dispatchItem({ type: "update", payload: fields });
    } else {
      dispatchItem({ type: "add", payload: fields });
    }
    setGlobalState("showItemModal", false);
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

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCategoryError("")
  };

  const handlePurchaseDate = (e) => {
    setPurchaseDate(e.target.value);
    setPurchaseDateError("");
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const document = [];
  houseDocumentsData?.map((doc) => {
    document.push({
      title: doc.title,
      id: doc.id,
    });
  });

  const handleHouseDocuments = (event) => {
    const mappedID = event?.map((resID) => resID.id);
    setDocuments(mappedID);
    setDocumentsError("");
  };

  const getHouseDocumentDefaultValues = () => {
    const val = selectedItem[itemIndexToEdit]?.documents;
    if (!selectedItem || !val) {
      return [];
    }
    return houseDocumentsData
      .filter((document) => val.includes(document.id))
      .map((document) => ({
        id: document.id,
        title: document.title,
      }));
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
                    {selectedItem[itemIndexToEdit]?.id ? "Edit Item" : "Add Item"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showItemModal", false)}
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
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={name}
                            onChange={handleNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Name"
                          />
                          {nameError && <p className="error-message">{nameError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Quantity</label>
                          <input
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Quantity"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Category</label>{" "}
                          <span className="text-danger">*</span>
                          <select
                            value={category}
                            onChange={handleCategoryChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Category
                            </option>
                            <option value="Furniture">Furniture</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Others">Others</option>
                          </select>
                          {categoryError && <p className="error-message">{categoryError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Location</label>
                          <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Location"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Purchase Date <span className="text-danger">*</span></label>
                          <input
                            value={purchase_date}
                            onChange={handlePurchaseDate}
                            className="form-control floating"
                            type="date"
                            placeholder="Purchase Date"
                          />
                          {purchaseDateError && <p className="error-message">{purchaseDateError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Expiry Date</label>
                          <input
                            value={expiry_date}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="form-control floating"
                            type="date"
                            placeholder="Expiry Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Select Document <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getHouseDocumentDefaultValues()}
                            onChange={handleHouseDocuments}
                            isMulti
                            closeMenuOnSelect={false}
                            options={document}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.title}
                            placeholder="Select Multiple Document"
                          />
                          {documentsError && <p className="error-message">{documentsError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{ height: "70px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedItem[itemIndexToEdit]?.id ? "Update" : "Save"}
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

export default AddHouseItem;
