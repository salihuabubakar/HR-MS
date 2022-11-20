import React, { useState } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  headerlogo,
  lnEnglish,
  lnFrench,
  lnSpanish,
  lnGerman,
  Avatar_02,
  Avatar_03,
  Avatar_13,
  Avatar_21,
} from "../../Entryfile/imagepath";
import Applogo from "../../assets/img/circle-logo.png"
import AddminProfile from "../../MainPage/Pages/Profile/AddminProfile";

import {HeaderContainer} from "./style"

const Header = (props) => {
  const history = useHistory();

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  const onMenuClik = () => {
    props.onMenuClick();
  };

  const handleLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    history.push("/login");
  };

  return (
    <HeaderContainer className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="/app/main/dashboard" className="logo">
          <img src={Applogo} width={40} height={40} alt="" />
        </Link>
      </div>
      {/* /Logo */}
      <a id="toggle_btn" href="#" onClick={handlesidebar}>
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </a>
      {/* Header Title */}
      <div className="page-title-box">
        {/* <h3>PEEPAL TREE</h3> */}
        <img
          src={
            "https://peepaltree.co.uk/wp-content/uploads/2021/02/Header-logo-800px.png"
          }
          style={{ width: "25%" }}
          alt=""
        />
      </div>
      {/* /Header Title */}
      <a
        id="mobile_btn"
        className="mobile_btn"
        // href="#"
        onClick={onMenuClik}
      >
        <i className="fa fa-bars" />
      </a>
      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* Search */}
        <li className="nav-item">
          <div className="top-nav-search">
            <a href="" className="responsive-search">
              <i className="fa fa-search" />
            </a>
            <form>
              <input
                className="form-control"
                type="text"
                placeholder="Search here"
              />
              <button className="btn" type="submit">
                <i className="fa fa-search" />
              </button>
            </form>
          </div>
        </li>
        {/* /Search */}
        {/* Flag */}
        <li className="nav-item dropdown has-arrow flag-nav">
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
          >
            <img src={lnEnglish} alt="" height={20} /> <span>English</span>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a href="" className="dropdown-item">
              <img src={lnEnglish} alt="" height={16} /> English
            </a>
            <a href="" className="dropdown-item">
              <img src={lnFrench} alt="" height={16} /> French
            </a>
            <a href="" className="dropdown-item">
              <img src={lnSpanish} alt="" height={16} /> Spanish
            </a>
            <a href="" className="dropdown-item">
              <img src={lnGerman} alt="" height={16} /> German
            </a>
          </div>
        </li>
        {/* /Flag */}
        {/* Notifications */}
        <li className="nav-item dropdown">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-bell-o" />{" "}
            <span className="badge badge-pill">3</span>
          </a>
          <div
            className="dropdown-menu notifications"
            style={{
              width: "355px",
            }}
          >
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <a href="" className="clear-noti">
                {" "}
                Clear All{" "}
              </a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message">
                  <Link to="/app/administrator/activities">
                    <div className="media">
                      <span className="avatar">
                        <img alt="" src={Avatar_02} />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">John Doe</span> added new
                          task{" "}
                          <span className="noti-title">
                            Patient appointment booking
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="notification-message">
                  <Link
                    // onClick={() => localStorage.setItem("minheight", "true")}
                    to="/app/administrator/activities"
                  >
                    <div className="media">
                      <span className="avatar">
                        <img alt="" src={Avatar_13} />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Bernardo Galaviz</span>{" "}
                          added new task{" "}
                          <span className="noti-title">
                            Private chat module
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">2 days ago</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <Link
                // onClick={() => localStorage.setItem("minheight", "true")}
                to="/app/administrator/activities"
              >
                View all Notifications
              </Link>
            </div>
          </div>
        </li>
        {/* /Notifications */}
        {/* Message Notifications */}
        <li className="nav-item dropdown">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-comment-o" />{" "}
            <span className="badge badge-pill">8</span>
          </a>
          <div
            style={{
              width: "355px",
            }}
            className="dropdown-menu notifications"
          >
            <div className="topnav-dropdown-header">
              <span className="notification-title">Messages</span>
              <a href="" className="clear-noti">
                {" "}
                Clear All{" "}
              </a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message">
                  <Link
                    // onClick={() => localStorage.setItem("minheight", "true")}
                    to="/conversation/chat"
                  >
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">
                          <img alt="" src={Avatar_02} />
                        </span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">John Doe</span>
                        <span className="message-time">6 Mar</span>
                        <div className="clearfix" />
                        <span className="message-content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="notification-message">
                  <Link
                    // onClick={() => localStorage.setItem("minheight", "true")}
                    to="/conversation/chat"
                  >
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">
                          <img alt="" src={Avatar_03} />
                        </span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">
                          {" "}
                          Tarah Shropshire{" "}
                        </span>
                        <span className="message-time">5 Mar</span>
                        <div className="clearfix" />
                        <span className="message-content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <Link
                onClick={() => localStorage.setItem("minheight", "true")}
                to="/conversation/chat"
              >
                View all Messages
              </Link>
            </div>
          </div>
        </li>
        {/* /Message Notifications */}
        <li className="nav-item dropdown has-arrow main-drop">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <span className="user-img me-1">
              <img src={Avatar_21} alt="" />
              <span className="status online" />
            </span>
            <span>Admin</span>
          </a>
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to={{
                pathname: "/app/profile/AddminProfile",
                state: { id: "occupation" },
              }}
            >
              My Profile
            </Link>
            <Link className="dropdown-item" to="/settings/companysetting">
              Settings
            </Link>
            <button onClick={handleLogOut} className="dropdown-item">
              Logout
            </button>
          </div>
        </li>
      </ul>
      {/* /Header Menu */}
      {/* Mobile Menu */}
      <div className="dropdown mobile-user-menu">
        <a
          href="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link className="dropdown-item" to="/app/profile/AddminProfile">
            My Profile
          </Link>
          <Link className="dropdown-item" to="/settings/companysetting">
            Settings
          </Link>
          <button onClick={handleLogOut} className="dropdown-item">
            Logout
          </button>
        </div>
      </div>
      {/* /Mobile Menu */}
    </HeaderContainer>
  );
};;

export default withRouter(Header);
