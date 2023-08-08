import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Aside = ({cat}) => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/posts/?cat=${cat}`);
            setPosts(res.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
    }, [cat]);

    return (
        <>
            <div className="aside-menu">
                <h2>Other posts you may like</h2>
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <img src={`../upload/${post?.img}`} alt="" />
                        <h2>{post.title}</h2>
                        <Link to={`/blog/${post.id}`} className="btn">Read More</Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Aside;