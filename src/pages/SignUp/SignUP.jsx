import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


const SignUP = () => {
    
    const {
       register,
       handleSubmit,
       
       formState: { errors },
     } = useForm()
     const onSubmit = (data) => {
        console.log(data)
     }
    //  console.log(watch("example"))
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center w-3/12 lg:text-left">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })}  name="name" placeholder="Your name" className="input input-bordered" required />
                {errors.name && <span>Name field cannot be empty</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email")} name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", { required: true,minLength: 4, maxLength: 20 })} name="password" placeholder="password" className="input input-bordered" required />
                {errors.password && <span>This field is required</span>}

              </div>
              <div className="form-control mt-6">
              <input className="btn bg-[#D1A054] border-none" type="submit" value="Signup" />
            </div>
            </form>
          <p><small>Have Account <Link to={'/login'}>Login</Link></small></p>

          </div>
        </div>
      </div>
    );
};

SignUP.propTypes = {
    
};

export default SignUP;