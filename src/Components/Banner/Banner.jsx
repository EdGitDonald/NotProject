import React from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAnalytics } from "react-icons/md";
import './Banner.css';

function Banner() {
  return (
    <div className='banner-container'>
      <div className='brand'>
        <p>FlowSpace</p>
      </div>
      <div className='navigation'>
        <MdOutlineAnalytics />
        <CgProfile />
        <IoSettingsSharp />
      </div>
    </div>
  );
}

export default Banner;
