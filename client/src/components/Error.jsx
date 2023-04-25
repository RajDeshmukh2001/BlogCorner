import React from 'react';
import ErrorImg from '../images/error.jpg'; 

const Error = () => {
  return (
    <>
      <div className="error">
        <img src={ErrorImg} alt="" />
      </div>
    </>
  )
}

export default Error;