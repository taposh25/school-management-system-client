import React from 'react';
import Banner from '../Banner/Banner';
import AboutUs from '../aboutUs/aboutUs';

const Home = () => {
    return (
        <div className='mt-5 mb-5'>
            <Banner></Banner>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;