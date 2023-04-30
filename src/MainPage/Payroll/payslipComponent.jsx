import React from 'react'
import { Link } from "react-router-dom";


class PayslipComponent extends React.Component {
  render() {
    const {
      Applogo,
      designation,
      StaffName,
      joinDate,
      basicSalary,
      houseRentAllowance,
      conveyance,
      netSalary,
      tds,
      pf,
      esi,
    } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="payslip-title">
                Payslip for the month of Feb 2019
              </h4>
              <div className="row">
                <div className="col-sm-6 m-b-20">
                  <img src={Applogo} className="inv-logo" alt="" />
                  <ul className="list-unstyled mb-0">
                    <li>Dreamguy's Technologies</li>
                    <li>3864 Quiet Valley Lane,</li>
                    <li>Sherman Oaks, CA, 91403</li>
                  </ul>
                </div>
                <div className="col-sm-6 m-b-20">
                  <div className="invoice-details">
                    <h3 className="text-uppercase">Payslip #49029</h3>
                    <ul className="list-unstyled">
                      <li>
                        Salary Month: <span>March, 2019</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 m-b-20">
                  <ul className="list-unstyled">
                    <li>
                      <h5 className="mb-0">
                        <strong>{StaffName}</strong>
                      </h5>
                    </li>
                    <li>
                      <span>{designation}</span>
                    </li>
                    <li>Employee ID: FT-0009</li>
                    <li>Joining Date: {joinDate ? joinDate : "----"}</li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div>
                    <h4 className="m-b-10">
                      <strong>Earnings</strong>
                    </h4>
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Basic Salary</strong>{" "}
                            <span className="float-end">${basicSalary}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>House Rent Allowance (H.R.A.)</strong>{" "}
                            <span className="float-end">
                              ${houseRentAllowance}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Conveyance</strong>{" "}
                            <span className="float-end">${conveyance}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Other Allowance</strong>{" "}
                            <span className="float-end">$55</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Total Earnings</strong>{" "}
                            <span className="float-end">
                              <strong>
                                $
                                {Number(basicSalary) +
                                  Number(houseRentAllowance) +
                                  Number(conveyance) +
                                  55}
                              </strong>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div>
                    <h4 className="m-b-10">
                      <strong>Deductions</strong>
                    </h4>
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Tax Deducted at Source (T.D.S.)</strong>{" "}
                            <span className="float-end">${tds}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Provident Fund</strong>{" "}
                            <span className="float-end">${pf}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>ESI</strong>{" "}
                            <span className="float-end">${esi}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Loan</strong>{" "}
                            <span className="float-end">$300</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Total Deductions</strong>{" "}
                            <span className="float-end">
                              <strong>$59698</strong>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-sm-12">
                  <p>
                    <strong>Net Salary: ${netSalary}</strong> (Fifty nine
                    thousand six hundred and ninety eight only.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default PayslipComponent