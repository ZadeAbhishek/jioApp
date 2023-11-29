import React from 'react';
import { useLocation } from 'react-router-dom';
import "../css/editBlog.css";
import axios from 'axios';

// API endpoint for updating the blog
const updateUrl = "http://localhost:8080/updateblog";

// Fetching email from local storage
const email = localStorage.getItem("email");

function EditBlog() {
  // State to manage the blog post being edited
  const [blog, setBlog] = React.useState({
    id:'',
    title: '',
    timestamp: '',
    author: '',
    body: '',
  });

  // Accessing the location object from React Router
  const location = useLocation();

  // Fetch the blog post data once when the component mounts
  React.useEffect(() => {
    setBlog(location.state); // Set the blog state with data from the location object
    console.log(location.state);
  }, []);

  // Update the blog state based on user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  // Function to handle updating the blog post
  const handleUpdate = () => {
    console.log('Blog Updated:', blog);
    console.log(blog.id);

    // Sending a POST request to update the blog post using Axios
    axios.post(updateUrl, {
      // Sending individual fields for the update
      email: email,
      id: blog.id,
      title: blog.title,
      timestamp: blog.timestamp,
      author: blog.author,
      body: blog.body,
    })
    .then((response) => {
      alert(response.data); // Alerting the user with the response message
    })
    .catch((error) => {
      alert(error); // Alerting the user if an error occurs
    });
  };

  // JSX code for rendering the edit form and preview section
  return (
    <div className='edit-body'>
      {/* Input field for editing the blog title */}
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

      {/* Input field for editing the author name */}
      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={blog.author}
        onChange={handleChange}
      />

      {/* Textarea for editing the body/content of the blog post */}
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

      {/* Button to trigger the update of the blog post */}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditBlog;
