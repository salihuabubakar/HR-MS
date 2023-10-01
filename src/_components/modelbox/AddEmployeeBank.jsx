import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { isMobile } from "../../utils/mediaQuery";

const AddEmployeeBank = ({
  employeeBankIndexToEdit,
  id,
  dispatchEmployeeBank,
  employee,
}) => {
  const [selectedEmployeeBank] = useGlobalState("selectedEmployeeBank");

  const [bank_name, setBankName] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.bank_name || ""
  );

  const [account_name, setAccountName] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.account_name || ""
  );

  const [account_number, setAccountNumber] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.account_number || ""
  );

  const [account_type, setAccountType] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.account_type || ""
  );

  const [currency, setCurrency] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.currency || ""
  );

  const [bank_address, setBankAddress] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.bank_address || ""
  );

  const [sort_code, setSortCode] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.sort_code || ""
  );

  const [swift_code, setSwiftCode] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.swift_code || ""
  );

  const [iban, setIban] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.iban || ""
  );

  const [routing_number, setRoutingNumber] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.routing_number || ""
  );

  const [upload_date, setDateUpload] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.upload_date || null
  );

  const [upload_document, setUploadDocument] = useState(
    selectedEmployeeBank[employeeBankIndexToEdit]?.upload_document || ""
  );

  const [bankNameError, setBankNameError] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");
  const [sortCodeError, setSortCodeError] = useState("");
  const [uploadDateError, setUploaDateError] = useState("");

  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bank_name === "") {
      setBankNameError("Bank Name is required.");
      return;
    }
    if (account_name === "") {
      setAccountNameError("Account Name is required.");
      return;
    }
    if (account_number === "") {
      setAccountNumberError("Account Number is required.");
      return;
    }
    if (sort_code === "") {
      setSortCodeError("Sort Code is required.");
      return;
    }
    if (upload_date === "") {
      setUploaDateError("Date is required.");
      return;
    }

    setBankNameError("");
    setAccountNameError("");
    setAccountNumberError("");
    setSortCodeError("");
    setUploaDateError("");


    const experience = {
      id: id,
      employee: employee,
      bank_name: bank_name,
      account_name: account_name,
      account_number: account_number,
      account_type: account_type,
      currency: currency,
      bank_address: bank_address,
      sort_code: sort_code,
      swift_code: swift_code,
      iban: iban,
      routing_number: routing_number,
      upload_date: upload_date,
      upload_document: upload_document,
    };

    Object.entries(experience).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedEmployeeBank[employeeBankIndexToEdit]?.id) {
      dispatchEmployeeBank({
        type: "update",
        payload: { id, formData },
      });
    } else {
      dispatchEmployeeBank({ type: "add", payload: formData });
    }
    setGlobalState("showEmployeeBankModal", false);
  };


   const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setUploadDocument(file);
    } else {
      alert(`File '${file.name}' is larger than 5MB`);
    }
   }

  const handleBankNameChange = (e) => {
    setBankName(e.target.value);
    setBankNameError("");
  }
  
  const handleAccountNameChange = (e) => {
    setAccountName(e.target.value);
    setAccountNameError("");
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
    setAccountNumberError("");
  };

  const handleSortCodeChange = (e) => {
    setSortCode(e.target.value);
    setSortCodeError("");
  };

  const handleDateChange = (e) => {
    setDateUpload(e.target.value);
    setUploaDateError("");
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer  className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedEmployeeBank[employeeBankIndexToEdit]?.id ? "Edit Bank" : "Add Bank"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showEmployeeBankModal", false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Bank Name</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={bank_name}
                            onChange={handleBankNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Bank Name"
                          />
                          {bankNameError && <p className="error-message">{bankNameError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Account Name</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={account_name}
                            onChange={handleAccountNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Account Name"
                          />
                          {accountNameError && <p className="error-message">{accountNameError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Account Number</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={account_number}
                            onChange={handleAccountNumberChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Account Number"
                          />
                          {accountNumberError && (
                            <p className="error-message">{accountNumberError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Sort Code</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={sort_code}
                            onChange={handleSortCodeChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Sort Code"
                          />
                          {sortCodeError && <p className="error-message">{sortCodeError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Date</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={upload_date}
                            onChange={handleDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Date"
                          />
                          {uploadDateError && <p className="error-message">{uploadDateError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Account Type</label>
                          <select
                            value={account_type}
                            onChange={(e) => setAccountType(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Account Type
                            </option>
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                            <option value="Premium">Premium</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Currency</label>
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Currency
                            </option>
                            <option value="NGN">NGN</option>
                            <option value="USD">USD</option>
                            <option value="GBD">GBD</option>
                            <option value="EUR">EUR</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Bank Address</label>
                          <input
                            value={bank_address}
                            onChange={(e) => setBankAddress(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Bank Address"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Swift Code</label>
                          <input
                            value={swift_code}
                            onChange={(e) => setSwiftCode(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Swift Code"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Iban</label>
                          <input
                            value={iban}
                            onChange={(e) => setIban(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Iban"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Rounting Number</label>
                          <input
                            value={routing_number}
                            onChange={(e) => setRoutingNumber(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Routing Number"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Document File Upload</label>
                          <input
                            onChange={handleFileUpload}
                            className="form-control floating"
                            type="file"
                            accept=".pdf, .doc, .docx, .txt, .xls, .xlsx, .csv, .png, .jpeg, .webp, .PNG, .JPEG,"
                            placeholder="Document File Upload"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedEmployeeBank[employeeBankIndexToEdit]?.id ? "Update" : "Save"}
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

export default AddEmployeeBank;
