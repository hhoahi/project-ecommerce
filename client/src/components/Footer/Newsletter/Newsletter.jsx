import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from 'react-icons/fa';
import "./Newsletter.scss";
const Newsletter = () => {
    const facebookLink = 'https://www.w3schools.com/js/'
    const TwitterLink = 'https://www.w3schools.com/js/'
    const InstagramLink = 'https://www.w3schools.com/js/'
    const InLink = 'https://www.w3schools.com/js/'
    return <div className='newsletter-secton'>
        <div className='newsletter-content'>
            <span className='small-text'>Newsletter</span>
            <span className='big-text'>
                Sign up for latest updates and offers
            </span>
            <div className='form'>
                <input type='text' placeholder="Email Address" />
                <button>Subscribe</button>
            </div>
            <div className='text'>Will be used in accordance with our Privacy Policy</div>
            <div className='social-icons'>
                <div className='icon'>
                    <a href={facebookLink} target="_blank" rel="noopener noreferrer">
                     <FaFacebookF size={14} />
                    </a>
                </div>
                <div className='icon'>
                    <a>
                    <FaTwitter size={14} />
                    </a>
                </div>
                <div className='icon'>
                    <a>
                    <FaInstagram size={14} />
                    </a>
                </div>
                <div className='icon'>
                    <a>
                    <FaLinkedinIn size={14} />
                    </a>
                </div>
            </div>
        </div>
    </div>;
};

export default Newsletter;
