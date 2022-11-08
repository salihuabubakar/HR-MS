import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import  Addschedule from "../../../_components/modelbox/Addschedule"
import { useGlobalState, setGlobalState} from '../../../context/GlobalState';

const ShiftList = () => {

  const [showModal] = useGlobalState("showModal");
     
    const [data, setData] = useState([
      {id:1,shift_name:"10'o clock Shift",start_time:"10:00:00 am",end_time:"07:00:00 pm",},
         {id:2,shift_name:"10:30 shift",start_time:"10:30:00 am",end_time:"06:30:00 pm",},
         {id:3,shift_name:"Daily Rout",start_time:"06:30:00 am",end_time:"03:30:00 pm",},          
    ]);

    const columns = [  
        {
          title: '#',
          dataIndex: 'id',
          sorter: (a, b) => a.id.length - b.id.length,
        },      
        {
          title: 'Shift Title',
          dataIndex: 'shift_name',
            sorter: (a, b) => a.shift_name.length - b.shift_name.length,
        },

        {
          title: 'Start Time',
          dataIndex: 'start_time',
          sorter: (a, b) => a.start_time.length - b.start_time.length,
        },
        {
          title: 'End Time',
          dataIndex: 'end_time',
          sorter: (a, b) => a.end_time.length - b.end_time.length,
        },
        // {
        //   title: 'Break Time',
        //   dataIndex: 'break_time',
        //   sorter: (a, b) => a.break_time.length - b.break_time.length,
        // },
        {
          title: 'Status',
          render: (text, record) => (
            <div className="action-label">
              <a className="btn btn-white btn-sm btn-rounded" href="javascript:void(0);">
                <i className="fa fa-dot-circle-o text-success" /> Active
              </a>
            </div>
            ),
        },
        {
          title: 'Action',
          render: (text, record) => (
            <div className="dropdown dropdown-action">
              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_shift"><i className="fa fa-pencil m-r-5" /> Edit</a>
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
              </div>
            </div>
            ),
        },
        
    
      ]
      
      return ( 
        <>
        {/* Page Wrapper */}
        <div className="page-wrapper">
            <Helmet>
                <title>Shift List - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>					
            </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Shift List</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item"><a href="#">Employees</a></li>
                    <li className="breadcrumb-item active">Shift List</li>
                  </ul>
                </div>
                <div className="col-auto float-end ml-auto">
                  <a className="btn add-btn m-r-5" onClick={() => setGlobalState("showModal", true)} >Add Shifts</a>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Content Starts */}
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                <Table className="table-striped"
                  pagination= { {total : data.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                  columns={columns}                 
                  // bordered
                  dataSource={data}
                  rowKey={record => record.id}
                  onChange={console.log("change")}
                />
                </div>
              </div>
            </div>
            {/* /Content End */}
          </div>
          {/* /Page Content */}
        </div>
        {/* /Page Wrapper */}
        {/* Add Schedule Modal */}
       {showModal && (
        <Addschedule />
      )}
        {/* /Add Schedule Modal */}
        {/* Delete Shift Modal */}
        <div className="modal custom-modal fade" id="delete_employee" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Shift</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a href="javascript:void(0);" className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a href="javascript:void(0);" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Employee Modal */}
      </>
        );
   
}

export default ShiftList;
