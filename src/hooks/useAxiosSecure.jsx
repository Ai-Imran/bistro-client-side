import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
});
const useAxiosSecure = () => {
   const navigate = useNavigate();
   const {logOut} = useAuth()

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('access-token')
      console.log("sttoped interceptors",token);
      config.headers.authorization = `Bearer ${token}`
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

//   intercepts 401 and 403 status
axiosSecure.interceptors.response.use(function(response){
   return response;
},  async (error) => {
   // Do something with request error
   const status = error.response.status;
   console.log('m error', status);
   if(status === 401 ||  status === 403){

      await logOut();
      navigate('/login')
   }
   return Promise.reject(error);

 })
  return axiosSecure;
};

useAxiosSecure.propTypes = {};

export default useAxiosSecure;
