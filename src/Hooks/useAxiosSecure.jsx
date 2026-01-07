
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  // baseURL: 'https://school-management-application-serve.vercel.app',
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    // Response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status; 
        console.log(error);

        // if (statusCode === 401 || statusCode === 403) {
        //   logOutUser().then(() => navigate("/login"));
        // }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
