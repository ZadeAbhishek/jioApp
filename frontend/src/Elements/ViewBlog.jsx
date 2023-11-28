import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/ViewBlog.css';

function ViewBlog() {
  const location = useLocation();
  const [blog, setBlog] = React.useState({});

  React.useEffect(() => {
    if (location.state) {
      setBlog(location.state);
    }
  }, []);

  return (
    <div className='view-blog-container'>
      <div className='blog-body'>
        {blog.title && (
          <div className='blog-title'>{blog.title}</div>
        )}
        <div className='blog-timestamp-author'>
          {blog.timestamp && (
            <div className='timestamp'>{blog.timestamp}</div>
          )}
          {blog.author && (
            <div className='author'>{blog.author}</div>
          )}
        </div>
        {blog.body && (
          <div className='blog-card-body'>{blog.body}</div>
        )}
      </div>
    </div>
  );
}

export default ViewBlog;
