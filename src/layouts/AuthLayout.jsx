import React from 'react';
import Logo from '../components/Logo/Logo';
import image from "../assets/authImage.JPG";
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-6xl mx-auto '>
            <Link to="/"><Logo></Logo></Link>
           <div className='flex'>
            <div className='flex-1'>
                 <Outlet></Outlet>
            </div>
            <div className='flex-1'>
                <img className='h-full w-full' src={image} alt="" />
            </div>
           </div>
        </div>
    );
};

export default AuthLayout;