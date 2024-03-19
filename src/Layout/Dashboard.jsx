import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaListUl,
  
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  // TODO: get isAdmin value form the dataBase
  const [isAdmin] = useAdmin();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-[#D1A054]">
        <ul className="menu uppercase font-bold">
          {isAdmin ? (
            <>
              <li>
                <Link to={"/dashboard/adminHome"}>
                  <FaHome></FaHome>
                  Admin Home
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/addItems"}>
                  <FaUtensils></FaUtensils>
                  add items
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/manageItems"}>
                  <FaListUl></FaListUl>
                  manage items
                </Link>
              </li>

              <li>
                <Link to={"/dashboard/manageBookings"}>
                  <FaBook></FaBook>
                  manage booking
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/users"}>
                  <FaUsers></FaUsers>
                  all users
                </Link>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
          {/* shared or common nablink */}
          <div className="divider w-3/4 mx-auto divider-secondary"></div>
          <li>
            <Link to={"/"}>
              <FaHome></FaHome>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/order/salad"}>
            <BsList />
              menu
            </Link>
          </li>
          <li>
            <Link to={"/order/salad"}>
              <FaShoppingBag></FaShoppingBag>
              shop
            </Link>
          </li>
          <li>
            <Link to={"/contact"}>
              <FaEnvelope></FaEnvelope>
              Contact
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
