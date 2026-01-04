
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const StudentEntryForm = () => {
  const {
    register,
    handleSubmit,
      reset,
    formState: { errors },
  } = useForm();

  const axiousSecure = useAxiosSecure();


  // const onSubmit = (data) => {
  //   console.log("Student Data:", data);
  // };

const onSubmit = async (data) => {
  try {
    // show loading
    Swal.fire({
      title: "Saving student...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res = await axiousSecure.post("/students", data);

    if (res.data?.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Student Added Successfully",
        text: "Student information has been saved.",
        timer: 2000,
        showConfirmButton: false,
      });
        reset();
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Could not save student information.",
    });
  }
};




  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Student Entry Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Student Name */}
          <div>
            <label className="label font-semibold text-accent">Student Name</label>
            <input
              className="input input-bordered w-full"
              {...register("studentName", { required: true })}
              placeholder="Student Name"
            />
            {errors.studentName && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* Father Name */}
          <div>
            <label className="label font-semibold text-accent">Father's Name</label>
            <input
              className="input input-bordered w-full"
              {...register("fatherName", { required: true })}
              placeholder="Father Name"
            />
          </div>

          {/* Mother Name */}
          <div>
            <label className="label font-semibold text-accent">Mother's Name</label>
            <input
              className="input input-bordered w-full"
              {...register("motherName", { required: true })}
              placeholder="Mother Name"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label font-semibold text-accent">Gender</label>
            <select className="select select-bordered w-full" {...register("gender", { required: true })}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="label font-semibold text-accent">Age</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("age", { required: true })}
              placeholder="Age"
            />
          </div>

          {/* Guardian Contact */}
          <div>
            <label className="label font-semibold text-accent">Guardian Contact</label>
            <input
              type="tel"
              className="input input-bordered w-full"
              {...register("guardianContact", { required: true })}
              placeholder="01XXXXXXXXX"
            />
          </div>

          {/* Address */}
          <div className="lg:col-span-2 ">
            <label className="label font-semibold text-accent">Address</label>
            <input
              className="input input-bordered w-full"
              {...register("address", { required: true })}
              placeholder="Village, Post, Thana, District"
            />
          </div>

          {/* Class */}
          <div>
            <label className="label font-semibold text-accent">Class</label>
            <select className="select select-bordered w-full" {...register("class", { required: true })}>
              <option value="">Select Class</option>
              <option>Six</option>
              <option>Seven</option>
              <option>Eight</option>
              <option>Nine</option>
              <option>Ten</option>
              <option>Former Student</option>
            </select>
          </div>

          {/* Group */}
          <div>
            <label className="label font-semibold text-accent">Group</label>
            <select className="select select-bordered w-full" {...register("group", { required: true })}>
              <option value="">Select Group</option>
              <option>Science</option>
              <option>Business Studies</option>
              <option>Humanities</option>
            </select>
          </div>

          {/* SSC Batch */}
          <div>
            <label className="label font-semibold text-accent">SSC Batch</label>
            <input
              className="input input-bordered w-full"
              {...register("sscBatch", { required: true })}
              
            />
          </div>

          {/* Religion */}
          <div>
            <label className="label font-semibold text-accent">Religion</label>
            <select className="select select-bordered w-full" {...register("religion", { required: true })}>
              <option value="">Select Religion</option>
              <option>Islam</option>
              <option>Hindu</option>
              <option>Christian</option>
              <option>Buddhist</option>
            </select>
          </div>

          {/* Blood Group */}
          <div>
            <label className="label font-semibold text-accent">Blood Group</label>
            <select className="select select-bordered w-full" {...register("bloodGroup")}>
              <option value="">Select</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-3 text-center mt-6">
            <button className="btn btn-secondary px-10">
              Submit Student Info
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StudentEntryForm;
