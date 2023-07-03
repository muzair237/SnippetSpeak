import React from 'react'
import '../CSS/Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaTelegramPlane, FaMedium } from 'react-icons/fa';

export default function Footer() {
  return (
    <>

      <div className="container-fluid footer pb-3 mt-1">
        <div className="row">
          <div className="col-4 footer-head">
            <Link style={{textDecoration:"none"}} to="/"><h4>SnippetSpeak</h4></Link>
          </div>
          <div className="col-4 iconDiv text-center">
            <Link to="#">
              <div className="round"><FaFacebookF /></div>
            </Link>
            <Link to="#">
              <div className="round"><FaLinkedinIn /></div>
            </Link>
            <Link to="#">
              <div className="round"><FaTelegramPlane /></div>
            </Link>
            <Link to="#">
              <div className="round"><FaMedium /></div>
            </Link>
          </div>
          <div className="col-4 text-light footerText text-end">
            <p style={{"fontWeight":"800"}}>Copyright © 2021 SNIPPETSPEAK. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </>
  )
}
