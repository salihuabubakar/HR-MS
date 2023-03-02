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
  selecetedTaskId
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
      selecetedTaskId,
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
    <PopupWrapper>
      <PopupOverlay />
      <PopupContainer className=" custom-modal" role="dialog">
        <Card className="" role="document">
          <div className="card-content">
            <div className="card-header">
              <h5 className="card-title">
                {selectedSubTaskInfo[indexToEdit]?.id
                  ? "Edit Task"
                  : "Add Task"}
              </h5>
              <div className="btn-container">
                <button
                  className="closeX"
                  type="button"
                  onClick={() => setGlobalState("showSubTaskModal", false)}
                >
                  <span>×</span>
                </button>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group form-focus focused">
                  <label className="focus-label">
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
                      onChange={(e) => setCheckToComplete(e.target.checked)}
                    />{" "}
                    {selectedSubTaskInfo[indexToEdit]?.checkToComplete
                      ? "Marked as completed"
                      : "Mark as completed"}
                  </div>
                )}
                <div className="submit-btn">
                  <button onClick={handleSubmit} className="submit-Btn">
                    {selectedSubTaskInfo[indexToEdit]?.id ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </PopupContainer>
    </PopupWrapper>
  );
};

export default AddSubTask;
