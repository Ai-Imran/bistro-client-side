import { createContext,useEffect,useId,useState  } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null)

const auth = getAuth(app);
const provider = new GoogleAuthProvider()
 

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth,provider);
    }

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name,photo) =>{
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }
    useEffect(() => {
      const unScribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser)
            // console.log( 'current user ' , currentUser);
            const userInfo = {email : currentUser?.email}
            console.log(userInfo);
            if(currentUser){
                axiosPublic.post('/jwt', userInfo)
                .then((res)=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })
            } else{
                localStorage.removeItem('access-token');
            }
            setLoading(false)
        })
        return () => {
            unScribe();
        }

    }, [axiosPublic]);

    
    

    const authInfo = {
        user,
        loading,
        googleSignIn,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    
};

export default AuthProvider;