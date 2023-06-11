import React, { useState } from "react";
import { useDataFetching } from "../../utils/employeeCustomFetchHook";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";

const AddHouseEmployee = ({
  house,
  dispatchHouseEmployee,
  houseEmployeeIndexToEdit,
  id,
}) => {
  const { data: allEmployee, isLoading } = useDataFetching();
  const [selectedHouseEmployee] = useGlobalState("selectedHouseEmployee");

  const [status, setStatus] = useState(
    selectedHouseEmployee[houseEmployeeIndexToEdit]?.status
      ? selectedHouseEmployee[houseEmployeeIndexToEdit]?.status
      : ""
  );

  const [employee, setEmployee] = useState(
    selectedHouseEmployee[houseEmployeeIndexToEdit]?.employee
      ? selectedHouseEmployee[houseEmployeeIndexToEdit]?.employee
      : ""
  );

  const [join_date, setJoinDate] = useState(
    selectedHouseEmployee[houseEmployeeIndexToEdit]?.join_date
      ? selectedHouseEmployee[houseEmployeeIndexToEdit]?.join_date
      : ""
  );

  const [end_date, setEndDate] = useState(
    selectedHouseEmployee[houseEmployeeIndexToEdit]?.end_date
      ? selectedHouseEmployee[houseEmployeeIndexToEdit]?.end_date
      : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const houseEmployee = {
      id,
      house,
      status,
      employee,
      join_date,
      end_date,
    };
    if (selectedHouseEmployee[houseEmployeeIndexToEdit]?.id) {
      dispatchHouseEmployee({ type: "update", payload: houseEmployee });
    } else {
      dispatchHouseEmployee({ type: "add", payload: houseEmployee });
    }
    setGlobalState("showHouseEmployeeModal", false);
  };

  const handleHouseEmployeeChange = (event) => {
    setEmployee(event.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
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
                  <h5 className="card-title">
                    {selectedHouseEmployee[houseEmployeeIndexToEdit]?.id
                      ? "Edit House Employee"
                      : "Add House Employee"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showHouseEmployeeModal", false)
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
                          <label className="col-form-label">Employee</label>
                          <select
                            value={employee}
                            onChange={handleHouseEmployeeChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Employee
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
                          <label className="col-form-label">Join Date</label>
                          <input
                            value={join_date}
                            onChange={(event) =>
                              setJoinDate(event.target.value)
                            }
                            className="form-control floating"
                            type="date"
                            placeholder="Join Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">End Date</label>
                          <input
                            value={end_date}
                            onChange={(event) => setEndDate(event.target.value)}
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
                        {selectedHouseEmployee[houseEmployeeIndexToEdit]?.id
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

export default AddHouseEmployee;
