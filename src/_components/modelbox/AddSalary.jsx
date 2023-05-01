import React, { useState, useEffect, useReducer } from "react";
import Select from "react-select";
import { useGlobalState, setGlobalState } from '../../context/GlobalState';
import {
  initUserAccount,
  savedUserAccountReducer,
} from "../../utils/localStorage";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
  Card,
} from "./Addemployee.style";

const AddSalary = ({ dispatchSalary, indexToEdit }) => {
  const [selectedSalary] = useGlobalState("selectedSalary");

  const [userAcct] = useReducer(
    savedUserAccountReducer,
    [],
    initUserAccount
  );
  const [employeeAccts, setEmployeeAccts] = useState();
  useEffect(() => {
    setEmployeeAccts(userAcct);
  }, [userAcct]);

  const [id] = useState(
    selectedSalary[indexToEdit]?.id
      ? selectedSalary[indexToEdit]?.id
      : Date.now()
  );

  const [employee, setEmployee] = useState(
    selectedSalary[indexToEdit]?.employee
      ? selectedSalary[indexToEdit]?.employee
      : ""
  );

  const [netSalary, setNetSalary] = useState(
    selectedSalary[indexToEdit]?.netSalary
      ? selectedSalary[indexToEdit]?.netSalary
      : ""
  );

  const [basic, setBasic] = useState(
    selectedSalary[indexToEdit]?.basic ? selectedSalary[indexToEdit]?.basic : ""
  );

  const [tds, setTDS] = useState(
    selectedSalary[indexToEdit]?.tds ? selectedSalary[indexToEdit]?.tds : ""
  );

  const [da, setDA] = useState(
    selectedSalary[indexToEdit]?.da ? selectedSalary[indexToEdit]?.da : ""
  );

  const [esi, setESI] = useState(
    selectedSalary[indexToEdit]?.esi ? selectedSalary[indexToEdit]?.esi : ""
  );

  const [hra, setHRA] = useState(
    selectedSalary[indexToEdit]?.hra ? selectedSalary[indexToEdit]?.hra : ""
  );

  const [pf, setPF] = useState(
    selectedSalary[indexToEdit]?.pf ? selectedSalary[indexToEdit]?.pf : ""
  );

  const [conveyance, setConveyance] = useState(
    selectedSalary[indexToEdit]?.conveyance
      ? selectedSalary[indexToEdit]?.conveyance
      : ""
  );

  const [leave, setLeave] = useState(
    selectedSalary[indexToEdit]?.leave ? selectedSalary[indexToEdit]?.leave : ""
  );

  const [allowance, setAllowance] = useState(
    selectedSalary[indexToEdit]?.allowance
      ? selectedSalary[indexToEdit]?.allowance
      : ""
  );

  const [tax, setTax] = useState(
    selectedSalary[indexToEdit]?.tax ? selectedSalary[indexToEdit]?.tax : ""
  );

  const [medicalAllowance, setMedicalAllowance] = useState(
    selectedSalary[indexToEdit]?.medicalAllowance
      ? selectedSalary[indexToEdit]?.medicalAllowance
      : ""
  );

  const [labourWelfare, setLabourWelfare] = useState(
    selectedSalary[indexToEdit]?.labourWelfare
      ? selectedSalary[indexToEdit]?.labourWelfare
      : ""
  );

  const handleEmployeeChange = (event) => {
    setEmployee(event);
  };

  const users = [];
  employeeAccts?.map((user) => {
    users.push({
      value: user.id,
      label: user.firstName + " " + user.lastName,
      image: user.profileInfo?.image,
      designation: user.designation,
      joinDate: user.joinDate,
      email: user.email,
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const salary = {
      id,
      employee,
      netSalary,
      basic,
      tds,
      da,
      esi,
      hra,
      pf,
      conveyance,
      leave,
      allowance,
      tax,
      medicalAllowance,
      labourWelfare,
    };
    if (selectedSalary[indexToEdit]?.id) {
      dispatchSalary({ type: "update", payload: salary });
    } else {
      dispatchSalary({ type: "push", payload: salary });
    }
    setGlobalState("showSalaryModal", false);
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
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#ddd",
      height: "50px",
    }),
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
                    {selectedSalary[indexToEdit]?.id
                      ? "Update Staff Salary"
                      : "Add Staff Salary"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showSalaryModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Select Staff <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={selectedSalary[indexToEdit]?.employee}
                            onChange={handleEmployeeChange}
                            options={users}
                            styles={customSelectStyles}
                            placeholder="Select Staff"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Net Salary</label>
                          <input
                            value={netSalary}
                            onChange={(e) => setNetSalary(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Net Salary"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="col-form-label fontStyle">
                          Earnings
                        </label>
                      </div>
                      <div className="col-sm-6">
                        <label className="col-form-label fontStyle">
                          Deduction
                        </label>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Basic Salary<span className="text-danger">*</span>
                          </label>
                          <input
                            value={basic}
                            onChange={(e) => setBasic(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Basic Salary"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            TDS <span className="text-danger">*</span>
                          </label>
                          <input
                            value={tds}
                            onChange={(e) => setTDS(e.target.value)}
                            className="form-control floatng"
                            type="text"
                            placeholder="Tax Deducted at Source"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">DA(40%)</label>
                          <input
                            value={da}
                            onChange={(e) => setDA(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="DA(40%)"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">ESI</label>
                          <input
                            value={esi}
                            onChange={(e) => setESI(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="ESI"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            HRA(15%) <span className="text-danger">*</span>
                          </label>
                          <input
                            value={hra}
                            onChange={(e) => setHRA(e.target.value)}
                            type="text"
                            className="form-control floating"
                            placeholder="House rent allowance"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            PF <span className="text-danger">*</span>
                          </label>
                          <div>
                            <input
                              value={pf}
                              onChange={(e) => setPF(e.target.value)}
                              className="form-control floating"
                              type="text"
                              placeholder="Provident Fund"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Conveyance</label>
                          <input
                            value={conveyance}
                            onChange={(e) => setConveyance(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Conveyance"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Leave</label>
                          <input
                            value={leave}
                            onChange={(e) => setLeave(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Leave"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Allowance</label>
                          <input
                            value={allowance}
                            onChange={(e) => setAllowance(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Allowance"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Prof. Tax</label>
                          <input
                            value={tax}
                            onChange={(e) => setTax(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Prof. Tax"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Medical Allowance
                          </label>
                          <input
                            value={medicalAllowance}
                            onChange={(e) =>
                              setMedicalAllowance(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Medical Allowance"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Labour Welfare
                          </label>
                          <input
                            value={labourWelfare}
                            onChange={(e) => setLabourWelfare(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Labour Welfare"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedSalary[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddSalary;