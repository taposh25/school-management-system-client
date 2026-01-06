import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";

const AddTeacher = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await axiosSecure.post("/teachers", data);
    reset();
    alert("Teacher added successfully");
  };

  return (
    <div>
        <div>
        <NavLink to="/dashboard/teachers">
            <button
         className="btn btn-radial">Go Back
         
         </button>
        </NavLink>
    </div>
    
   <div>
     <form onSubmit={handleSubmit(onSubmit)} className="card p-6 bg-base-300 shadow-2xl space-y-4 flex items-center  ">
   
     {/* Teacher name */}
      <input 
      {...register("name")} 
      placeholder="Teacher Name" 
      className="input input-bordered"
       />
         {/* Teacher Department */}
      <input 
      {...register("department")} 
      placeholder="Department" 
      className="input input-bordered" 
      />
        {/* Teacher name */}
      <input 
      {...register("classes")} 
      placeholder="Classes (comma separated)" 
      className="input input-bordered"
       />
         {/* Teacher classes */}
      <input 
      {...register("phone")} 
      placeholder="Contact Number" 
      className="input input-bordered" 
      />
        {/* Teacher Email */}
      <input {...register("email")} 
      placeholder="Email" 
      className="input input-bordered" 
      />
        {/* Teacher Address */}
      <textarea 
      {...register("address")} 
      placeholder="Address"
       className="textarea textarea-bordered" 
       />

      <button className="btn btn-secondary w-full text-yellow-500 font-bold text-xl">Save Teacher</button>
    </form>
   </div>
    </div>
  );
};

export default AddTeacher;
