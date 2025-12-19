/* eslint-disable react/prop-types */
//import React from 'react'
import logo from '../../../assets/bg2.png';
import comingSoonImg from '../../../assets/bg1.png';
const ComingSoon = ({ open }) => {
 if (!open) return null;

  return (
    <div className="modal_overlay"  >
      <div className="modal_content"  style={{
    backgroundImage: `url(${logo})`,
  }}>
         {/* Overlay Image */}
        <img
          src={comingSoonImg}
          alt="Coming Soon"
          className="coming_soon_img"
        />
     

      
      </div>
    </div>
  )
}

export default ComingSoon