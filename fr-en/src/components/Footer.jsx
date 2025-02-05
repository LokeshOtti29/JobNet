import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-4 mb-3">
            <h5 className="text-info">About Us</h5>
            <p>
              This platform is dedicated to connecting job seekers with their
              dream careers, providing the latest job openings and essential
              resources to support their job search.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="text-info">Follow Us</h5>
            <div className="d-flex">
              <a href="#" className="text-primary me-3">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-info me-3">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-primary me-3">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-dark">
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p className="text-muted">
            &copy; {new Date().getFullYear()} JobNet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
