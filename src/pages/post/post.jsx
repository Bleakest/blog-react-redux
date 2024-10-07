import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useMatch, useParams } from "react-router-dom";
import { useServerRequest } from "../../hooks";
import { selectPost } from "../../selectors";
import { loadPostAsync } from "../../actions/load-post-async";
import { Comments, PostContent, PostForm } from "./components";
import { RESET_POST_DATA } from "../../actions";
import { Error, PrivateContent } from "../../components";
import { ROLE } from "../../constans";

const PostContainer = ({ className }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const isEditing = !!useMatch("/post/:id/edit");
  const isCreating = !!useMatch("/post");
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }
    dispatch(loadPostAsync(requestServer, params.postId)).then((postData) => {
      setError(postData.error);
      setIsLoading(false);
    });
  }, [requestServer, dispatch, isCreating, params.postId]);

  if (isLoading) {
    return null;
  }

  const SpecificPostPage =
    isCreating || isEditing ? (
      <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
        <div className={className}>
          <PostForm post={post} />
        </div>
      </PrivateContent>
    ) : (
      <>
        <div className={className}>
          <PostContent post={post} />
          <Comments comments={post.comments} postId={post.id} />
        </div>
      </>
    );

  return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
  margin: 40px 0;
  padding: 40px 80px;
`;
