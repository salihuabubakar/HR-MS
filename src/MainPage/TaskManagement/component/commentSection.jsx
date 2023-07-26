import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { Card } from "./style";
import { useTaskChatFetching, useDataFetching } from "../../../utils/employeeCustomFetchHook";
import { add_update_delete_task_chat } from "../../../utils/sendToServer";
import { useGlobalState, setGlobalState } from "../../../context/GlobalState";
import moment from "moment";

const CommentSection = ({ task, selecetedTaskId }) => {
  const { taskChatData } = useTaskChatFetching();
  const { data: allEmployee } = useDataFetching();
  const [message, setMessage] = useState("");

  const [chatState, dispatchTaskChat] = useReducer(add_update_delete_task_chat, []);
  const [taskChatError] = useGlobalState("taskChatError");

  const sender = 100;
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      console.log("Empty input");
      return;
    }
    const chatsObject = {
      task,
      message,
      sender,
    };
    dispatchTaskChat({ type: "add", payload: chatsObject });
    setMessage("");
  };

  const clearErrorMessage = () => {
    setGlobalState("taskChatError", "");
  };

  return (
    <Card className="card">
      <div className="fixed-header">
        <div className="navbar">
          <div className="user-details me-auto">
            <div className="user-info float-start">
              <Link onClick={(e) => e.preventDefault()}>
                <span>Comment Section</span>{" "}
              </Link>
              <span style={{ color: "red", fontSize: "0.7rem" }}>
                {taskChatError?.length > 0 && (
                  <>
                    Error: {taskChatError}
                    <button
                      onClick={clearErrorMessage}
                      style={{
                        marginLeft: "10px",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        color: "black",
                      }}
                    >
                      <i className="fa fa-times" />
                      Clear Error
                    </button>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-footer">
        <div className="message-bar">
          <div className="message-inner">
            <div className="message-area">
              <form onSubmit={handleCommentSubmit} className="input-group">
                <textarea
                  className="form-control"
                  placeholder="Type message..."
                  id="comment"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="comment"
                />
                <span className="input-group-append">
                  <button className="btn btn-custom" type="submit">
                    <i className="fa fa-send" />
                  </button>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-div">
        <div className="chat-content chat-box-height">
          <div>
            <div>
              <div className="chat-box">
                {taskChatData
                  ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .map((comment, index) => {
                    const { id, message, task, sender, created_at } = comment;
                    const currentSender = allEmployee?.find((s) => s.id === sender);
                    if (task === selecetedTaskId) {
                        const currentTime = moment();
                        const messageTime = moment(created_at);

                        const diffInMinutes = currentTime.diff(messageTime, "minutes");
                        const diffInHours = currentTime.diff(messageTime, "hours");
                        const diffInDays = currentTime.diff(messageTime, "days");
                        let timeAgo;
                        if (diffInMinutes < 1) {
                          timeAgo = `1s ago`;
                        } else if (diffInMinutes < 60) {
                          timeAgo = `${diffInMinutes}m ago`;
                        } else if (diffInHours < 24) {
                          timeAgo = `${diffInHours}h ago`;
                        } else if (diffInDays < 5) {
                          timeAgo = `${diffInDays}d ago`;
                        } else {
                          timeAgo = messageTime.format("DD MMM YYYY");
                        }
                      return (
                        <div key={id} className="chats">
                          <div className="chat chat-left">
                            <div className="chat-avatar">
                              <Link onClick={(e) => e.preventDefault()} className="avatar">
                                <img alt="" src={currentSender?.photo} />
                              </Link>
                            </div>
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <span className="chat-time">
                                    {sender &&
                                      ` ${currentSender?.first_name}
                                        ${currentSender?.middle_name}
                                        ${currentSender?.last_name}
                                    `}
                                  </span>
                                  <p>{message}</p>
                                  <div style={{ display: "flex" }}>
                                    <span className="chat-time">{timeAgo}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CommentSection;
