import React from "react";
import { FaLinkedinIn, FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { AiFillGithub, AiOutlineTwitter, AiFillFacebook } from "react-icons/ai";

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <div className="flex flex-col items-center justify-center gap-4 mb-3">
        <div className="flex items-center justify-center gap-2">
          <FaPhone size={24} className="text-blue-600 rotate-90" />
          <a href="tel:0397923904" className="text-blue-600 hover:underline">
            (+84) 397 923 904
          </a>
        </div>
        <div className="flex items-center justify-center gap-2">
          <IoMail size={24} className="text-blue-600" />
          <a
            href="mailto:anhminh.dev@gmail.com"
            className="text-blue-600 hover:underline"
          >
            anhminh.dev@gmail.com
          </a>
        </div>
      </div>
      <ul className="home-about-social-links">
        <li className="social-icons">
          <a
            href="https://github.com/vamnguyen"
            target="_blank"
            rel="noreferrer"
            className="icon-colour  home-social-icons"
          >
            <AiFillGithub />
          </a>
        </li>
        <li className="social-icons">
          <a
            href="https://twitter.com/anhminhdev"
            target="_blank"
            rel="noreferrer"
            className="icon-colour  home-social-icons"
          >
            <AiOutlineTwitter />
          </a>
        </li>
        <li className="social-icons">
          <a
            href="https://www.linkedin.com/in/vamnguyen/"
            target="_blank"
            rel="noreferrer"
            className="icon-colour  home-social-icons"
          >
            <FaLinkedinIn />
          </a>
        </li>
        <li className="social-icons">
          <a
            href="https://www.facebook.com/wcnvam.dev"
            target="_blank"
            rel="noreferrer"
            className="icon-colour home-social-icons"
          >
            <AiFillFacebook />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
