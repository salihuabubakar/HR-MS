import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddBorough = ({
  indexToEdit,
  id,
  dispatchBorough,
}) => {
  const [selectedBorough] = useGlobalState("selectedBorough");

  const [borough_name, setBoroughName] = useState(
    selectedBorough[indexToEdit]?.borough_name || ""
  );

  const [borough_team, setBoroughTeam] = useState(
    selectedBorough[indexToEdit]?.borough_team || ""
  );

  const [borough_street, setBoroughStreet] = useState(
    selectedBorough[indexToEdit]?.borough_street || ""
  );

  const [borough_city, setBoroughCity] = useState(
    selectedBorough[indexToEdit]?.borough_city || ""
  );
  const [borough_postcode, setPostCode] = useState(
    selectedBorough[indexToEdit]?.borough_postcode || ""
  );

  const [contact_name, setContactName] = useState(
    selectedBorough[indexToEdit]?.contact_name || ""
  );

  const [contact_email, setContactEmail] = useState(
    selectedBorough[indexToEdit]?.contact_email || ""
  );

  const [contact_position, setContactPosition] = useState(
    selectedBorough[indexToEdit]?.contact_position || ""
  );

  const [borough_phone_number, setBoroughPhone] = useState(
    selectedBorough[indexToEdit]?.borough_phone_number || ""
  );

  const [Out_of_hours_number, setOutOfHourNo] = useState(
    selectedBorough[indexToEdit]?.Out_of_hours_number || ""
  );

  const [borough_description, setBoroughDescription] = useState(
    selectedBorough[indexToEdit]?.borough_description || ""
  );


  const handleSubmit = (e) => {
    e.preventDefault();

    const boroughObject = {
      id: id,
      borough_name,
      borough_team,
      borough_street,
      borough_city,
      borough_postcode,
      contact_name,
      contact_email,
      contact_position,
      borough_phone_number,
      Out_of_hours_number,
      borough_description,
    };


    if (selectedBorough[indexToEdit]?.id) {
      dispatchBorough({
        type: "update",
        payload: boroughObject,
      });
      toast.success("Borough Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchBorough({ type: "add", payload: boroughObject });
      toast.success("Borough Added", {
        autoClose: 1500,
      });
    }
    setGlobalState("showBoroughModal", false);
  };

  const notify = (e) => {
    e.preventDefault()
    toast.warn("Can't submit empty form", {
      autoClose: 1500,
    });
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
                    {selectedBorough[indexToEdit]?.id
                      ? "Edit Borough"
                      : "Add Borough"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showBoroughModal", false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={borough_name === "" ? notify :  handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Borough Name</label>
                          <input
                            value={borough_name}
                            onChange={(e) => setBoroughName(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Borough Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Borough Team</label>
                          <input
                            value={borough_team}
                            onChange={(e) => setBoroughTeam(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Borough Team"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Borough Street
                          </label>
                          <input
                            value={borough_street}
                            onChange={(e) => setBoroughStreet(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Borough Street"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Borough City</label>
                          <input
                            value={borough_city}
                            onChange={(e) => setBoroughCity(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Borough City"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Borough Postcode
                          </label>
                          <input
                            value={borough_postcode}
                            onChange={(e) => setPostCode(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Borough Postcode"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Contact Name</label>
                          <input
                            value={contact_name}
                            onChange={(e) => setContactName(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Contact Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Contact Email
                          </label>
                          <input
                            value={contact_email}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="form-control floating"
                            type="email"
                            placeholder="Contact Email"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Contact Position
                          </label>
                          <input
                            value={contact_position}
                            onChange={(e) => setContactPosition(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Contact Position"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Borough Phone Number
                          </label>
                          <input
                            value={borough_phone_number}
                            onChange={(e) => setBoroughPhone(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Borough Phone Number"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Out of Hours Number
                          </label>
                          <input
                            value={Out_of_hours_number}
                            onChange={(e) => setOutOfHourNo(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Out of Hours Number"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Borough Description</label>
                          <textarea
                            className="form-control floating"
                            placeholder="Borough Description"
                            value={borough_description}
                            onChange={(e) =>
                              setBoroughDescription(e.target.value)
                            }
                            style={{ height: "70px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedBorough[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddBorough;
