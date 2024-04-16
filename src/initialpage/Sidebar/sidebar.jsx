import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Scrollbars } from "react-custom-scrollbars-2";
import { HeaderContainer } from './style';
import { setGlobalState, useGlobalState } from '../../context/GlobalState';

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
    toggleSidebar(isSideMenu === "dashboard" ? "" : "dashboard");
    setIsDashboardOpen(!isDashboardOpen);
  }

  const toggleLvelTwo = (value) => {
    setLevel2Menu(value)
  }
  const toggleLevelThree = (value) => {
    setLevel3Menu(value)
  }

  const [isDarkMode] = useGlobalState('isDarkMode');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  let pathname = props?.location?.pathname
  const url = "/app/shiftschedule/shift";

  // Set mode to true
  const toggleDarkModeOn = () => {
    setGlobalState('isDarkMode', true);
  };

  // Set mode to false
  const toggleDarkModeOff = () => {
    setGlobalState('isDarkMode', false);
  };

  return (
    <HeaderContainer style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}} className="sidebar" id="sidebar"> 
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z" stroke="#625F5C" stroke-width="1.5"/>
                    <path d="M14.5 3V21" stroke="#625F5C" stroke-width="1.5" stroke-linejoin="round"/>
                    <path d="M18 7H19M18 10H19" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span
                    onClick={() => activeLink("Dashboard")}
                    className={isActiveLink == "Dashboard" ? "noti-dot" : ""}
                  >
                    {" "}
                    Dashboard
                  </span>{" "}
                  <span className="menu-arrow" />
                </a>
                {isSideMenu === "dashboard" && (
                  <ul>
                    <li>
                      <Link
                        className={location.pathname.includes("/main/dashboard") ? "active" : ""}
                        to="/app/main/dashboard"
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  </ul>
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9H18" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M14 12.5H17" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M17 3H7C4.23858 3 2 5.23858 2 8V16C2 18.7614 4.23858 21 7 21H17C19.7614 21 22 18.7614 22 16V8C22 5.23858 19.7614 3 17 3Z" stroke="#625F5C" stroke-width="1.5" stroke-linejoin="round"/>
                    <path d="M5 16C6.20831 13.4189 10.7122 13.2491 12 16" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.5 9C10.5 10.1046 9.60457 11 8.5 11C7.39543 11 6.5 10.1046 6.5 9C6.5 7.89543 7.39543 7 8.5 7C9.60457 7 10.5 7.89543 10.5 9Z" stroke="#625F5C" stroke-width="1.5"/>
                  </svg>

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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17H12.009" stroke="#625F5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 8.5V13.5C20 17.2712 20 19.1569 18.8284 20.3284C17.6569 21.5 15.7712 21.5 12 21.5C8.22876 21.5 6.34315 21.5 5.17157 20.3284C4 19.1569 4 17.2712 4 13.5V8.5" stroke="#625F5C" stroke-width="1.5"/>
                    <path d="M22 10.5L17.6569 6.33548C14.9902 3.77849 13.6569 2.5 12 2.5C10.3431 2.5 9.00981 3.77849 6.34315 6.33548L2 10.5" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round"/>
                  </svg> 
                  <span>Accomodation</span>
                </Link>
              </li>
              <li className="submenu">
                <a
                  className={isSideMenu == "shiftschedule" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(
                      isSideMenu == "shiftschedule" ? "" : "shiftschedule"
                    )
                  }
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2V4M6 2V4" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="#625F5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.5 8H20.5" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 8H21" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

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
                        className={pathname === url ? "active" : ""}
                        to="/app/shiftschedule/shift"
                      >
                        Shift
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 2V4M12 2V4M7 2V4" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.5 10C3.5 6.70017 3.5 5.05025 4.52513 4.02513C5.55025 3 7.20017 3 10.5 3H13.5C16.7998 3 18.4497 3 19.4749 4.02513C20.5 5.05025 20.5 6.70017 20.5 10V15C20.5 18.2998 20.5 19.9497 19.4749 20.9749C18.4497 22 16.7998 22 13.5 22H10.5C7.20017 22 5.55025 22 4.52513 20.9749C3.5 19.9497 3.5 18.2998 3.5 15V10Z" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.5 16H17" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M13.5 9H17" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M7 10C7 10 7.5 10 8 11C8 11 9.58824 8.5 11 8" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 17C7 17 7.5 17 8 18C8 18 9.58824 15.5 11 15" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" /* The above code appears to be a comment block in JavaScript React. It is using the ` */
                    stroke="#625F5C" stroke-width="1.5"/>
                  </svg>

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
                    <li>
                      <Link
                        className={
                          pathname.includes("request") ? "active" : ""
                        }
                        to="/app/servicework/request"
                      >
                        Request
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("visitor") ? "active" : ""
                        }
                        to="/app/servicework/visitor"
                      >
                        Visitor
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("complaint") ? "active" : ""
                        }
                        to="/app/servicework/complaint"
                      >
                        Complaint
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("document-type") ? "active" : ""
                        }
                        to="/app/servicework/document-type"
                      >
                        Document Type
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("legal-status") ? "active" : ""
                        }
                        to="/app/servicework/legal-status"
                      >
                        Legal Status
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("gp-type") ? "active" : ""
                        }
                        to="/app/servicework/gp-type"
                      >
                        GP Type
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("general-practice") ? "active" : ""
                        }
                        to="/app/servicework/general-practice"
                      >
                        GP
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("solicitor") ? "active" : ""
                        }
                        to="/app/servicework/solicitor"
                      >
                        Solicitor
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("school") ? "active" : ""
                        }
                        to="/app/servicework/school"
                      >
                        School
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("incident") ? "active" : ""
                        }
                        to="/app/servicework/incident"
                      >
                        Incident
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("misper") ? "active" : ""
                        }
                        to="/app/servicework/misper"
                      >
                        Misper
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("social-worker") ? "active" : ""
                        }
                        to="/app/servicework/social-worker"
                      >
                        Social Worker
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("borough") ? "active" : ""
                        }
                        to="/app/servicework/borough"
                      >
                        Borough
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              {/* <li className="menu-title">
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.016 2C18.9026 2 18 4.68629 18 8H20.016C20.9876 8 21.4734 8 21.7741 7.66455C22.0749 7.32909 22.0225 6.88733 21.9178 6.00381C21.6414 3.67143 20.8943 2 20.016 2Z" stroke="#625F5C" stroke-width="1.5"/>
                    <path d="M18 8.05426V18.6458C18 20.1575 18 20.9133 17.538 21.2108C16.7831 21.6971 15.6161 20.6774 15.0291 20.3073C14.5441 20.0014 14.3017 19.8485 14.0325 19.8397C13.7417 19.8301 13.4949 19.9768 12.9709 20.3073L11.06 21.5124C10.5445 21.8374 10.2868 22 10 22C9.71321 22 9.45546 21.8374 8.94 21.5124L7.02913 20.3073C6.54415 20.0014 6.30166 19.8485 6.03253 19.8397C5.74172 19.8301 5.49493 19.9768 4.97087 20.3073C4.38395 20.6774 3.21687 21.6971 2.46195 21.2108C2 20.9133 2 20.1575 2 18.6458V8.05426C2 5.20025 2 3.77325 2.87868 2.88663C3.75736 2 5.17157 2 8 2H20" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 6H14" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 10H6" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5 10.875C11.6716 10.875 11 11.4626 11 12.1875C11 12.9124 11.6716 13.5 12.5 13.5C13.3284 13.5 14 14.0876 14 14.8125C14 15.5374 13.3284 16.125 12.5 16.125M12.5 10.875C13.1531 10.875 13.7087 11.2402 13.9146 11.75M12.5 10.875V10M12.5 16.125C11.8469 16.125 11.2913 15.7598 11.0854 15.25M12.5 16.125V17" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>

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
              </li> */}
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453366 18.0441 4.1628 16.324 5.57757 15.4816C7.67837 14.2307 10.1368 13.7719 12.5 14.1052C13.3575 14.2261 14.1926 14.4514 15 14.7809" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="#625F5C" stroke-width="1.5"/>
                    <path d="M18.5 22V15M15 18.5H22" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  <span>Users</span>
                </Link>
              </li>
              <li
                className={
                  pathname.includes("administration/careers") ? "active" : ""
                }
              >
                <Link
                  to="/app/administration/careers"
                  onClick={() => activeLink("administration/careers")}
                  className={
                    isActiveLink == "administration/careers" ? "noti-dot" : ""
                  }
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11C4.3317 8.55783 7.64323 8.44283 10 11M8.49509 4.5C8.49509 5.88071 7.37421 7 5.99153 7C4.60885 7 3.48797 5.88071 3.48797 4.5C3.48797 3.11929 4.60885 2 5.99153 2C7.37421 2 8.49509 3.11929 8.49509 4.5Z" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M14 22C16.3317 19.5578 19.6432 19.4428 22 22M20.4951 15.5C20.4951 16.8807 19.3742 18 17.9915 18C16.6089 18 15.488 16.8807 15.488 15.5C15.488 14.1193 16.6089 13 17.9915 13C19.3742 13 20.4951 14.1193 20.4951 15.5Z" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M3 14C3 17.87 6.13 21 10 21L9 19" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15 3H21M15 6H21M15 9H18.5" stroke="#625F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <span>Careers</span>
                </Link>
              </li>
              {/* <li>
                <Link to="/settings/companysetting">
                  <i className="la la-cog" /> <span>Settings</span>
                </Link>
              </li> */}
            </ul>
            <div className='switch flex justify-between items-end justify-end border p-2 rounded-full'>
              <div className='dark'>
                <button title='dark' onClick={toggleDarkModeOn}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5 13.0784C19.3003 13.7189 17.9301 14.0821 16.4751 14.0821C11.7491 14.0821 7.91792 10.2509 7.91792 5.52485C7.91792 4.06986 8.28105 2.69968 8.92163 1.5C4.66765 2.49698 1.5 6.31513 1.5 10.8731C1.5 16.1899 5.8101 20.5 11.1269 20.5C15.6849 20.5 19.503 17.3324 20.5 13.0784Z" stroke="#110C08" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className='light'>
                <button title='light' onClick={toggleDarkModeOff}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="#F97316" stroke-width="1.5"/>
                    <path d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714" stroke="#F97316" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
    </HeaderContainer>
  );
}

export default withRouter(Sidebar);
