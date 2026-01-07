


// const useRole = () => {
//     const axiosSecure = useAxiosSecure();
//     const {user} = useAuth();
//     const {isLoading, data: role = 'user' } = useQuery({
//         queryKey: ['user-role',user?. email],
//         queryFn: async()=>{
//          const res = await axiosSecure.get(`/users/${user.email}/role`);
//          return res.data;

//         }
//     })
//     return (role, isLoading);
// };

// export default useRole;


import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { isLoading, data: roleData } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data; // expect { role: "admin" } or { role: "user" }
        },
        enabled: !!user?.email // only fetch if user exists
    });

    return {
        role: roleData?.role || 'user',
        isLoading
    };
};
export default useRole;