import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

let date = new Date().toJSON();
const email = "zadeabhi55@gmail.com"
const creatBlogUrl = 'http://localhost:8080/creatblog';
function Publish() {
  const [blog, setBlog] = React.useState({
    id:'',
    title: '',
    timestamp: date.slice(0,10),
    author: '',
    body: '',
    time:'',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    console.log('Blog Updated:', blog);
    blog.time = date.slice(11,16);
    let Date = `${blog.timestamp.replace(/\D/g,'')}` + `${blog.time.replace(/\D/g,'')}`;
    blog.id = Date;
    axios.post(creatBlogUrl,{email:email,id:blog.id,title:blog.title,timestamp:blog.timestamp,author:blog.author,body:blog.body, time:blog.time}).then((response)=>{alert(response.data)}).catch((error)=>{alert(error)})
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

      <button onClick={handleUpdate}>Publish Blog</button>
    </div>
  )
}

export default Publish