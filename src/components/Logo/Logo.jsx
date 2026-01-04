import React from 'react';
import logo from "./../../assets/logo.png";
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
           <Link to="/"> <img className='h-16 w-20' src={logo} alt="Logo" /></Link>
            
        </div>
    );
};

export default Logo;