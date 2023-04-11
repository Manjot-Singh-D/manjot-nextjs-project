"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [showToast, setShowToast] = useState(false);
  const router = useMemo(() => useRouter());
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);
  const changeValue = (event) => {
    event.preventDefault();
    setUserDetails((userDetails) => {
      let newUserDetails = { ...userDetails };
      newUserDetails[event.target.name] = event.target.value;
      return newUserDetails;
    });
  };
  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://frontendtestapi.staging.fastjobs.io/auth/login",
        {
          ...userDetails,
        },
        { withCredentials: true }
      )
      .then(() => {
        router.push("/table");
      })
      .catch((err) => {
        console.log(err);
        setShowToast(true);
      });
  };
  const renderToast = () => {
    return (
      <div
        id="toast-danger"
        class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
        style={{
          width: "100%",
          position: "absolute",
          bottom: "20px",
          left: "20px",
        }}
      >
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Invalid username or password</div>
      </div>
    );
  };
  return (
    <div className="loginPage">
      {showToast && renderToast()}
      <div className="left">
        <div className="top">
          <Image
            alt="Icon"
            height={300}
            width={300}
            src="https://uploads-ssl.webflow.com/638f2dc8823d9afa49758b39/6396c69e08e3e681ca5a5074_Frame%202902.svg"
          ></Image>
        </div>
        <div className="bottom">
          <p>Congratulations!</p>
          <h2>Company XYZ is inviting you to take an interview</h2>
          <p>Skills being assessed:</p>
          <div className="buttonGroup">
            <button>UI/UX</button>
            <button>Product Design</button>
            <button>Motion Graphics</button>
          </div>
          <p>Don't be nervous</p>
        </div>
      </div>
      <div className="right">
        <h2>For us to stay in touch</h2>
        <form>
          <div className="inputField">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={userDetails.username}
              onChange={changeValue}
            />
          </div>
          <div className="inputField">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={changeValue}
            />
          </div>
          <button onClick={submitForm} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
