import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

// URL for creating a new blog
const createBlogUrl = 'http://localhost:8080/createblog';

function Publish() {
  const email = localStorage.getItem("email");
  let date = new Date().toJSON();

  // State to manage the blog being created
  const [blog, setBlog] = React.useState({
    id:'',
    title: '',
    timestamp: date.slice(0,10),
    author: localStorage.getItem("name"),
    body: '',
    time:'',
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  // Function to handle publishing the blog
  const handleUpdate = () => {
    console.log('Blog Updated:', blog);
    blog.time = date.slice(11,16);
    let Date = `${date.replace(/\D/g,'')}`;
    blog.id = Date;

    // Sending a POST request to create a new blog
    axios.post(createBlogUrl, {
      email: email,
      id: blog.id,
      title: blog.title,
      timestamp: blog.timestamp,
      author: blog.author,
      body: blog.body,
      time: blog.time,
    })
    .then((response) => {
      alert("Blog Created"); // Alerting the user upon successful blog creation
    })
    .catch((error) => {
      alert(error); // Alerting the user if an error occurs
    });
  };

  return (
    <div className='edit-body'>
      {/* Input field for the blog title */}
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={blog.title}
        onChange={handleChange}
      />

      {/* Input field for displaying the timestamp (disabled from editing) */}
      <label htmlFor="timestamp">Timestamp:</label>
      <input
        type="text"
        id="timestamp"
        name="timestamp"
        value={blog.timestamp}
        onChange={handleChange}
        disabled
      />

      {/* Input field for displaying the author (might be for reference) */}
      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={blog.author}
        onChange={handleChange}
      />

      {/* Textarea for writing the body/content of the blog post */}
      <label htmlFor="body">Body:</label>
      <textarea
        id="body"
        name="body"
        value={blog.body}
        onChange={handleChange}
      ></textarea>

      {/* Preview section displaying the current content of the blog post */}
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

      {/* Button to trigger the publishing of the blog */}
      <button onClick={handleUpdate}>Publish Blog</button>
    </div>
  )
}

export default Publish;
