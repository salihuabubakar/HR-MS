import React, { useEffect, useReducer, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { initSalary, savedSalaryReducer } from "../../utils/localStorage";
import { useReactToPrint } from "react-to-print";
import PayslipComponent from "./payslipComponent";

const Payslip = () => {

  const location = useLocation();
  const salaryId = location?.state?.id;
  const salaryIndex = location?.state?.index;

  const [salary] = useReducer(
    savedSalaryReducer,
    [],
    initSalary
  );

  useEffect(() => {
    localStorage.setItem("staffSalary", JSON.stringify(salary));
  }, [salary]);

  const [salaryList, setSalaryList] = useState();
  useEffect(() => {
    setSalaryList(salary);
  }, [salary]);


  const selectedEmployeeSalary = salaryList?.find(
    (staffSalary) => staffSalary?.id === salaryId
  );

  const StaffName = selectedEmployeeSalary?.employee?.label;
  const designation = selectedEmployeeSalary?.employee?.designation?.label;
  const joinDate = selectedEmployeeSalary?.employee?.joinDate;
  const basicSalary = selectedEmployeeSalary?.basic;
  const houseRentAllowance = selectedEmployeeSalary?.hra;
  const conveyance = selectedEmployeeSalary?.conveyance;
  const netSalary = selectedEmployeeSalary?.netSalary;
  const tds = selectedEmployeeSalary?.tds;
  const pf = selectedEmployeeSalary?.pf;
  const esi = selectedEmployeeSalary?.esi;

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={() => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Payslip - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Payslip</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/payroll/_salary">Salary</Link>
                  </li>
                  <li className="breadcrumb-item active">Payslip</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <div className="btn-group btn-group-sm">
                  <button onClick={handlePrint} className="btn btn-white">
                    <i className="fa fa-print fa-lg" /> Print
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Page Content */}
          <PayslipComponent
            designation={designation}
            StaffName={StaffName}
            joinDate={joinDate}
            basicSalary={basicSalary}
            houseRentAllowance={houseRentAllowance}
            conveyance={conveyance}
            netSalary={netSalary}
            tds={tds}
            pf={pf}
            esi={esi}
            // Applogo={Applogo}
            ref={componentRef}
          />
          {/* /Page Content */}
        </div>
      </div>
    </div>
  );
}

export default Payslip;
