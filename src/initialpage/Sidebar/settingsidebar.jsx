/**
 * App Header
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SettingsSidebar = (props) => {
  let pathname = props.location.pathname

    return (
        <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div className="sidebar-menu">
            <ul>
              <li> 
                <Link onClick={()=>localStorage.setItem("firstload","true")} to="/app/main/dashboard"><i className="la la-home" /> <span>Back to Home</span></Link>
              </li>
              <li className="menu-title">Settings</li>
              <li className={pathname.includes('companysetting') ?"active" :""}> 
                <Link to="/settings/companysetting"><i className="la la-building" /> <span>Company Settings</span></Link>
              </li>
              <li className={pathname.includes('roles-permissions') ?"active" :""}> 
                <Link to="/settings/roles-permissions"><i className="la la-key" /> <span>Roles &amp; Permissions</span></Link>
              </li>
              <li className={pathname.includes('-password') ?"active" :""}> 
                <Link to="/settings/change-password"><i className="la la-lock" /> <span>Change Password</span></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
       
      );
   
}

export default withRouter(SettingsSidebar);
