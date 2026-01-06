import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';


const axiousSecure = axios.create({
    baseURL: 'http://localhost:3000'
})
const useAxiosSecure = () => {
  const {user} = useAuth();
    useEffect(() => {
        axiousSecure.interceptors.request.use((config) => {
           
                config.headers.Authorization = `Bearer ${user?.accessToken}`;
                return config;
        })
    }, [user]);

    return axiousSecure
};

export default useAxiosSecure;