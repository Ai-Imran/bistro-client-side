import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth;
}
useAuth.propTypes = {
    
};

export default useAuth;