import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe,_id } = item;
  const { user } = useAuth();
  const navigate = useNavigate()
  const location = useLocation() 
  const axiosSecure = useAxiosSecure()
  const [,refetch] = useCart()


  const handleAddToCart = (food) => {
    // console.log(food,user.email);
    if (user && user.email) {
      // console.log(user.email,food);
      const cartItem = {
        menuId : _id,
        image,
        price,
        email: user.email,
        name
      }
      axiosSecure.post('/carts',cartItem)
      .then(res => {
        console.log(res.data);
        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} addedd successfuly`,
            showConfirmButton: false,
            timer: 1500
          });
          refetch()
        }
      })


    } else {
      Swal.fire({
        title: "You won't be able to login",
        text: "Plese login before add to Cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,I want to login",
        
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state:{from: location}})
        }
      });
    }
  };
  return (
    <div className="card bg-gray-300 rounded-none rounded-t">
      <figure>
        <img className="w-full" src={image} alt={name} />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
        ${price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-outline hover:bg-gray-400 bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
