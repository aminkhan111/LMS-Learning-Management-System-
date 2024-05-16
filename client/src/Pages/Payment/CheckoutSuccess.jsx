import { Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiFillCheckCircle } from "react-icons/ai";

function CheckoutSuccess() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-green-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment successful
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <h2 className="text-lg font-semibold">Welcome to pro bundle</h2>
            <p className="text-left">Now enjoy all premium content</p>
          </div>

          <AiFillCheckCircle className="text-5xl text-green-500 mt-2" />

          <Link
            to="/"
            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-center rounded-br-lg rounded-bl-lg"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutSuccess;
