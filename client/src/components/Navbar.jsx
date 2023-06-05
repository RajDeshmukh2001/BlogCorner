import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Context';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [ toggleMenu, setToggleMenu ] = useState(false); 

  const RenderMenu = () => {
    if (currentUser) {
      return (
        <>
          <Link to='/?cat=sports' className='link' onClick={ () => setToggleMenu(!toggleMenu) }>Sport</Link>
          <Link to='/?cat=politics' className='link' onClick={ () => setToggleMenu(!toggleMenu) }>Politics</Link>
          <Link to='/?cat=science' className='link' onClick={ () => setToggleMenu(!toggleMenu) }>Science</Link>
          <Link to='/?cat=business' className='link' onClick={ () => setToggleMenu(!toggleMenu) }>Business</Link>
          <Link to='/?cat=cinema' className='link' onClick={ () => setToggleMenu(!toggleMenu) }>Cinema</Link>
          <Link to='/create' className='link c-link' onClick={ () => setToggleMenu(!toggleMenu) }>Create</Link>
          <Link to='/profile' className='profile-link' onClick={ () => setToggleMenu(!toggleMenu) }>{currentUser?.username}</Link>
          <Link to='/' className='link' onClick={logout}>Logout</Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link to='/?cat=sports' className='link' onClick={ () => setToggleMenu(!toggleMenu) }>Sports</Link>
          <Link to='/?cat=politics' className='link' onClick={ () => setToggleMenu(!toggleMenu) }>Politics</Link>
          <Link to='/?cat=science' className='link' onClick={ () => setToggleMenu(!toggleMenu) }>Science</Link>
          <Link to='/?cat=business' className='link' onClick={ () => setToggleMenu(!toggleMenu) }>Business</Link>
          <Link to='/?cat=cinema' className='link' onClick={ () => setToggleMenu(!toggleMenu) }>Cinema</Link>
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
          <i className="fa fa-bars" onClick={ () => setToggleMenu(!toggleMenu) }></i>
          <div className= {toggleMenu ? "links hamburger-menu" : "links" }>
            <RenderMenu />
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar; 