

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { MdAdminPanelSettings, MdOutlineRemoveModerator } from "react-icons/md";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ApproveTeacher = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  //  Get All Users
  const {
    data: users = [],
    isLoading,
   
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  //  Role Update Mutation
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}`, { role });
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (variables.role === "admin") {
        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "User is now Admin",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Admin role removed",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      //  Refetch users
      queryClient.invalidateQueries(["users"]);
      
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Approve Teachers / Admin Control ({users.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>{user.name || user.displayName || "N/A"}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-success"
                        : "badge-ghost"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="flex gap-2">
                  {/*  Make Admin */}
                  {user.role !== "admin" && (
                    <button
                      onClick={() =>
                        roleMutation.mutate({
                          id: user._id,
                          role: "admin",
                        })
                      }
                      className="btn btn-xs btn-success tooltip"
                      data-tip="Make Admin"
                    >
                      <MdAdminPanelSettings className="text-lg" />
                    </button>
                  )}

                  {/*  Remove Admin */}
                  {user.role === "admin" && (
                    <button
                      onClick={() =>
                        roleMutation.mutate({
                          id: user._id,
                          role: "user",
                        })
                      }
                      className="btn btn-xs btn-error tooltip"
                      data-tip="Remove Admin"
                    >
                      <MdOutlineRemoveModerator className="text-lg" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveTeacher;
