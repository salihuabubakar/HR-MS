import React, { useEffect,useState} from 'react';
import { withRouter } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { HeaderContainer } from './style';

 
const Sidebar = (props) => {

const [isActiveLink, setIsActiveLink] = useState()

  
const [isSideMenu, setSideMenu] = useState("")
const [level2Menu, setLevel2Menu] = useState("")
const [level3Menu, setLevel3Menu] = useState("")
const [isDashboardOpen, setIsDashboardOpen] = useState(false)

const activeLink = (value) => {
  setIsActiveLink(value);
}

const toggleSidebar = (value) => {
  setSideMenu(value);
};

const handleDashboard = () => {
  toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard");
  setIsDashboardOpen(!isDashboardOpen);
}


const toggleLvelTwo = (value) => {
  setLevel2Menu(value)
  console.log("value", value);
}
const toggleLevelThree = (value) => {
  setLevel3Menu(value)
}


    let pathname = props?.location?.pathname;

    return (
      <HeaderContainer className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main</span>
                </li>
                <li className="submenu">
                  <a
                    // data-bs-toggle="dropdown"
                    className={isSideMenu == "dashboard" ? "subdrop" : ""}
                    onClick={handleDashboard}
                  >
                    <i className="la la-dashboard" />
                    <span
                      onClick={() => activeLink("Dashboard")}
                      className={isActiveLink == "Dashboard" ? "noti-dot" : ""}
                    >
                      {" "}
                      Dashboard
                    </span>{" "}
                    <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "dashboard" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("main/dashboard") ? "active" : ""
                          }
                          to="/app/main/dashboard"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          className={
                            pathname.includes("main/employee-") ? "active" : ""
                          }
                          to="/app/main/employee-dashboard"
                        >
                          Employee Dashboard
                        </Link>
                      </li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <a
                    // data-bs-toggle="dropdown"
                    className={isSideMenu == "employee" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "employee" ? "" : "employee")
                    }
                  >
                    <i className="la la-user" />{" "}
                    <span
                      onClick={() => activeLink("Employees")}
                      className={isActiveLink == "Employees" ? "noti-dot" : ""}
                    >
                      {" "}
                      Employees
                    </span>{" "}
                    <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "employee" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("allemployees")
                              ? "active"
                              : pathname.includes("employees-list")
                              ? "active"
                              : ""
                          }
                          to="/app/employee/allemployees"
                        >
                          All Employees
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={pathname.includes("group") ? "active" : ""}
                          to="/app/employee/group"
                        >
                          Group
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("contacts") ? "active" : ""
                          }
                          to="/app/employee/contacts"
                        >
                          Contacts
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("review") ? "active" : ""
                          }
                          to="/app/employee/review"
                        >
                          Review
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("status") ? "active" : ""
                          }
                          to="/app/employee/status"
                        >
                          Status
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={
                    pathname.includes("accomodation/accomodations")
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() => activeLink("Accomodation")}
                    className={isActiveLink == "Accomodation" ? "noti-dot" : ""}
                    to="/app/accomodation/accomodations"
                  >
                    <i className="la la-home" /> <span>Accomodation</span>
                  </Link>
                </li>
                <li className="submenu">
                  <a
                    // data-bs-toggle="dropdown"
                    className={isSideMenu == "shiftschedule" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "shiftschedule" ? "" : "shiftschedule"
                      )
                    }
                  >
                    <i className="la la-cogs" />{" "}
                    <span
                      onClick={() => activeLink("Shift&Schedule")}
                      className={
                        isActiveLink == "Shift&Schedule" ? "noti-dot" : ""
                      }
                    >
                      {" "}
                      Shift &amp; Schedule
                    </span>{" "}
                    <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "shiftschedule" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("shift-list") ? "active" : ""
                          }
                          to="/app/shiftschedule/shift-list"
                        >
                          Shifts
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={pathname.includes("house") ? "active" : ""}
                          to="/app/shiftschedule/house"
                        >
                          Select House
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <a
                    // data-bs-toggle="dropdown"
                    className={isSideMenu == "taskmanagement" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "taskmanagement" ? "" : "taskmanagement"
                      )
                    }
                  >
                    <i className="la la-chart-bar" />{" "}
                    <span
                      onClick={() => activeLink("TaskManagement")}
                      className={
                        isActiveLink == "TaskManagement" ? "noti-dot" : ""
                      }
                    >
                      {" "}
                      Task Management
                    </span>
                    <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "taskmanagement" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("task-manager-table")
                              ? "active"
                              : pathname.includes("task-manager-table")
                              ? "active"
                              : ""
                          }
                          to="/app/taskmanagement/task-manager-table"
                        >
                          Task Manager
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <a
                    // data-bs-toggle="dropdown"
                    className={isSideMenu == "servicework" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "servicework" ? "" : "servicework"
                      )
                    }
                  >
                    <i className="la la-user" />
                    <span
                      onClick={() => activeLink("ServiceWorker")}
                      className={
                        isActiveLink == "ServiceWorker" ? "noti-dot" : ""
                      }
                    >
                      {" "}
                      Residents
                    </span>{" "}
                    <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "servicework" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("service-worker")
                              ? "active"
                              : pathname.includes("service-worker-table")
                              ? "active"
                              : ""
                          }
                          to="/app/servicework/service-worker"
                        >
                          All Residents
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="menu-title">
                  <span>HR</span>
                </li>
                <li className="submenu">
                  <a
                    // data-bs-toggle="dropdown"
                    className={isSideMenu == "payroll" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "payroll" ? "" : "payroll")
                    }
                  >
                    <i className="la la-money" />
                    <span
                      onClick={() => activeLink("payroll")}
                      className={isActiveLink == "payroll" ? "noti-dot" : ""}
                    >
                      {" "}
                      Payroll
                    </span>{" "}
                    <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "payroll" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("_salary") ? "active" : ""
                          }
                          to="/app/payroll/_salary"
                        >
                          Employee Salary
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="menu-title">
                  <span>Administration</span>
                </li>
                <li
                  className={
                    pathname.includes("administration/users") ? "active" : ""
                  }
                >
                  <Link
                    to="/app/administration/users"
                    onClick={() => activeLink("administration/users")}
                    className={
                      isActiveLink == "administration/users" ? "noti-dot" : ""
                    }
                  >
                    <i className="la la-user-plus" /> <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/settings/companysetting">
                    <i className="la la-cog" /> <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Scrollbars>
      </HeaderContainer>
    );
   
}

export default withRouter(Sidebar);
