import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components";

const Content = styled.div`
  padding: 120px 0;
`;

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1000px;
  min-height: 100%;
  background-color: #fff;
  margin: 0 auto;
`;

const H2 = styled.h2`
  text-align: center;
`;

const Footer = () => <div>Footer</div>;

function Blog() {
  return (
    <AppColumn>
      <Header />
      <Content>
        <H2> Контент страницы</H2>
        <Routes>
          <Route path="/" element={<div>Main</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/register" element={<div>Registration</div>} />
          <Route path="/users" element={<div>Users</div>} />
          <Route path="/post" element={<div>New Post</div>} />
          <Route path="/post/:postId" element={<div>Post</div>} />
          <Route path="*" element={<div>Error</div>} />
        </Routes>
      </Content>
      <Footer></Footer>
    </AppColumn>
  );
}

export default Blog;
