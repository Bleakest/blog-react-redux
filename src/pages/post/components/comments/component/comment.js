import styled from "styled-components";
import { Icon } from "../../../../../components";
import { useDispatch } from "react-redux";
import {
  CLOSE_MODAL,
  openModal,
  removeCommentAsync,
} from "../../../../../actions";
import { useServerRequest } from "../../../../../hooks";

const CommentContainer = ({
  className,
  author,
  id,
  postId,
  publishedAt,
  content,
}) => {
  const requestServer = useServerRequest();
  const dispatch = useDispatch();

  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить комментарий?",
        onConfirm: () => {
          dispatch(removeCommentAsync(requestServer, postId, id));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

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
            <Icon id="fa-calendar-o" margin="0 15px 0 0" onClick={() => {}} />
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      <Icon
        id="fa-trash-o"
        margin="20px 0 0 5px"
        onClick={() => onCommentRemove(id)}
      />
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
    margin-left: 10px;
  }

  & .published-at {
    display: flex;
    margin: 20px 10px 0 0;
  }

  & .comment-text {
    padding: 10px;
  }
`;
