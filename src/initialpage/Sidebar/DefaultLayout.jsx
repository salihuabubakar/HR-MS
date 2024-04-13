/**
 * DefaultLayout Component
 *
 * A React component representing the default layout of the application. It includes a header,
 * sidebar, and dynamic content based on the current route.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.match - The current match object from React Router.
 *
 * @returns {JSX.Element} - Returns the JSX for the default layout of the application.
 */
import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom';

// Import router service for managing routes
import routerService from '../../router_service';

// Import Header and SidebarContent components
import Header from './header.jsx';
import SidebarContent from './sidebar';
import { useGlobalState } from '../../context/GlobalState.js';

/**
 * DefaultLayout Component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.match - The current match object from React Router.
 *
 * @returns {JSX.Element} - Returns the JSX for the default layout of the application.
 */
const DefaultLayout = (props) => {
  // State to manage mobile menu visibility
  const [menu, setMenu] = useState(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  // Destructure the match object from props
  const { match } = props;

  // Retrieve the value of isDarkMode from global state using the useGlobalState hook, which returns either true or false
const [isDarkMode] = useGlobalState("isDarkMode");

// Set the class of the <body> element based on the value of isDarkMode
// If isDarkMode is true, set the class to 'dark-mode', otherwise set it to 'light-mode'
document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';


  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        {/* Header component with mobile menu toggle */}
        <Header onMenuClick={(value) => toggleMobileMenu()} />

        <div>
          {/* Render dynamic content based on the routes defined in routerService */}
          {routerService &&
            routerService.map((route, key) => (
              <Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
            ))}
        </div>

        {/* Sidebar component with mobile responsiveness */}
        <SidebarContent menu={menu} />
      </div>
    </>
  );
};

// Use withRouter HOC to inject the match object into the component's props
export default withRouter(DefaultLayout);
