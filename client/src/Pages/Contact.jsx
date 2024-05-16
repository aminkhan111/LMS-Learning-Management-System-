import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }
    if (!isEmail(userInput.email)) {
      toast.error("Invalid email provided");
      return;
    }
    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your query",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      console.log(contactResponse);
      if (contactResponse?.data) {
        setUserInput({
          email: "",
          name: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("operation failed....");
    }
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col items-center justify-center gap-2 p-5 w-[22rem] rounded-md text-white "
        >
          <h1 className="text-3xl font-semibold">Contact form</h1>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              id="name"
              className="bg-#ADD8E6 border px-2 py-1 rounded-sm text-white"
              type="text"
              placeholder="enter your name"
              name="name"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              id="email"
              className="bg-#ADD8E6 border px-2 py-1 rounded-sm text-white"
              type="email"
              placeholder="enter your email"
              name="email"
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              id="message"
              className="bg-#ADD8E6 border px-2 py-1 rounded-sm resize-none h-40 text-white"
              type="text"
              placeholder="enter your message"
              name="message"
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
