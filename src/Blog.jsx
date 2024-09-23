import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Header, Footer } from "./components";
import { Registration, Authorization, Users } from "./pages";

const Page = styled.div`
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

function Blog() {
  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<div>Main</div>} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post" element={<div>New Post</div>} />
          <Route path="/post/:postId" element={<div>Post</div>} />
          <Route path="*" element={<div>Error</div>} />
        </Routes>
      </Page>
      <Footer />
    </AppColumn>
  );
}

export default Blog;
