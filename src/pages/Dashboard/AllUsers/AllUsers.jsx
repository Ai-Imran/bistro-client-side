import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./user.css";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: "users",
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is Admin Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.status === 200) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "User not found.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            // Handle error
          });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users : {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-[#D1A054] w-full rounded-t-lg">
          {/* head */}
          <thead className="head bg-none">
            <tr className="bg-[#D1A054] head bg-none rounded-t-lg">
              <th className="bg-[#D1A054]"></th>
              <th className="bg-[#D1A054]">Name</th>
              <th className="bg-[#D1A054]">Email</th>
              <th className="bg-[#D1A054]">Role </th>
              <th className="bg-[#D1A054]">Action </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="bg-base-300 hover">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <FaUsers title="user"
                      onClick={() => handleMakeAdmin(user)}
                      className="bg-[#D1A054] w-12 h-12 p-2 text-white rounded-md"
                    ></FaUsers>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn bg-[#B91C1C] border-none"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
