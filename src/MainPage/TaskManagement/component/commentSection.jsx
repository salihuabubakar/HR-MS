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

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <Card className="card shadow-md bg-transparent">
      {/* <div className="fixed-header bg-transparent">
        <div className="navbar">
          <div className="user-details me-auto">
            <div className="user-info float-start">
              <span style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}}>Comment Section</span>
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
      </div> */}
      <div className="chat-footer bg-transparent">
        <div className="message-bar">
          <div className="message-inner">
            <div className="message-area">
              <form onSubmit={handleCommentSubmit} className="input-group">
                <textarea
                  className="form-control bg-transparent border shadow-md"
                  placeholder="Type message..."
                  id="comment"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="comment"
                />
                <span className="input-group-append">
                  <button className="btn" type="submit">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke={`${isDarkMode ? '#898888' : '#EE6A0B'}`} stroke-width="1.5"/>
                      <path d="M11.5 12.5L15 9" stroke={`${isDarkMode ? '#898888' : '#EE6A0B'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
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
                {
                    /**
                    * Render Task Chat Comments
                    *
                    * Renders task chat comments based on the 'taskChatData', sorting them by the creation date in descending order.
                    * It maps through the comments, filtering those related to the selected task ('selecetedTaskId').
                    * For each relevant comment, it formats and displays the sender's information, message content, and timestamp.
                    * The timestamp is calculated as a time ago format for recent messages and a date format for older messages.
                    *
                    * Dependencies:
                    * - taskChatData: Array of task chat comments.
                    * - allEmployee: Array of all employees.
                    * - selecetedTaskId: ID of the selected task.
                    *
                    * @returns {JSX.Element} - Returns JSX elements rendering task chat comments.
                    */
                  taskChatData
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
                                <div className="chat-content bg-transparent">
                                  <span style={{color: "#625F5C"}} className="chat-time">
                                    {sender &&
                                      ` ${currentSender?.first_name}
                                        ${currentSender?.middle_name}
                                        ${currentSender?.last_name}
                                    `}
                                  </span>
                                  <p style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>{message}</p>
                                  <div style={{ display: "flex" }}>
                                    <span style={{color: "#625F5C"}} className="chat-time">{timeAgo}</span>
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
