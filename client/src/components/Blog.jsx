import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import Aside from './Aside';
import axios from 'axios';
import moment from 'moment';
import DOMPurify from 'dompurify';

const Blog = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const blog = useLocation();
  const blogId = blog.pathname.split('/')[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${blogId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [blogId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${blogId}`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="blog">
        <div className="b-content">
          <main>
            <h1>{post.title}</h1>
            <img src={`../upload/${post?.img}`} alt="" />
            <div className="user">
              {post.userImg && <img src={post.userImg} alt="" />}
              <div className="user-info">
                <span>{post.fullname}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
              </div>
              {currentUser.username === post.username &&
                (<div className="edit">
                  <Link to={`/create`} state={post}><i className='fa fa-pencil'></i></Link>
                  <i className='fa fa-trash' id='delete' onClick={handleDelete}></i>
                </div>
                )
              }
            </div>
            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.description),}}></p>
          </main>
          <aside>
            <Aside cat={post.cat} />
          </aside>
        </div>
      </div>
    </>
  )
}

export default Blog;