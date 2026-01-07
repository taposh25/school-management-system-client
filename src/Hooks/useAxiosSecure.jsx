import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';


const axiousSecure = axios.create({
    baseURL: 'http://localhost:3000'
})
const useAxiosSecure = () => {
  const {user, logOutUser} = useAuth();
  const navigate = useNavigate();
    useEffect(() => {
       const reqInceptor =  axiousSecure.interceptors.request.use((config) => {
           
                config.headers.Authorization = `Bearer ${user?.accessToken}`;
                return config;
        })

        const resInterceptor = axiousSecure.interceptors.response.use((response)=>{
            return response;
        },(error)=>{
            console.log(error);

            const statusCode = error.status;
            if(statusCode === 401 || statusCode === 403){
                 logOutUser()
                 .then(()=>{
                  navigate("/login");
                 })
            }

            return Promise.reject(error);
        })
        return () => {
         axiousSecure.interceptors.request.eject(reqInceptor);
         axiousSecure.interceptors.response.eject(resInterceptor);
        }


    }, [user, logOutUser, navigate]);

    return axiousSecure
};

export default useAxiosSecure;