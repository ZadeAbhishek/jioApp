import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/personalBlog.css"

const globalBlogsUrl = 'http://localhost:8080/personalblog';
const deleteBlogsUrl = 'http://localhost:8080/deleteblog';

function PersonalBlogs() {
  const email = 'zadeabhi55@gmail.com';
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    axios.post(globalBlogsUrl, { email: email })
      .then((response) => {
        setBlogs(response.data.blogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (blogId) => {
    console.log('Delete blog with ID:', blogId);
    axios.post(deleteBlogsUrl,{email:email,id:blogId}).then((response)=>{updateUI(response)}).catch((error)=>{alert(error)})
  };

  const updateUI = (response)=>{
    alert(response.data)
    window.location.reload(false);
  }
  return (
    <div className='home-body'>
      {blogs.map((blog) => (
        <div key={blog.id} className='title-card'>
          <div className='title'>{blog.title}</div>
          <div className='timestamp-author'>
            <div className='timestamp'>{blog.timestamp}</div>
            <div className='timestamp'>{blog.time}</div>
            <div className='author'>{blog.author}</div>
          </div>
          <div className='card-body'>{blog.body.slice(0, 250) + '....'}</div>
          <div className='buttons'>
            <Link className='read-more' to={{ pathname: `/editblog/${blog.title + blog.timestamp}`}} state={blog} >Edit Blog {'>>>'}</Link>
            <button onClick={() => handleDelete(blog.id)} className='delete-button'>Delete</button>
          </div>
        </div>
      ))}
      <Link className='read-more publish-btn' to={{ pathname: `/publish`}} >Publish</Link>
    </div>
  );
}

export default PersonalBlogs;
