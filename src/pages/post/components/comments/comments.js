import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { Comment } from "./component";
import { useDispatch, useSelector } from "react-redux";
import { SelectUserId, SelectUserRole } from "../../../../selectors";
import { useServerRequest } from "../../../../hooks";
import { addCommentAsync } from "../../../../actions";
import { PROP_TYPE, ROLE } from "../../../../constans";
import PropTypes from "prop-types";

const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState("");
  const userId = useSelector(SelectUserId);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const userRole = useSelector(SelectUserRole);

  const onNewCommentAdd = (userId, postId, content) => {
    dispatch(addCommentAsync(requestServer, userId, postId, content));
    setNewComment("");
  };

  const isGuest = userRole === ROLE.GUEST;

  return (
    <div className={className}>
      {!isGuest && (
        <div className="new-comment">
          <textarea
            name="comment"
            onChange={({ target }) => setNewComment(target.value)}
            value={newComment}
            placeholder="комментарии"
          ></textarea>
          <Icon
            id="fa-paper-plane-o"
            margin="30px 0 0 5px"
            onClick={() => onNewCommentAdd(userId, postId, newComment)}
          />
        </div>
      )}

      <div className="comments">
        {comments.map(({ id, authorId, content, publishedAt }) => (
          <Comment
            key={id}
            id={id}
            postId={postId}
            author={authorId}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  width: 580px;
  margin: 0 auto;

  & .new-comment {
    display: flex;
    width: 100%;
    margin: 20px 0 0;
  }

  & .new-comment textarea {
    width: 550px;
    width: 100%;
    height: 120px;
    font-size: 18px;
    resize: none;
  }
`;

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
};
