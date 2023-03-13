import React, { useEffect, useState, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "./style";
import { Avatar_05 } from "../../../Entryfile/imagepath";
import SmileImg from "../../../assets/img/smile.png";
import Logo from "../../../assets/img/circle-logo.png";
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import { initComment, savedCommentReducer } from "../../../utils/localStorage";

// Comment component represents each individual comment
const Comment = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    onReply(replyText);
    setReplyText('');
    setShowReplyForm(false);
  };

  return (
    <div className="comment">
      <div className="comment-author">{comment.author}</div>
      <div className="comment-text">{comment.text}</div>
      <button className="comment-reply" onClick={handleReply}>
        Reply
      </button>
      {showReplyForm && (
        <form onSubmit={handleReplySubmit}>
          <input
            type="text"
            placeholder="Type your reply here"
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {comment.replies && (
        <div className="comment-replies">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

// CommentList component displays a list of comments
const CommentList = ({ comments, onReply }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </div>
  );
};


// CommentForm component allows users to submit new comments
const CommentForm = ({ onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      author: author,
      text: text,
      replies: [],
      id: Date.now(),
    });
    setAuthor('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <input
        type="text"
        placeholder="Type your comment here"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

// App component renders the CommentList and CommentForm components
const CommentSection = ({ taskId, selecetedTaskId }) => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleReplySubmit = (parentId, replyText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              author: "You",
              text: replyText,
              id: Date.now(),
            },
          ],
        };
      }
      return comment;
    });
  };

  return <CommentForm />;
}; 

const App = ({ taskId, selecetedTaskId }) => {
  

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
                <div className="chats">
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
                          <div style={{ display: "flex" }}>
                            <span className="chat-time">2hr</span>
                            <span style={{ color: "#888888", fontWeight: "bolder", cursor: "pointer", textDecoration: "underline", marginLeft: "5px" }} className="chat-time">Reply</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-footer">
        <div className="message-bar">
          <div className="message-inner">
            <div className="message-area">
              <form
                // onSubmit={handleSubmit}
                className="input-group"
              >
                <textarea
                  className="form-control"
                  placeholder="Type message..."
                  // value={commentValue}
                  // onChange={(e) => setCommentValue(e.target.value)}
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
