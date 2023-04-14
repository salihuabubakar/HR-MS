import React, { useEffect, useState, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "./style";
import { Avatar_05 } from "../../../Entryfile/imagepath";
import SmileImg from "../../../assets/img/smile.png";
import Logo from "../../../assets/img/circle-logo.png";

const CommentSection = ({ taskId, selecetedTaskId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeCommentId, setActiveCommentId] = useState("");

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments"));
    if (storedComments) {
      setComments(storedComments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      setComments([
        ...comments,
        {
          id: new Date().getTime(),
          text: commentText,
          replies: [],
          taskId,
        },
      ]);
      setCommentText("");
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() !== "") {
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === activeCommentId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: new Date().getTime(),
                  text: replyText,
                },
              ],
            };
          }
          return comment;
        })
      );
      setReplyText("");
      setActiveCommentId("");
    }
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
      <div className="chat-footer">
        <div className="message-bar">
          <div className="message-inner">
            <div className="message-area">
              <form onSubmit={handleCommentSubmit} className="input-group">
                <textarea
                  className="form-control"
                  placeholder="Type message..."
                  id="comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
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
                {comments?.map((comment, index) => {
                  const { id, text, replies, taskId } = comment;
                  if(taskId === selecetedTaskId) {
                    return (
                      <div key={id} className="chats">
                        <div className="chat chat-left">
                          <div className="chat-avatar">
                            <Link
                              onClick={(e) => e.preventDefault()}
                              className="avatar"
                            >
                              <img alt="" src={Logo} />
                            </Link>
                          </div>
                          <div className="chat-body">
                            <div className="chat-bubble">
                              <div className="chat-content">
                                <p>{text}</p>
                                <div style={{ display: "flex" }}>
                                  <span className="chat-time">2hr</span>
                                  <span
                                    className="chat-time reply-btn"
                                    onClick={() => setActiveCommentId(id)}
                                  >
                                    Reply
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {activeCommentId === id && (
                          <div className="message-bar activeForm">
                            <div className="message-inner">
                              <div className="message-area">
                                <form
                                  // onSubmit={handleReplySubmit}
                                  className="input-group"
                                >
                                  <textarea
                                    className="form-control"
                                    placeholder="Leave a reply"
                                    id="reply"
                                    value={replyText}
                                    onChange={(e) =>
                                      setReplyText(e.target.value)
                                    }
                                    name="comment"
                                  />
                                </form>
                                <div className="input-group-append-">
                                  <button
                                    onClick={handleReplySubmit}
                                    className="btn btn-custom btn-send"
                                    type="submit"
                                  >
                                    <i className="fa fa-send" />
                                  </button>
                                  <button
                                    onClick={() => setActiveCommentId(null)}
                                    type="button"
                                    className="btn btn-custom"
                                  >
                                    <i className="fa fa-times-circle" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="replies">
                          {replies?.map((reply) => {
                            const { id, text: replies } = reply;
                            return (
                              <div key={id} className="chat chat-left">
                                <div className="chat-avatar">
                                  <Link
                                    onClick={(e) => e.preventDefault()}
                                    className="avatar reply-avatar"
                                  >
                                    <img alt="" src={SmileImg} />
                                  </Link>
                                </div>
                                <div className="chat-body">
                                  <div className="chat-bubble">
                                    <div className="chat-content">
                                      <p>{replies}</p>
                                      <div>
                                        <span className="chat-time">2hr</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
