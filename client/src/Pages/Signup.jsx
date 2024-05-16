import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { isEmail, isValidPassword } from "../Helpers/regexMatcher";

import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [previewImage, setPreviewImage] = useState("");

    const [signupDetails, setSignupDetails] = useState({
        email: '',
        fullName: '',
        password: '',
        avatar: ''
    });

 

  function handleUserInput(e) {
    const {name, value} = e.target;
    setSignupDetails({
        ...signupDetails,
        [name]: value
    })

}

function handleImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if(!uploadedImage) return;
    setSignupDetails({
        ...signupDetails,
        avatar: uploadedImage
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
    })
}

async function onFormSubmit(e) {
    e.preventDefault();
    console.log(signupDetails);
    if(!signupDetails.email || !signupDetails.password || !signupDetails.fullName ) {
        toast.error("Please fill all the details");
        return;
    }

if(signupDetails.fullName.length < 5) {
    toast.error("Name should be atleast of 5 characters");
    return;
}
if(!isEmail(signupDetails.email)) {
    toast.error("Invalid email provided");
    return;
}
if(!isValidPassword(signupDetails.password)) {
    toast.error("Invalid password provided, password should 6-16 character long with atleast a number and a special character");
    return;
}

const formData = new FormData();
formData.append("fullName", signupDetails.fullName);
formData.append("email", signupDetails.email);
formData.append("password", signupDetails.password);
formData.append("avatar", signupDetails.avatar);

// dispatch create account action
const response =  dispatch(createAccount(formData));
console.log(response);
if(response?.payload?.data) {
  navigate("/");
}

setSignupDetails({
    email: '',
    fullName: '',
    password: '',
    avatar: ''
});
setPreviewImage("");
}
  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]  ">
        <form
            onSubmit={onFormSubmit}
             noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-75 shadow-[0_0_10px_black] "
        >
          <h1 className="text-2xl text-center font-bold">Registration Page</h1>

          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>

          <input
            onChange={handleImage}
            type="file"
            className="hidden"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold ">
              Name
            </label>
            <input
              onChange={handleUserInput}
              value={signupDetails.fullName}
              required
              type="text"
              name="fullName"
              className="bg-transparent px-2 py-1 border "
              placeholder="Enter your Username..."
              id="fullName"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={signupDetails.email}
              required
              type="text"
              name="email"
              className="bg-transparent px-2 py-1 border"
              placeholder="enter your Email..."
              id="email"
               
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              required
              onChange={handleUserInput}
              value={signupDetails.password}
              type="password"
              name="password"
              className="bg-transparent px-2 py-1 border"
              placeholder="enter your Password..."
              id="password"
            />
          </div>

          <button className="mt-2 bg-yellow-400 hover:bg-yellow-600 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg
          rounded-md
          ">
            Create account
          </button>
          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/login" className="cusror-pointer text-accent">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
