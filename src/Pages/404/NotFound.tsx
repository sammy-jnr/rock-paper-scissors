import React from 'react';
import './NotFound.css';
import pageNotFoundIcon from "../../Assets/Images/404Icon.png"

const NotFound: React.FC = () => {
  return (
    <div className='notFoundContainer'>
      <img src={pageNotFoundIcon} alt="" className='pageNotFoundIcon'/>

      <h1>This page does not exist.</h1>
      <p>We're sorry, but the page you're looking for could not be found.</p>
      <button>Back to home</button>
    </div>
  );
};

export default NotFound;
