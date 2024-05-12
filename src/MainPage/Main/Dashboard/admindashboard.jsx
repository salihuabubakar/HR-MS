import React, {useEffect,useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import "../../index.css"
import { useDataFetching, useHouseFetching, useResidentFetching, useTaskFetching } from '../../../utils/employeeCustomFetchHook.jsx';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, Line, Tooltip, Legend, LineChart } from 'recharts';
import { useGlobalState } from '../../../context/GlobalState.js';
import { SmallSingleLineLoader } from '../../../_components/Loader.jsx';

const AdminDashboard = () => {
  
  const [menu, setMenu] = useState(false)

  const toggleMobileMenu = () => {
	  setMenu(!menu)
  }

  useEffect( () => {
    let firstload = localStorage.getItem("firstload")
    if(firstload === "true"){
      setTimeout( () => {
        window.location.reload(1)
        localStorage.removeItem("firstload")
      },1000)
    }
  });

  const [isDarkMode] = useGlobalState("isDarkMode", isDarkMode);

  const user = localStorage.getItem("username");

  const {data: allEmployee, isLoading: isEmployeeLoading} = useDataFetching(); 
  const {houseData, isHouseDataLoading} = useHouseFetching();
  const {residentData, isResidentLoading} = useResidentFetching();
  const { taskData, isTaskLoading } = useTaskFetching();

  const barchartdata = [
    {
      name: 'Total Task',
      Total: taskData?.length
      ? taskData?.length
      : "0",
    },
    {
      name: 'Total Resident',
      Total: residentData?.length
      ? residentData?.length
      : "0",
    },
    {
      name: 'Total Employees',
      Total: allEmployee?.length
      ? allEmployee?.length
      : "0",
    },
    {
      name: 'Total House',
      Total: houseData?.length
      ? houseData?.length
      : "0",
    },
  ];

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Dashboard - Peepal Tree HRMS</title>
          <meta name="description" content="Dashboard" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="text-4xl text-orange-500">Dashboard</h3>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 mb-4">
              <div style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}} class="container mx-auto px-4 py-8 border border-gray-300 rounded-md shadow-md card-body">
                <div className="flex justify-between">
                  <span class="general-text-color font-bold">Total Tasks</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99805 16H11.998M7.99805 11H15.998" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5"/>
                    <path d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex flex-col mt-4">
                  {isTaskLoading ? (
                    <SmallSingleLineLoader/>
                  ) : (
                    <p class="text-2xl font-bold text-orange-500 mr-2">{taskData?.length}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 mb-4">
              <div style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}} class="container mx-auto px-4 py-8 border border-gray-300 rounded-md shadow-md card-body">
                <div className="flex justify-between">
                  <span class="general-text-color font-bold">Total Residents</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="flex flex-col mt-4">
                  {isResidentLoading ? (
                    <SmallSingleLineLoader/>
                  ) : (
                    <p class="text-2xl font-bold text-orange-500 mr-2">{residentData?.length}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 mb-4">
              <div style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}} class="container mx-auto px-4 py-8 border border-gray-300 rounded-md shadow-md card-body">
                <div className="flex justify-between">
                  <span class="general-text-color font-bold">Total Employees</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9H18" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M14 12.5H17" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M17 3H7C4.23858 3 2 5.23858 2 8V16C2 18.7614 4.23858 21 7 21H17C19.7614 21 22 18.7614 22 16V8C22 5.23858 19.7614 3 17 3Z" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5" stroke-linejoin="round"/>
                    <path d="M5 16C6.20831 13.4189 10.7122 13.2491 12 16" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.5 9C10.5 10.1046 9.60457 11 8.5 11C7.39543 11 6.5 10.1046 6.5 9C6.5 7.89543 7.39543 7 8.5 7C9.60457 7 10.5 7.89543 10.5 9Z" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="flex flex-col mt-4">
                  {isEmployeeLoading ? (
                    <SmallSingleLineLoader/>
                  ) : (
                    <p class="text-2xl font-bold text-orange-500 mr-2">{allEmployee?.length}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 mb-4">
              <div style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}} class="container mx-auto px-4 py-8 border border-gray-300 rounded-md shadow-md card-body">
                <div className="flex justify-between">
                  <span class="general-text-color font-bold">Total House</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17H12.009" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 8.5V13.5C20 17.2712 20 19.1569 18.8284 20.3284C17.6569 21.5 15.7712 21.5 12 21.5C8.22876 21.5 6.34315 21.5 5.17157 20.3284C4 19.1569 4 17.2712 4 13.5V8.5" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5"/>
                    <path d="M22 10.5L17.6569 6.33548C14.9902 3.77849 13.6569 2.5 12 2.5C10.3431 2.5 9.00981 3.77849 6.34315 6.33548L2 10.5" stroke={`${isDarkMode ? '#625F5C' : '#141B34'}`} stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="flex flex-col mt-4">
                  {isHouseDataLoading ? (
                    <SmallSingleLineLoader/>
                  ) : (
                    <p class="text-2xl font-bold text-orange-500 mr-2">{houseData?.length}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 p-4">
              <div className="row">
                <div className="col-md-12 text-center border border-gray-300 rounded-md shadow-md">
                  <div className="">
                    <div className="card-body">
                      <h3 className="text-orange-500">Total Workforce</h3>
                      <div id="bar-charts" />
                      <ResponsiveContainer width="100%" height={500}>
                        <BarChart
                          data={barchartdata}
                          margin={{
                            top: 5,
                            right: 5,
                            left: 5,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Total" barSize={50} fill="#F97316" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </div>
  );
}

export default withRouter(AdminDashboard);
