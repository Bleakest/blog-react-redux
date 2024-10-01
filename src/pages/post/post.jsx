import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useMatch, useParams } from "react-router-dom";
import { useServerRequest } from "../../hooks";
import { selectPost } from "../../selectors";
import { loadPostAsync } from "../../actions/load-post-async";
import { Comments, PostContent, PostForm } from "./components";

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditing = useMatch("/post/:id/edit");
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  useEffect(() => {
    dispatch(loadPostAsync(requestServer, params.postId));
  }, [requestServer, dispatch]);
  return (
    <div className={className}>
      {isEditing ? (
        <PostForm post={post} />
      ) : (
        <>
          <PostContent post={post} />
          <Comments comments={post.comments} postId={post.id} />
        </>
      )}
    </div>
  );
};

export const Post = styled(PostContainer)`
  margin: 40px 0;
  padding: 40px 80px;
`;
