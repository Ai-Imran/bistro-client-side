import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";


const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);

    const [cart] = useCart();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .then((err) => console.log(err));
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      <li>
        <Link to="/screct">Screct</Link>
      </li>
      <li>
        <Link to="/dashboard/cart">
          <button className="btn">
          <FaShoppingCart className="text-xl mr-2" />
            <div className="badge  badge-secondary">+${cart.length}</div>
          </button>
        </Link>
      </li>

      {user ? (
        <>
          <li className="mt-[13px] ">{user.displayName} </li>
          <button onClick={handleLogOut} className="btn btn-ghost">
            Sign out
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl  bg-black  text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu text-white bg-slate-700 uppercase menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu uppercase menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Get started</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
