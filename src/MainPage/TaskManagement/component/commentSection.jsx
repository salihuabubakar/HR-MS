import React, { useEffect, useState, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "./style";
import { Avatar_05 } from "../../../Entryfile/imagepath";
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
  const formattedDate = today.toLocaleDateString("en-GB", options);


  const [currentTime, setCurrentTime] = useState();
  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-GB", { hour12: false }).slice(0, 5));
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  const [commentValue, setCommentValue] = useState("");
  const [id] = useState(Date.now());

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentDetails = {
      id,
      commentValue,
      currentTime,
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

  const handleClearChat = () => {
    localStorage.removeItem("comment");
    window.location.reload();
  };

  // const [dataArray, setDataArray] = useState([
  //   "Apple",
  //   "Banana",
  //   "Banana",
  //   "Orange",
  //   "Apple",
  //   "Grape",
  //   "salihu",
  //   "salihu"
  // ]);
  // const [uniqueDataArray, setUniqueDataArray] = useState([]);

  // const handleFilterData = () => {
  //   const uniqueData = [...new Set(dataArray)];
  //   setUniqueDataArray(uniqueData);
  // };

  //   return (
  //   <div>
  //     <button onClick={handleFilterData}>Filter Data</button>
  //     <ul>
  //       {uniqueDataArray.map((data, index) => (
  //         <li key={index}>{data}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <Card className="card">
      <div className="fixed-header">
        <div className="navbar">
          <div className="user-details me-auto">
            <div className="user-info float-start">
              <Link to="/app/profile/employee-profile">
                <span>Comment Section</span>{" "}
              </Link>
              <div className="float-end">
                <div className="dropdown profile-action">
                  <a
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    className="action-icon dropdown-toggle"
                  >
                    <i className="material-icons">more_vert</i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a
                      className="dropdown-item"
                      onClick={() => handleClearChat()}
                    >
                      Clear chat
                    </a>
                  </div>
                </div>
              </div>
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
                  const {
                    id,
                    commentValue,
                    currentTime,
                    formattedDate: currentFormatedDate,
                    taskId: taskIdInComment,
                  } = comment;
                  if (selecetedTaskId === taskIdInComment) {
                    return (
                      <div key={index} className="chats">
                        {(index === 0 ||
                          formattedDate !== currentFormatedDate ||
                          formattedDate == currentFormatedDate) && (
                            <div className="chat-line">
                              <span className="chat-date">
                                {currentFormatedDate}
                              </span>
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
                                <span className="chat-time">{currentTime}</span>
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
                  }
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

export default CommentSection;
