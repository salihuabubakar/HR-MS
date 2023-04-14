import styled from "@emotion/styled";

export const Card = styled.div`
  .chat-box-height {
    max-height: 350px;
    height: 100%;
    overflow-y: auto;
    background-color: #f7f7f7;
  }

  .reply-btn {
    margin-left: 5px;
    color: #888888;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .input-group-append- {
    margin: 5px 0;
    .btn-send {
      margin-right: 5px;
    }
  }

  .replies {
    margin-left: 20px;
  }

  .activeForm {
    margin-left: 20px;
    width: 50%;
  }

  .reply-avatar {
    width: 25px;
    height: 25px;
  }

  .chats {
    padding: 0 15px;
  }
`;