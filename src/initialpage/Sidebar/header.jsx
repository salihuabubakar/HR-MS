import React from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Popup, Segment  } from "semantic-ui-react";
import {HeaderContainer} from "./style"
import { Avatar } from "antd";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";


const Header = (props) => {
  const history = useHistory();

  const handlesidebar = () => {
    setGlobalState("isMiniSidebar", prevState => !prevState);
  };

  const onMenuClik = () => {
    props.onMenuClick();
  };

  const handleLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    history.push("/login");
  };

  const user = localStorage.getItem("username");

  const [isDarkMode] = useGlobalState("isDarkMode");


  return (
    <HeaderContainer className="header">
      <div className="handburger flex items-center">
        <button id="toggle_btn" onClick={handlesidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#f97316" fill="none">
            <path d="M4 5L16 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 12L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 19L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        {/* Mobile */}
        <button style={{ top: '20px' }} id="mobile_btn" className="mobile_btn" onClick={onMenuClik}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#f97316" fill="none">
            <path d="M4 5L16 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 12L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 19L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        {/* /Mobile */}
      </div>
      <div className="local-logo">
        <Link to="/app/main/dashboard" className="logo">
          <img src={"https://peepaltree.co.uk/wp-content/uploads/sites/4/2023/12/Header-logo-800px.png"} width={200} height={200} alt="" />
        </Link>
      </div>
      <div className="profile-handle flex justify-center items-center">
        <div className="mr-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z" stroke="#F97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19" stroke="#F97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <Popup
          style={{ backgroundColor: 'transparent' }}
          inline
          hoverable
          position="bottom left"
          delay={{
            show: 300,
            hide: 800,
          }}
          content={
            <Segment.Group>
                  <Segment className="border" style={{ width: "250px", backgroundColor: `${isDarkMode ? '#110C08' : 'white'}` }}>
                    <div className="ui column relaxed divided grid">
                      <div className="column">
                        <h4 className="text-orange-500">
                          {user && 'Sachin'}
                        </h4>
                        <span className="text-sm text-[#898888]">sachin@gmail.com</span>
                        <hr style={{ border: "2px solid #ccc"}} />
                        <div className="ui link list">
                          {/* <Link className="dropdown-item" to="/app/profile/AddminProfile">
                            My Profile
                          </Link>
                          <Link className="dropdown-item" to="/settings/companysetting">
                            Settings
                          </Link> */}
                          <Link onClick={handleLogOut} style={{ display: 'flex', alignItems: 'center', padding: '5px', backgroundColor: '#FCF0E5', color: '#f97316'}} className="dropdown-item rounded-md"><span>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.02331 5.5C4.59826 7.11238 3 9.86954 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 9.86954 19.4017 7.11238 16.9767 5.5" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 2V10" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>

                          </span> <span>Logout</span></Link>
                        </div>
                      </div>
                    </div>
                  </Segment>
            </Segment.Group>
          }
          trigger={
              <a className="text-[#f97316]">
                <Avatar icon={<img src="http://peepaltree-4a1c3cfe9b46.herokuapp.com/media/employees/02fe99ea-d5ca-4e9b-bbf8-453ddd62f64b.jpg" alt="user" width={40} height={40} />} />
                <i className="dropdown icon"></i>
              </a>
          }
        />
      </div>
      
    </HeaderContainer>
  );
};

export default withRouter(Header);
