//main
import Dashboard from '../MainPage/Main/Dashboard';
//Pages
import ProfilePage from '../MainPage/Pages/Profile';
//HR
import Payroll from '../MainPage/Payroll';
import Administration from '../MainPage/Administration';
//Employees
import Employee from '../MainPage/Employees/Employees';
//Service Worker
import ServiceWork from "../MainPage/ServiceWork";
// Task Management
import TaskManager from "../MainPage/TaskManagement";
// Accomodation
import Accomodation from '../MainPage/Accomodation';
// ShiftSchedule
import ShiftSchedule from '../MainPage/Shiftschedule';

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