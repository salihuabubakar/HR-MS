import React, { useEffect, useState } from 'react'
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import { useResidentFetching } from '../../utils/employeeCustomFetchHook';
import { isMobile } from '../../utils/mediaQuery';

const AddHouseResident = ({
  house,
  dispatchHouseResident,
  houseResidentIndexToEdit,
  id,
  roomData,
}) => {
  const [selectedHouseResident] = useGlobalState("selectedHouseResident");
  const { residentData } = useResidentFetching()
  const [status, setStatus] = useState(
    selectedHouseResident[houseResidentIndexToEdit]?.status || ""
  );

  const [room, setRoom] = useState(
    selectedHouseResident[houseResidentIndexToEdit]?.room || ""
  );

  const [resident, setResident] = useState(
    selectedHouseResident[houseResidentIndexToEdit]?.resident || ""
  );

  const [occupancy_start_date, setOccupancyStartDate] = useState(
    selectedHouseResident[houseResidentIndexToEdit]?.occupancy_start_date || null
  );

  const [occupancy_end_date, setOccupancyEndDate] = useState(
    selectedHouseResident[houseResidentIndexToEdit]?.occupancy_end_date || null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const houseResident = {
      id,
      house,
      room,
      status,
      resident,
      occupancy_start_date,
      occupancy_end_date,
    };
    if (selectedHouseResident[houseResidentIndexToEdit]?.id) {
      dispatchHouseResident({ type: "update", payload: houseResident });
    } else {
      dispatchHouseResident({ type: "add", payload: houseResident });
    }
    setGlobalState("showHouseResidentModal", false);
  };

  const handleHouseResidentChange = (event) => {
    setResident(event.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={ isMobile() && true } className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedHouseResident[houseResidentIndexToEdit]?.id
                      ? "Edit House Resident"
                      : "Add House Resident"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showHouseResidentModal", false)
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
                          <label className="col-form-label">Resident</label>
                          <select
                            value={resident}
                            onChange={handleHouseResidentChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Resident
                            </option>
                            {residentData?.map((resident) => (
                              <option key={resident.id} value={resident.id}>
                                {`${resident.first_name} ${resident.middle_name} ${resident.last_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Status</label>
                          <select
                            value={status}
                            onChange={handleStatusChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Room</label>
                          <select
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Room
                            </option>
                            {roomData.map((r, index) => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Occupancy Start Date
                          </label>
                          <input
                            value={occupancy_start_date}
                            onChange={(event) =>
                              setOccupancyStartDate(event.target.value)
                            }
                            className="form-control floating"
                            type="date"
                            placeholder="Join Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Occupancy End Date
                          </label>
                          <input
                            value={occupancy_end_date}
                            onChange={(event) =>
                              setOccupancyEndDate(event.target.value)
                            }
                            className="form-control floating"
                            type="date"
                            placeholder="End Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedHouseResident[houseResidentIndexToEdit]?.id
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

export default AddHouseResident;
