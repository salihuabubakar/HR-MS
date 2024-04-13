import React from 'react'
import DisplayFileType from '../../../_components/fileExtension';
import DOMPurify from 'dompurify';
import { useGlobalState } from '../../../context/GlobalState';
import { Popup, Segment } from 'semantic-ui-react';

const AssignmentBody = ({
  index,
  id,
  description,
  managers_comment,
  manager,
  resident,
  employees,
  status,
  matchedDoc,
  getAllEmployees,
  getAllResident,
  handleFileDownload,
  handleTaskAssignmentEdit,
  handleTaskAssignmentDelete,
  regex,
  report,
}) => {

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <div className="task-container bg-transparent mb-2 shadow-md flex">
      <span className="task-action-btn task-check">
        {status === "Pending" && (
          <span>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#808080" stroke-width="1.5"/>
              <path d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5" stroke="#808080" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M11.992 17H12.001" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        )}
        {status === "Completed" && (
          <span>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#35BA67" stroke-width="1.5"/>
              <path d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8" stroke="#35BA67" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        )}
        {status === "Approved" && (
          <span>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#EE6A0B" stroke-width="1.5"/>
              <path d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8" stroke="#EE6A0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        )}
        {status === "Rejected" && (
          <span>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.1194 14.4L9.36 8.64M9.36061 14.4L15.12 8.64" stroke="#FF0000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21.84 11.52C21.84 6.21806 17.5419 1.92 12.24 1.92C6.93806 1.92 2.64 6.21806 2.64 11.52C2.64 16.8219 6.93806 21.12 12.24 21.12C17.5419 21.12 21.84 16.8219 21.84 11.52Z" stroke="#FF0000" stroke-width="1.44"/>
            </svg>
          </span>
        )}
      </span>
      <div className="task-label border shadow-md flex p-2">
        <div>
          {description && <label style={{color: "#625F5C"}} className='mt-2'>Description</label>}
          <p style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>{description}</p>
          {report && <label style={{color: "#625F5C"}} className='mt-2'>Report</label>}
          <div style={{color: `${isDarkMode ? '#898888' : '#333'}`}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(report)}} />
          {matchedDoc.length > 0 && <label style={{color: "#625F5C"}} className='mt-2'>Document</label>}
          <div className='mb-2'>
            {matchedDoc?.map((doc, i) => {
              const { name, document: docFile, task } = doc;
              if (task) {
                return (
                  <span key={doc.id} data-bs-toggle="tooltip" title={`${name}`}>
                    <span>
                      {docFile && regex.test(docFile) ? (
                        <img className="img-preview" src={docFile} alt="Preview" />
                      ) : !docFile ? null : (
                        <span className="files-icon">
                          <DisplayFileType file={docFile} />
                        </span>
                      )}
                    </span>
                    <span className="dropdown dropdown-action">
                      <a
                        className="action-icon dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="material-icons">more_vert</i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" onClick={() => handleFileDownload(docFile)}>
                          <i className="fa fa-download m-r-5" /> Download
                        </a>
                      </div>
                    </span>
                  </span>
                );
              }
            })}
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
                          <div className="ui link list">
                            <label style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className='small text-muted'>
                              Manager's comment:
                            </label>
                            <p>
                              {getAllEmployees(manager)}
                            </p>
                            <q style={{color: `${isDarkMode ? '#898888' : '#333'}`}} className="small">{managers_comment}</q>
                            
                            {employees?.length > 0 && 
                              <label style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className='flex gap-1 small text-muted'>
                                Employees:
                              </label>
                            }
                            <p className='flex gap-1'>
                              {getAllEmployees(employees)}
                            </p>
                            {resident?.length > 0 && 
                              <label style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className='flex gap-1 small text-muted'>
                                Resident:
                              </label>
                            }
                            <p className='flex gap-1'>
                              {getAllResident(resident)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Segment>
              </Segment.Group>
            }
            trigger={
                <a style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}}>
                  View More
                </a>
            }
          />
        </div>
      </div>
      <span className="dropdown dropdown-action task-action-btn">
          <a className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" onClick={() => handleTaskAssignmentEdit(index, id)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleTaskAssignmentDelete(id)}>
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </span>
    </div>
  );
};

export default AssignmentBody;