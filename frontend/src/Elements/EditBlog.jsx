import React from 'react'
import { useLocation } from 'react-router-dom'
import "../css/editBlog.css"
import axios from 'axios';
const updateUrl = "http://localhost:8080/updateblog"
const email = "zadeabhi55@gmail.com"
function EditBlog() {
const [blog, setBlog] = React.useState({
        id:'',
        title: '',
        timestamp: '',
        author: '',
        body: '',
      });
  const location = useLocation()
  React.useEffect(()=>{
    setBlog(location.state);
    console.log(location.state);
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    console.log('Blog Updated:', blog);
    console.log(blog.id)
    // SUpport to send complete object here instade
    axios.post(updateUrl,{email:email,id:blog.id,title:blog.title,timestamp:blog.timestamp,author:blog.author,body:blog.body}).then((response)=>{alert(response.data)}).catch((error)=>{alert(error)})
  };

  return (
    <div className='edit-body'>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={blog.title}
        onChange={handleChange}
      />

      <label htmlFor="timestamp">Timestamp:</label>
      <input
        type="text"
        id="timestamp"
        name="timestamp"
        value={blog.timestamp}
        onChange={handleChange}
        disabled
      />

      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={blog.author}
        onChange={handleChange}
      />

      <label htmlFor="body">Body:</label>
      <textarea
        id="body"
        name="body"
        value={blog.body}
        onChange={handleChange}
      ></textarea>

      <div className="preview">
        <div className="title">{blog.title}</div>
        <div className="timestamp-author">
          <div className="timestamp">{blog.timestamp}</div>
          <div className="author">{blog.author}</div>
        </div>
        <div className="card-body">
          {blog.body}
        </div>
      </div>

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditBlog