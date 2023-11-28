import React from 'react';
import '../css/titleCard.css';
import { Link } from 'react-router-dom';

function TitleCard({ blog }) {
  return (
    <div className='title-card'>
      <div className='title'>{blog.title}</div>
      <div className='timestamp-author'>
        <div className='timestamp'>{blog.timestamp}</div>
        <div className='timestamp'>{blog.time}</div>
        <div className='author'>{blog.author}</div>
      </div>
      <div className='card-body'>{blog.body.slice(0, 250) + '.....'}</div>
      <div className='buttons'>
            <Link className='read-more' to={{ pathname: `/viewblog/${blog.title + blog.timestamp}`}} state={blog} >Read Blog {'>>>'}</Link>
            <button className='delete-button del-btn'>Delete</button>
          </div>
     
    </div>
  );
}

export default TitleCard;
