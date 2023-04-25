import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Context';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const RenderMenu = () => {
    if (currentUser) {
      return (
        <>
          <Link to='/?cat=sports' className='link'>Sport</Link>
          <Link to='/?cat=politics' className='link'>Politics</Link>
          <Link to='/?cat=science' className='link'>Science</Link>
          <Link to='/?cat=business' className='link'>Business</Link>
          <Link to='/?cat=cinema' className='link'>Cinema</Link>
          <Link to='/?cat=world' className='link'>World</Link>
          <Link to='/create' className='link c-link'>Create</Link>
          <Link to='/profile' className='profile-link'>{currentUser?.username}</Link>
          <Link to='/' className='link' onClick={logout}>Logout</Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link to='/?cat=sports' className='link'>Sports</Link>
          <Link to='/?cat=politics' className='link'>Politics</Link>
          <Link to='/?cat=science' className='link'>Science</Link>
          <Link to='/?cat=business' className='link'>Business</Link>
          <Link to='/?cat=cinema' className='link'>Cinema</Link>
          <Link to='/?cat=world' className='link'>World</Link>
          <Link to='/login' className='link'>Login</Link>
        </>
      )
    }
  }
  return (
    <>
      <div className="navbar">
        <nav>
          <div className="logo">
            <Link to='/' className='logoName'>Blog<span>C</span>orner</Link>
          </div>
          <div className="links">
            <RenderMenu />
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar; 