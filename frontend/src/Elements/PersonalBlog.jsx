import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/personalBlog.css"

// URLs for fetching personal blogs and deleting a blog
const globalBlogsUrl = 'http://localhost:8080/personalblog';
const deleteBlogsUrl = 'http://localhost:8080/deleteblog';

function PersonalBlogs() {
  // Check if the user is logged in based on the localStorage
  let isloggedIn = localStorage.getItem("isloggedIn") !== "False";
  console.log(isloggedIn)

  // Access the navigate function from React Router
  const navigate = useNavigate();

  // Get the email from localStorage
  const email = localStorage.getItem("email");

  // State to store fetched blogs
  const [blogs, setBlogs] = React.useState([]);

  // Fetch blogs associated with the logged-in user
  React.useEffect(() => {
    axios.post(globalBlogsUrl, { email: email })
      .then((response) => {
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to handle deletion of a blog
  const handleDelete = (blogId) => {
    console.log('Delete blog with ID:', blogId);
    axios.post(deleteBlogsUrl, { email: email, id: blogId })
      .then((response) => {
        updateUI(response); // Update UI after deleting the blog
      })
      .catch((error) => {
        alert(error);
      })
  };

  // Update UI after deleting a blog
  const updateUI = (response) => {
    alert(response.data);
    axios.post(globalBlogsUrl, { email: email })
      .then((response) => {
        setBlogs(response.data.blogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Render blogs if the user is logged in, otherwise redirect to the login page
  if (isloggedIn) {
    return (
      <div className='home-body'>
        {/* Map through fetched blogs */}
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
              {/* Link to edit a blog */}
              <Link className='read-more' to={{ pathname: `/editblog/${blog.title + blog.timestamp}`}} state={blog} >Edit Blog {'>>>'}</Link>
              {/* Button to delete a blog */}
              <button onClick={() => handleDelete(blog.id)} className='delete-button'>Delete</button>
            </div>
          </div>
        ))}
        {/* Link to the publishing page */}
        <Link className='read-more publish-btn' to={{ pathname: `/publish`}} >Publish</Link>
      </div>
    );
  } else {
    navigate("/"); // Redirect to the home page if the user is not logged in
  }
}

export default PersonalBlogs;
