import styled from "styled-components";
import { Icon } from "../../../../../components";

const CommentContainer = ({ className, author, publishedAt, content }) => {
  console.log(author);

  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon
              id="fa-user-circle-o"
              margin="20px 0 0 10px"
              onClick={() => {}}
            />
            {author}
          </div>

          <div className="published-at">
            <Icon
              id="fa-calendar-o"
              margin="20px 15px 0 0"
              onClick={() => {}}
            />
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      <Icon id="fa-trash-o" margin="20px 0 0 5px" onClick={() => {}} />
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  display: flex;
  width: 100%;
  margin-top: 10px;
  padding: 10px;

  & .comment {
    width: 550px;
    border: 1px solid #000;
  }
  & .information-panel {
    display: flex;
    justify-content: space-between;
  }

  & .author {
    dispay: flex;
  }

  & .published-at {
    display: flex;
  }

  & .comment-text {
    padding: 10px;
  }
`;
