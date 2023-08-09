import React from 'react'
import DisplayFileType from '../../../_components/fileExtension';
import DOMPurify from 'dompurify';

const AssignmentBody = ({
  index,
  id,
  description,
  Managers_comment,
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

  return (
    <div className="task-container">
      <span className="task-action-btn task-check">
        <span
          style={{
            backgroundColor:
              (status === "Approved" && "#FF9B44") ||
              (status === "Rejected" && "red") ||
              (status === "Pending" && "grey"),
          }}
          className="action-circle large complete-btn"
          title="Mark Complete"
        >
          <i style={{ color: "white" }} className="material-icons">
            {(status === "Rejected" && "cancel") ||
              (status === "Pending" && "help_outline") ||
              (status === "Approved" && "check") ||
              (status === "Completed" && "check")}
          </i>
        </span>
      </span>
      <span className="task-label">
        <p>{description}</p>
        <p>
          <span className="small text-muted">Manager: </span>
          {getAllEmployees(manager)} <span className="small">{Managers_comment}</span>
        </p>
        <p>
          {employees?.length > 0 && <span className="small text-muted">Employee: </span>}
          {getAllEmployees(employees)}
        </p>
        <p>
          {resident?.length > 0 && <span className="small text-muted">Resident: </span>}
          {getAllResident(resident)}
        </p>
        {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(report)}} /> */}
        <div>
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
      </span>
      <div className="dropdown dropdown-action">
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
      </div>
    </div>
  );
};

export default AssignmentBody;