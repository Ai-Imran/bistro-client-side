import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SicialLogIn = () => {
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const location = useLocation();
    const {googleSignIn} = useContext(AuthContext)

    const from = location.state?.from?.pathName || '/';

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(res => {
            const userInfo = {
                name : res.user?.displayName,
            email: res.user?.email
            }
            axiosPublic.post('/users',userInfo)
            .then(res => {
                navigate(from,{replace:true})

                if(res.data.insertedId){
                    console.log('success');
                }
            })
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="">
        {/* <div className="divider"></div> */}
      <div className="space-x-4 ">
        <button className="btn ">
          <FaFacebook></FaFacebook> 
        </button>
        <button onClick={handleGoogleSignIn} className="btn">
          <FaGoogle></FaGoogle> 
        </button>
        <button className="btn">
          <FaGithub></FaGithub>
        </button>
      </div>
    </div>
  );
};

export default SicialLogIn;
