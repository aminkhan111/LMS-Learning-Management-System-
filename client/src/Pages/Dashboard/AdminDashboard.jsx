import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

import { Pie, Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
// import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";

import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect } from "react";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedUsersCount } = useSelector(
    (state) => state.stat
  );

  const { allPayments,  monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    fontColor: "white",
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedUsersCount],
        backgroundColor: ["yellow", "green"],
        borderColor: ["yellow", "green"],
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: [
      "January",
      "Febraury",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  // getting the courses data from redux toolkit store
  const myCourses = useSelector((state) => state.course.courseData);

  // function to handle the course delete

  // const handleCourseDelete = async (id) => {
  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));

      // fetching the new updated data for the course
      if (res?.payload) {
        await dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-3xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>
        {/* creating the records card and chart for sales and user details */}
        <div className="grid grid-cols-2 gap-5 m-auto mx-10">
          {/* displaying the users chart and data */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            {/* for displaying the pie chart */}
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>
            {/* card for user data */}
            <div className="grid grid-cols-2 gap-5">
              {/* card for registered users */}
              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUsersCount || 0}</h3>
                </div>
                <FaUsers className="text-yellow-500 text-5xl" />
              </div>

              {/* card for enrolled users */}
              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">
                    {subscribedUsersCount || 0}
                  </h3>
                </div>
                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
          {/* displaying the sales chart and data */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            {/* for displaying the bar chart */}
            <div className="h-80 relative w-full">
              <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
            </div>

            {/* card for user data */}
            <div className="grid grid-cols-2 gap-5">
              {/* card for registered users */}
              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscriptions Count</p>
                  <h3 className="text-4xl font-bold  ">
                    {allPayments?.count || 0}
                  </h3>
                </div>
                <FcSalesPerformance className=" text-yellow-500 text-5xl " />
              </div>

              {/* card for enrolled users */}
              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {(allPayments?.count || 0) * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        {/* CRUD courses section */}
        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-3xl font-semibold">
              Courses Overview
            </h1>

            {/* add course card */}
            <button
              onClick={() => {
                navigate(
                  "/course/create"
                //   {
                //     state: {
                //       initialCourseData: {
                //         newCourse: true,
                //         title: "",
                //         category: "",
                //         createdBy: "",
                //         description: "",
                //         thumbnail: undefined,
                //         previewImage: "",
                //       },
                //     },}
                );
              }}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
            >
              Create New Course
            </button>
          </div>

          <table className="table overflow-x-scroll">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Course Title</th>
                <th>Course Category</th>
                <th>Instructor</th>
                <th>Total Lectures</th>
                <th>Course Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCourses?.map((course, idx) => {
                return (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>
                    
                    <td>
                      <textarea
                        readOnly
                        className="w-40 h-auto bg-transparent resize-none"
                        value={course?.title}
                      ></textarea>
                    </td>
                    <td>{course?.category}</td>
                    <td>{course?.createdBy}</td>
                    <td>{course?.numberOfLectures}</td>

                    <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                      <textarea
                        readOnly
                        className="w-80 h-auto bg-transparent resize-none"
                        value={ course?.description}
                      ></textarea>
                      
                    </td>

{/* to CRUD the lectures */}
<td className="flex item-center gap-4">
<button
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course },
                          })
                        }
                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-30 text-xl py-2 px-4  rounded-md font-bold"
                      >
                        <BsCollectionPlayFill />
                      </button>

{/* to delete the course */}
<button
                        onClick={() => onCourseDelete(course._id)}
                        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-30 text-xl py-2 px-4 rounded-md font-bold"
                      >
                        <BsTrash />
                      </button>

                      </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
