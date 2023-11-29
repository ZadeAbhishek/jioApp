import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/home.css';
import TitleCard from './TitleCard'; // Assuming TitleCard is a component that renders a blog title

const globalBlogsUrl = 'http://localhost:8080/allblogs';

// Comparator function to sort blogs based on their ID in descending order
function cpmt(blog1, blog2) {
  const t1 = Number(blog1.id);
  const t2 = Number(blog2.id);

  if (t1 < t2) return 1;
  if (t1 > t2) return -1;
  return 0;
}

function Home() {
  const [blogs, setBlogs] = useState([]); // State to store fetched blogs
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    // Fetching blogs from the API when the component mounts
    axios.get(globalBlogsUrl)
      .then((response) => {
        const data = response.data;
        const blogs = [];
        // Flatten the nested structure and extract blogs
        Object.keys(data).forEach((key) => {
          blogs.push(...data[key].blogs);
        });
        blogs.sort(cpmt); // Sort blogs using the custom comparator function
        setBlogs(blogs); // Update state with sorted blogs
        setLoading(false); // Update loading status
      })
      .catch((error) => {
        setError('Error fetching data'); // Set error message if fetching data fails
        setLoading(false); // Update loading status
      });
  }, []); // Empty dependency array ensures the effect runs only once, on mount

  // Conditional rendering based on loading status and presence of blogs
  if (loading) return <div className='home-body'>Loading...</div>;
  if (error) return <div className='home-body'>{error}</div>;
  if (!blogs || blogs.length === 0) return <div className='home-body'>No blogs found</div>;

  // Render fetched blogs using TitleCard component
  return (
    <div className='home-body'>
      {blogs.map((blog, index) => (
        <TitleCard key={index} blog={blog} />
      ))}
    </div>
  );
}

export default Home;
