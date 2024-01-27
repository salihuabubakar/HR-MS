/**
 * Route Configuration
 *
 * Defines the routes and corresponding components for the application.
 * Used in conjunction with React Router to manage navigation.
 *
 * Each object in the array represents a route with the following properties:
 * - path: The URL path for the route.
 * - component: The React component to be rendered for the specified route.
 *
 * @module routes
 * @type {Array}
 * @property {string} path - The URL path for the route.
 * @property {React.Component} component - The React component to be rendered for the route.
 */

// Import React components for different sections of the application
import Dashboard from '../MainPage/Main/Dashboard';
import ProfilePage from '../MainPage/Pages/Profile';
import Payroll from '../MainPage/Payroll';
import Administration from '../MainPage/Administration';
import Employee from '../MainPage/Employees/Employees';
import ServiceWork from '../MainPage/ServiceWork';
import TaskManager from '../MainPage/TaskManagement';
import Accomodation from '../MainPage/Accomodation';
import ShiftSchedule from '../MainPage/Shiftschedule';

// Array of route configurations
export default [
  {
    path: "main",
    component: Dashboard,
  },
  {
    path: "employee",
    component: Employee,
  },
  {
    path: "accomodation",
    component: Accomodation,
  },
  {
    path: "shiftschedule",
    component: ShiftSchedule,
  },
  {
    path: "taskmanagement",
    component: TaskManager,
  },
  {
    path: "serviceWork",
    component: ServiceWork,
  },
  {
    path: "profile",
    component: ProfilePage,
  },
  {
    path: "payroll",
    component: Payroll,
  },
  {
    path: "administration",
    component: Administration,
  },
];
