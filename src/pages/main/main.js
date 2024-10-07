import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Pagination, PostCard, Search } from "./components";
import { useServerRequest } from "../../hooks";
import { PAGINATION_LIMIT } from "../../constans";
import { debounce, getLastPageFromLinks } from "./utils";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const requestServer = useServerRequest();

  useEffect(() => {
    requestServer("fetchPosts", searchPhrase, page, PAGINATION_LIMIT).then(
      ({ res: { posts, links } }) => {
        setPosts(posts);
        setLastPage(getLastPageFromLinks(links));
      }
    );
  }, [requestServer, page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  return (
    <div className={className}>
      <div className="posts-and-search">
        <Search searchPhrase={searchPhrase} onChange={onSearch} />
        {posts.length ? (
          <div className="post-list">
            {posts.map(
              ({ id, title, imageUrl, publishedAt, commentsCount }) => {
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
              }
            )}
          </div>
        ) : (
          <div className="no-posts-found">Статьи не найдены</div>
        )}
      </div>
      {lastPage > 1 && posts.length > 0 && (
        <Pagination lastPage={lastPage} setPage={setPage} page={page} />
      )}
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  justfiy-content: space-between;

  & .post-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px 80px;
  }

  & .no-posts-found {
    text-align: center;
    font-size: 18px;
    margin-top: 30px;
  }
`;
