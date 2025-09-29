import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import HtmlCategory from './pages/Category/HtmlCategory';
import CssCategory from './pages/Category/CssCategory';
import JavaScriptCategory from './pages/Category/JavaScriptCategory';
import ReactCategory from './pages/Category/ReactCategory';
import DailyCategory from './pages/Category/DailyCategory';
import PostDetail from './pages/Post/PostDetail';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/category/html" element={<HtmlCategory />} />
        <Route path="/category/css" element={<CssCategory />} />
        <Route path="/category/javascript" element={<JavaScriptCategory />} />
        <Route path="/category/react" element={<ReactCategory />} />
        <Route path="/category/daily" element={<DailyCategory />} />
        <Route path="/post/:category/:postId" element={<PostDetail />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
