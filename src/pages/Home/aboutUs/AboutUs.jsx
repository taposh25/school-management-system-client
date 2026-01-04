import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase mb-3">
              About Us
            </p>

            <h2 className="text-4xl font-bold text-base-content mb-6">
              Building Excellence Since 1943
            </h2>

            <p className="text-base-content/70 mb-4">
           The native or alternative name of the institute is <span className="text-blue-500">নবগ্রাম উচ্চ বিদ্যালয়</span>, often used in local Bengali language contexts. The unique Educational Institute Identification Number (EIIN) assigned to this institute is 110649, provided by the Directorate of Secondary and Higher Education. The institute was established on 01 January, 1943, marking the beginning of its educational journey.
            </p>

            <p className="text-base-content/70 mb-4">
            The institute is officially recognized by the relevant authorities as Recognized. The institute received official recognition on 01 January, 1962. It is recognized at the Secondary, indicating the level or grade of approval. The institute is included in the Monthly Pay Order (MPO) system at the Yes, determining government funding for teachers' salaries.
            </p>

            <p className="text-base-content/70 mb-6">
             The official registration number for the institute's inclusion in the MPO facility is 3501051302. It is categorized as a Secondary, such as a school, college, university, or vocational training center. The institute operates under the board of Dhaka, which governs academic standards and examinations. The disciplines offered by the institute include Science, Business Studies, Humanities, catering to various educational needs and academic streams. The institute is Combined, indicating whether it is coeducational or serves a single gender.
            </p>

            {/* FEATURES */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-primary text-lg" />
                <span>CBSE / State Board Affiliated</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-primary text-lg" />
                <span>Smart Classrooms</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-primary text-lg" />
                <span>Experienced Faculty</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-primary text-lg" />
                <span>Modern Infrastructure</span>
              </li>
            </ul>

            <button className="btn btn-primary">
              Learn More
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src="https://app.bd.education/images/nabagramhswebsite-images/slider-images/first_slider/2023/03/18/20230318-15265118-03-202315-51-31.jpg"
              alt="School Campus"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
