import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const loc = useLocation();
    const userId = loc.pathname.split('/')[2];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_DOMAIN}/users/${userId}`);
            setUser(res.data);
          } catch (error) {
            console.log(error);
            navigate('/login');
          }
        };
        fetchData();
    }, [userId]);

    return (
        <>
            <div className="profile">
                <div className="profile-container">
                    <h2>User Profile</h2>
                    <div className="info">
                        <span>Name : </span>
                        <span>{user.fullname}</span>
                    </div>
                    <div className="info">
                        <span>Email : </span>
                        <span>{user.email}</span>
                    </div>
                    <div className="info">
                        <span>Username : </span>
                        <span>{user.username}</span>
                    </div>
                    <div className="info">
                        <span>Total Blogs : </span>
                        <span>{user.Total}</span>
                    </div>
                    <Link to='/register' className='update-user'>Update</Link>
                </div>
            </div>
        </>
    )
}

export default Profile;