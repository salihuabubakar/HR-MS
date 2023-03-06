import React, { useEffect, useState, useReducer} from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "./style";
import {
  Avatar_05,
} from "../../../Entryfile/imagepath";
import SmileImg from "../../../assets/img/smile.png";
import Logo from "../../../assets/img/circle-logo.png";
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import { initComment, savedCommentReducer } from "../../../utils/localStorage";

const CommentSection = ({ taskId, selecetedTaskId }) => {
  const [comment, dispatchComments] = useReducer(
    savedCommentReducer,
    [],
    initComment
  );

  useEffect(() => {
    localStorage.setItem("comment", JSON.stringify(comment));
  }, [comment]);

  const [comments, setComments] = useState();
  useEffect(() => {
    setComments(comment);
  }, [comment]);

  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const [time] = useState(`${hours}:${minutes}`);
  const [commentValue, setCommentValue] = useState("");
  const [id] = useState(Date.now());

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentDetails = {
      id,
      commentValue,
      time,
      selecetedTaskId,
      taskId,
      formattedDate,
    };
    dispatchComments({ type: "push", payload: commentDetails });
    setCommentValue("");
  };

  const handleDeleteComment = (index) => {
    dispatchComments({
      type: "delete",
      payload: comment[index],
    });
  };

  return (
    <Card className="card">
      <div className="fixed-header">
        <div className="navbar">
          <div className="user-details me-auto">
            <div className="user-info float-start">
              <Link to="/app/profile/employee-profile">
                <span>Comment Section</span>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-div">
        <div className="chat-content chat-box-height">
          <div>
            <div>
              <div className="chat-box">
                {comments?.map((comment, index) => {
                  const { id, commentValue, time, formattedDate } = comment;
                  return (
                    <div key={id} className="chats">
                      {index === 0 && (
                        <div className="chat-line">
                          <span className="chat-date">{formattedDate}</span>
                        </div>
                      )}
                      <div className="chat chat-right">
                        <div className="chat-avatar">
                          <Link to="#" className="avatar">
                            <img alt="" src={SmileImg} />
                          </Link>
                        </div>
                        <div className="chat-body">
                          <div className="chat-bubble">
                            <div className="chat-content">
                              <p>{commentValue}</p>
                              <span className="chat-time">{time}</span>
                            </div>
                            <div className="chat-action-btns">
                              <ul>
                                <li>
                                  <a
                                    onClick={() => handleDeleteComment(index)}
                                    className="del-msg"
                                  >
                                    <i className="fa fa-trash-o" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="chat chat-left">
                        <div className="chat-avatar">
                          <Link
                            to="/app/profile/employee-profile"
                            className="avatar"
                          >
                            <img alt="" src={Logo} />
                          </Link>
                        </div>
                        <div className="chat-body">
                          <div className="chat-bubble">
                            <div className="chat-content">
                              <p>Hi, work in progress!</p>
                              <span className="chat-time">8:35 am</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-footer">
        <div className="message-bar">
          <div className="message-inner">
            <div className="message-area">
              <form onSubmit={handleSubmit} className="input-group">
                <textarea
                  className="form-control"
                  placeholder="Type message..."
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  name="comment"
                />
                <span className="input-group-append">
                  <button
                    // onClick={handleSubmit}
                    className="btn btn-custom"
                    type="submit"
                  >
                    <i className="fa fa-send" />
                  </button>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CommentSection