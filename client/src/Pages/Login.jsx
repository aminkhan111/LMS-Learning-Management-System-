import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
 
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";


// import { isEmail, isValidPassword } from "../Helpers/regexMatcher";

import { login } from "../Redux/Slices/AuthSlice";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

  

    const [loginData, setloginData] = useState({
        email: '',
        
        password: '',
         
    });

 

  function handleUserInput(e) {
    const {name, value} = e.target;
    setloginData({
        ...loginData,
        [name]: value
    })

}

 

async function onLogin(e) {
    e.preventDefault();
    
    if(!loginData.email || !loginData.password  ) {
        toast.error("Please fill all the details");
        return;
    }

// dispatch create account action
const response = await dispatch(login(loginData));
console.log(response);
if(response?.payload?.data?.success){
  // Redirect to home page
  navigate("/");
  // Reload the page
  window.location.reload();
}  
  setloginData({
    email: '',
    password: '', 
});

 
 
}
  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]  ">
        <form
            onSubmit={onLogin}
             noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-75 shadow-[0_0_10px_black] "
        >
          <h1 className="text-2xl text-center font-bold">Login Page</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={loginData.email}
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
              value={loginData.password}
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
            Login
          </button>
          <p className="text-center">
            Don't have an account ?{" "}
            <Link to="/signup" className="cusror-pointer text-accent">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
