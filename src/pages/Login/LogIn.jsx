import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect,useState, useRef, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';



const LogIn = () => {
    const captchaRef = useRef(null)
    const [disabled, setDisabled] = useState(true);
    const {signIn} = useContext(AuthContext)

    useEffect(() => {
        loadCaptchaEnginge(4); 
    }, []);


    const handleSubmit = e => {
        e.preventDefault()
        const from = e.target;
        const email = from.email.value;
        const password = from.password.value;
        const user = {email,password}
        console.log(user);
        signIn(email,password)
        .then(res => {
            console.log(res.user);

        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleCaptcha = () => {
        const user_captch_value = captchaRef.current.value;
        if(validateCaptcha(user_captch_value) === true){
            setDisabled(!disabled)
        } else{
            setDisabled(disabled)
        }
    }
  return (
    <div className="hero min-h-screen mx-auto bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center w-3/12 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
              <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                ref={captchaRef}
                name="captcha"
                placeholder="write captcha"
                className="input input-bordered"
                required
              />
              <button onClick={handleCaptcha}  className="btn w-3/12 mt-2 bg-red-800 btn-xs">Submit</button>
            </div>
            <div className="form-control mt-6">
              <input disabled={disabled} className="btn bg-[#D1A054] border-none" type="submit" value="Login" />
            </div>
          </form>
          <p><small>New Here? <Link to={'/signup'}>Create an Account</Link></small></p>
        </div>
      </div>
    </div>
  );
};

LogIn.propTypes = {};

export default LogIn;
