import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/home.css';
import TitleCard from './TitleCard';

const globalBlogsUrl = 'http://localhost:8080/allblogs';

function cpmt(blog1, blog2) {
  const t1 = Number(blog1.timestamp);
  const t2 = Number(blog2.timestamp);

  if (t1 < t2) return -1;
  if (t1 > t2) return 1;
  return 0;
}

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(globalBlogsUrl)
      .then((response) => {
        const data = response.data;
        const blogs = [];
        Object.keys(data).forEach((key) => {
          blogs.push(...data[key].blogs);
        });
        blogs.sort(cpmt);
        setBlogs(blogs);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className='home-body'>Loading...</div>;
  if (error) return <div className='home-body'>{error}</div>;
  if (!blogs || blogs.length === 0) return <div className='home-body'>No blogs found</div>;

  return (
    <div className='home-body'>
      {blogs.map((blog, index) => (
        <TitleCard key={index} blog={blog} />
      ))}
    </div>
  );
}

export default Home;
