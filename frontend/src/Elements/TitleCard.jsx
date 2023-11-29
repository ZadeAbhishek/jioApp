import React from 'react';
import '../css/titleCard.css';
import { Link } from 'react-router-dom';

function TitleCard({ blog }) {
  return (
    <div className='title-card'>
      {/* Displaying the blog title */}
      <div className='title'>{blog.title}</div>
      
      {/* Displaying timestamp, author, and a snippet of the blog body */}
      <div className='timestamp-author'>
        <div className='timestamp'>{blog.timestamp}</div>
        <div className='timestamp'>{blog.time}</div>
        <div className='author'>{blog.author}</div>
      </div>
      
      {/* Displaying a snippet of the blog body */}
      <div className='card-body'>{blog.body.slice(0, 250) + '.....'}</div>
      
      {/* Buttons for reading the full blog and deleting the blog */}
      <div className='buttons'>
        {/* Link to read the full blog */}
        <Link className='read-more' to={{ pathname: `/viewblog/${blog.title + blog.timestamp}`}} state={blog} >Read Blog {'>>>'}</Link>
        
        {/* Button for deleting the blog (placeholder, not implemented) */}
        <button className='delete-button del-btn'>Delete</button>
      </div>
    </div>
  );
}

export default TitleCard;
