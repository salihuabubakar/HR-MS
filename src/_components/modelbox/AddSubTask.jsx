import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddSubTask = ({
  dispatchSubTaskTitle,
  indexToEdit,
  taskId,
}) => {
  const [selectedSubTaskInfo] = useGlobalState("selectedSubTaskInfo");

  console.log("datas...", selectedSubTaskInfo)
  console.log("index...", indexToEdit);

  const [subTask, setSubTask] = useState(
    selectedSubTaskInfo[indexToEdit]?.subTask
      ? selectedSubTaskInfo[indexToEdit]?.subTask
      : ""
  );

  const [checkToComplete, setCheckToComplete] = useState(
    selectedSubTaskInfo[indexToEdit]?.checkToComplete
      ? selectedSubTaskInfo[indexToEdit]?.checkToComplete
      : ""
  );

  const [id, setId] = useState(
    selectedSubTaskInfo[indexToEdit]?.id
      ? selectedSubTaskInfo[indexToEdit]?.id
      : Date.now()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const subTaskInfo = {
      id,
      taskId,
      subTask,
      checkToComplete,
    };
    if (selectedSubTaskInfo[indexToEdit]?.id) {
      dispatchSubTaskTitle({ type: "update", payload: subTaskInfo });
    } else {
      dispatchSubTaskTitle({ type: "push", payload: subTaskInfo });
    }
    setGlobalState("showSubTaskModal", false);
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedSubTaskInfo[indexToEdit]?.id
                      ? "Edit Task"
                      : "Add Task"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showSubTaskModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Task <span className="text-danger">*</span>
                          </label>
                          <input
                            value={subTask}
                            onChange={(e) => setSubTask(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="SubTask"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          {selectedSubTaskInfo[indexToEdit]?.id && (
                            <div className="form-group form-focus focused">
                              <input
                                checked={
                                  selectedSubTaskInfo[indexToEdit]?.id
                                    ? checkToComplete
                                    : ""
                                }
                                type="checkbox"
                                name="check"
                                id=""
                                value={checkToComplete}
                                onChange={(e) =>
                                  setCheckToComplete(e.target.checked)
                                }
                              />{" "}
                              {selectedSubTaskInfo[indexToEdit]?.checkToComplete
                                ? "Marked as completed"
                                : "Mark as completed"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedSubTaskInfo[indexToEdit]?.id
                          ? "Update"
                          : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
    </>
  );
};

export default AddSubTask;
