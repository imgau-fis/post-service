import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import CreatePost from "./pages/CreatePosts";
import PostsList from "./pages/ListPosts";
import DetailPost from "./pages/DetailPosts";
import "./assets/App.css";

function App() {
  return (
    <>
      <h2>Post Service</h2>
      <nav>
        <Link to="/">Danh sách</Link> | <Link to="/create">Tạo bài</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/p/:id" element={<DetailPost />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
