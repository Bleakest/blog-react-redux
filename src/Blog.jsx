import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Header, Footer, Modal, Error } from "./components";
import { Registration, Authorization, Users, Post, Main } from "./pages";
import { useLayoutEffect } from "react";
import { setUser } from "./actions";
import { useDispatch } from "react-redux";
import { ERROR } from "./constans";

const Page = styled.div`
  padding: 120px 0 0;
`;

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1000px;
  min-height: 100%;
  background-color: #fff;
  margin: 0 auto;
  position: relative;
`;

function Blog() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      })
    );
  }, [dispatch]);
  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/post/:postId/edit" element={<Post />} />
          <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
        </Routes>
      </Page>
      <Footer />
      <Modal />
    </AppColumn>
  );
}

export default Blog;
