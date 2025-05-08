import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import "./Footer.css";
import footerlogo from '../../assets/FooterLogo.png';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left-container">
          <div className="footer-left-wrapper">
            <div className="footer-left">
              <img
                src={footerlogo}
                className="styleslogo" 
                alt="Footer Logo"
              />
              <div className="footer-contact">
                <p>University of Engineering and Technology - VNU</p>
                <p>
                  <span className="footer-icon">📍</span> Xuan Thuy, Cau Giay, Ha Noi
                </p>
                <p>
                  <span className="footer-icon">📞</span> 0909 123 456 &nbsp; 
                  <span className="footer-icon">📧</span> support@abc.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <div className="footer-social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook style={{ color: "#fff" }} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter style={{ color: "#fff" }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram style={{ color: "#fff" }} />
          </a>
          <a href="mailto:support@abc.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope style={{ color: "#fff" }} />
          </a>
        </div>
      </div>
    </footer>
  );
};
