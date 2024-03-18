import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const SignUP = () => {
  const {createUser,updateUserProfile} = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email,data.password,data.photoURL)
    .then(res => {
      updateUserProfile(data.name,data.photoURL)
      .then(() => {
       console.log('profile updated');
       Swal.fire({
        title: "Profile update successfully",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate('/')
       reset();
      }).catch((error) => {
        console.log(error);
      });
      console.log(res.user);
    })
    .then(err => {
      console.log(err);
    })


    reset();

  };
  //  console.log(watch("example"))
  return (
    <>
      <Helmet>
        <title>Bistro || SignUP</title>
      </Helmet>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center w-3/12 lg:text-left">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Your name"
                  className="input input-bordered"
                  required
                />
                {errors.name && (
                  <span className="text-red-500">
                    Name field cannot be empty
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  name="photoURL"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
                {errors.photoURL && (
                  <span className="text-red-500">
                    Photo URL field cannot be empty
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
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
                  {...register("password", {
                    required: true,
                    minLength: 4,
                    maxLength: 12,
                    pattern: /[0-9]/,
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-500" role="alert">
                    {" "}
                    maximum 12 carectors
                  </p>
                )}
                {errors.password && (
                  <span className="text-red-500">
                    At least 4 cahrector and a Number
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-[#D1A054] border-none"
                  type="submit"
                  value="Signup"
                />
              </div>
            </form>
            <p>
              <small>
                Have Account <Link to={"/login"}>Login</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

SignUP.propTypes = {};

export default SignUP;
