import React, { useEffect, useState, useReducer} from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "./style";
import {
  Avatar_05,
} from "../../../Entryfile/imagepath";
import SmileImg from "../../../assets/img/smile.png";
import Logo from "../../../assets/img/circle-logo.png";


const CommentSection = () => {
  const [comments, setComments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.elements.comment.value;
    setComments([...comments, { text: comment }]);
    event.target.elements.comment.value = "";
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
                {comments.map((comment, index) => (
                  <div key={index} className="chats">
                    <div className="chat-line">
                      <span className="chat-date">October 8th, 2018</span>
                    </div>
                    <div className="chat chat-right">
                      <div className="chat-avatar">
                        <Link to="#" className="avatar">
                          <img alt="" src={SmileImg} />
                        </Link>
                      </div>
                      <div className="chat-body">
                        <div className="chat-bubble">
                          <div className="chat-content">
                            <p>{comment.text}</p>
                            <span className="chat-time">8:42 am</span>
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
                ))}
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
                  defaultValue={""}
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
    </Card>
  );
}

export default CommentSection