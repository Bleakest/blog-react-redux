import { useEffect, useState } from "react";
import styled from "styled-components";
import { PostCard } from "./components";
import { useServerRequest } from "../../hooks";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const requestServer = useServerRequest();

  useEffect(() => {
    requestServer("fetchPosts").then((posts) => {
      setPosts(posts.res);
    });
  }, []);
  //   console.log(posts);

  return (
    <div className={className}>
      <div className="post-list">
        {posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => {
          return (
            <PostCard
              key={id}
              id={id}
              title={title}
              publishedAt={publishedAt}
              commentsCount={commentsCount}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
      <div></div>
    </div>
  );
};

export const Main = styled(MainContainer)`
  & .post-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }
`;
