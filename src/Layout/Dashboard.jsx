import { FaAd, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart()
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-[#D1A054]">
        <ul className="menu uppercase font-bold">
          <li>
            <Link to={"/dashboard/userHome"}>
              <FaHome></FaHome>
              Admin Home
            </Link>
          </li>
          <li>
            <Link to={"/dashboard/reservation"}>
              <FaCalendar></FaCalendar>
             Reservation
            </Link>
          </li>
          <li>
            <Link to={"/dashboard/cart"}>
              <FaShoppingCart className=""></FaShoppingCart>
              My Cart {cart.length}
            </Link>
          </li>
          <li>
            <Link to={"/dashboard/review"}>
                <FaAd></FaAd>
              add review
            </Link>
          </li>
          <li>
            <Link to={"/dashboard/bookings"}>
                <FaList></FaList>
              my booking
            </Link>
          </li>
          <div className="divider w-3/4 mx-auto divider-secondary"></div>
          <li>
            <Link to={"/"}>
              <FaHome></FaHome>
               Home
            </Link>
          </li>
          <li>
            <Link to={"/order/salad"}>
              <FaSearch></FaSearch>
               menu
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
