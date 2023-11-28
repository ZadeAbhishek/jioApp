import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Elements/Home';
import Login from './Elements/Login';
import PersonalBlogs from './Elements/PersonalBlog';
import Publish from './Elements/Publish';
import Navbar from './Elements/Navbar';
import ViewBlog from './Elements/ViewBlog'
import EditBlog from './Elements/EditBlog';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/personalblog" element={<PersonalBlogs />}/> 
      <Route path="/publish" element={<Publish />}/>
      <Route path="/viewblog/:name" element={<ViewBlog />}/>
      <Route path="/editblog/:name" element={<EditBlog />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
