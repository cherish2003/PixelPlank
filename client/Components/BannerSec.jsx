import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useContext,
} from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
// import { avatar } from "../public/avatar";
import { loginApi, registerApi } from "../Api/userApi";
import * as Toast from "@radix-ui/react-toast";
import { ResponseToast } from "./ResponseToast";
import { UserContext } from "../Context/UserProvider";
import { getUserdata } from "../Api/userApi";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BannerSec = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      Signuppage: SignupToggle,
      Loginpage: LoginToggle,
    };
  });
  const navigate = useNavigate();

  const [signinPage, setsigninPage] = useState(true);
  const [signinanimation, setsigninanimation] = useState(true);
  const [signinDisplay, setSigninDisplay] = useState(true);
  //By default sign in(login) is shown

  const [signupanimation, setSignupanimation] = useState(false);
  const [signupPage, setsignupPage] = useState(false);
  const [signupDisplay, setsignupDisplay] = useState(false);

  const [passHide, setPassHide] = useState(true);
  const [propic, setPropic] = useState(false);
  const [image, setImage] = useState(null);
  const [avatar, setavatar] = useState(null);

  //Api response
  const [responsemessage, setResponsemessage] = useState(null);
  const [Toast, setToast] = useState(false);

  //Login related
  const [loginvalue, setLoginvalue] = useState({ email: null, password: null });
  const [registerValue, setRegisterValue] = useState({
    username: null,
    email: null,
    password: null,
  });
  const { user, setUser } = useContext(UserContext);

  const theme = "darks";
  const lightForm = "LightForm";
  const darkform = "DarkForm";
  const Formstyle = theme === "dark" ? darkform : lightForm;

  //functions to handle form toggle animation
  //timeout are used to attain the desired animation
  const SignupToggle = () => {
    setsigninanimation(false);
    setTimeout(() => {
      setSigninDisplay(false);
      setsigninPage(false);
    }, 1000);
    setsignupDisplay(false);
    setsignupPage(true);
    setTimeout(() => {
      setsignupDisplay(true);
      setSignupanimation(true);
    }, 1200);
  };

  const LoginToggle = () => {
    setSignupanimation(false);
    setTimeout(() => {
      setsignupDisplay(false);
      setsignupPage(false);
    }, 1000);
    setSigninDisplay(false);
    setsigninPage(true);
    setTimeout(() => {
      setSigninDisplay(true);
      setsigninanimation(true);
    }, 1000);
  };

  const onImagechange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setavatar(e.target.files[0]);
    setPropic(true);
  };
  const ResfreshToken = async () => {
    const res = await getUserdata.get("");
    console.log(res);
  };

  const RegisterUser = async (encoded64Image) => {
    try {
      const response = await registerApi.post("", {
        email: registerValue.email,
        password: registerValue.password,
        username: registerValue.username,
        avatar: encoded64Image,
      });
      setResponsemessage(response.data.message);
      setToast(true);
    } catch (error) {
      setResponsemessage(error.response.data.message);
      setToast(true);
    }
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const fileLimit = 1024 * 1024 * 3;

    if (avatar && avatar.size > fileLimit) {
      setResponsemessage("Photo should within 3 mb");
      setToast(true);
      setPropic(false);
    } else if (
      !(registerValue.email && registerValue.password && registerValue.username)
    ) {
      setResponsemessage("All fields are required ");
      setToast(true);
      setPropic(false);
    } else {
      const imagereader = new FileReader();
      imagereader.readAsDataURL(avatar);
      console.log(avatar.size);
      imagereader.onloadend = () => {
        RegisterUser(imagereader.result);
      };
      console.log(imagereader);
    }
  };
  const loginUser = async () => {
    try {
      const response = await loginApi.post("", {
        email: loginvalue.email,
        password: loginvalue.password,
      });
      setResponsemessage(response.data.message);
      setUser(response.data.user);
      setToast(true);
      navigate(`/whiteboard/${user.username}`, { replace: true });
    } catch (error) {
      setResponsemessage(error.response.data.message);
      setToast(true);
    }
  };
  const handleloginSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {signinPage && (
        <div
          className={`h-[500px] sm:h-[500px] lg:h-1/2 ${
            !signinDisplay ? "hidden" : "flex"
          }  flex-col sm:flex-row `}
        >
          <motion.div
            className=" mt-10 sm:mt-5 w-full sm:w-3/5 md:w-1/2 pl-5 md:pl-10 h-full font-semibold text-6xl sm:text-7xl lg:text-8xl lg:p-10 xl:w-1/2 xl:text-[110px] tracking-tight flex justify-center flex-wrap items-center dark:text-white  "
            variants={{
              hidden: {
                opacity: 0,
                x: -125,
              },
              visible: { display: "flex", opacity: 1, x: 0 },
            }}
            animate={signinanimation ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            The only collaborative white board for all your needs
          </motion.div>
          <motion.div
            className=" flex items-center justify-center w-full sm:w-3/4 md:w-1/2 mt-10 sm:mt-5 "
            variants={{
              hidden: { opacity: 0, x: 120 },
              visible: { opacity: 1, x: 0 },
            }}
            animate={signinanimation ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={` flex rounded-2xl  p-5 items-center ${Formstyle}`}>
              <div className="px-4 md:px-5 lg:w-full lg:px-14 lg:py-10">
                <h2 className="font-bold text-2xl lg:text-3xl text-gray-80000 dark:text-white ">
                  Login
                </h2>

                <p className="text-xs mt-4 text-black dark:text-white">
                  If you are already a member, easily log in
                </p>
                {/* <button type="submit" onClick={ResfreshToken}>
                  click
                </button> */}

                <form
                  className="flex flex-col gap-4 mt-5"
                  onSubmit={(e) => {
                    handleloginSubmit(e);
                  }}
                >
                  <div className=" flex flex-col  mt-1 w-full">
                    <label
                      for="email"
                      class="text-sm font-medium text-gray-900 mb-3 w-full"
                    >
                      Email
                    </label>
                    <input
                      className="p-2 rounded-xl border"
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) =>
                        setLoginvalue((prevState) => ({
                          ...prevState,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="text-sm font-medium text-gray-900 w-full"
                    >
                      Password
                    </label>
                    <div className="relative">
                      {" "}
                      <input
                        className="p-2 rounded-xl border w-full mt-2"
                        type={passHide ? "password" : "text"}
                        name="password"
                        placeholder="Password"
                        onChange={(e) =>
                          setLoginvalue((prevState) => ({
                            ...prevState,
                            password: e.target.value,
                          }))
                        }
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-eye absolute top-[60%] right-3 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                          setPassHide(!passHide);
                        }}
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    // className="bg-custom-grey dark:bg-white rounded-xl text-white dark:text-custom-grey py-2 hover:scale-105 duration-300"
                    className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold  text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black]
                     dark:bg-custom-grey dark:text-white dark:border-white dark:hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                  >
                    Login
                  </button>
                </form>

                <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                  <hr className="border-gray-400" />
                  <p className="text-center text-sm">OR</p>
                  <hr className="border-gray-400" />
                </div>

                <div className="mt-3 text-xs flex justify-between items-center text-black dark:text-white">
                  <p>Don't have an account?</p>
                  <button
                    className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 dark:text-gun-mental"
                    onClick={() => props.signupclick()}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {signupPage && (
        <div
          className={`h-[500px] sm:h-[500px] lg:h-3/4 ${
            !signupDisplay ? "hidden" : "flex"
          }  flex-col sm:flex-row `}
        >
          <motion.div
            className=" mt-10 sm:mt-5 w-full sm:w-3/5 md:w-1/2 pl-5 md:pl-10 h-full font-semibold text-6xl sm:text-7xl lg:text-8xl lg:p-10 xl:w-1/2 xl:text-[100px] tracking-tight flex justify-center flex-wrap items-center dark:text-white  "
            variants={{
              hidden: { opacity: 0, x: -125 },
              visible: { opacity: 1, x: 0 },
            }}
            animate={signupanimation ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Unleash creativity through collaborative connectivity
          </motion.div>
          <motion.div
            className=" flex items-center justify-center w-full sm:w-3/4 md:w-1/2 mt-10 sm:mt-5 "
            variants={{
              hidden: { opacity: 0, x: 125 },
              visible: { opacity: 1, x: 0 },
            }}
            animate={signupanimation ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={` flex rounded-2xl p-2 items-center ${Formstyle}`}>
              <div className="px-8 md:px-5 lg:w-full lg:px-14 lg:py-10">
                <h2 className="font-bold text-2xl lg:text-3xl text-gray-80000 dark:text-white ">
                  Sign Up
                </h2>

                <form
                  className="flex flex-col gap-4 "
                  onSubmit={(e) => {
                    handleRegisterSubmit(e);
                  }}
                >
                  <div className=" flex flex-col justify-between mt-3">
                    <label
                      for="username"
                      class="text-sm font-medium text-gray-900 mb-3"
                    >
                      Username
                    </label>
                    <input
                      className="p-2 rounded-xl border"
                      type="text"
                      placeholder="Username"
                      onChange={(e) =>
                        setRegisterValue((prevState) => ({
                          ...prevState,
                          username: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className=" flex flex-col  w-full">
                    <label
                      for="email"
                      class="text-sm font-medium text-gray-900 mb-3 w-full"
                    >
                      Email
                    </label>
                    <input
                      className="p-2 rounded-xl border"
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) =>
                        setRegisterValue((prevState) => ({
                          ...prevState,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="text-sm font-medium text-gray-900 w-full"
                    >
                      Password
                    </label>
                    <div className="relative">
                      {" "}
                      <input
                        className="p-2 rounded-xl border w-full mt-2"
                        type={passHide ? "password" : "text"}
                        name="password"
                        placeholder="Password"
                        onChange={(e) =>
                          setRegisterValue((prevState) => ({
                            ...prevState,
                            password: e.target.value,
                          }))
                        }
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-eye absolute top-[60%] right-3 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                          setPassHide(!passHide);
                        }}
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="font-bold text-lg text-gray-80000 dark:text-white ">
                    Profile Picture
                  </div>
                  {propic ? (
                    <div className="flex justify-center items-cente relative">
                      <IoIosClose
                        size={20}
                        className="absolute right-5  cursor-pointer"
                        onClick={() => setPropic(false)}
                      />

                      <img
                        src={image}
                        className=" h-24 w-24 rounded-full  inset-0"
                        alt=""
                      />
                    </div>
                  ) : (
                    <div class="flex items-center w-full">
                      <label
                        for="dropzone-file"
                        class="flex  items-center justify-center h-20 w-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-slate-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center pt-2">
                          <img src={avatar} alt="" />
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          name="avatar"
                          type="file"
                          class="hidden"
                          accept="image/*"
                          onChange={onImagechange}
                        />
                      </label>
                    </div>
                  )}

                  <button
                    // className="bg-custom-grey dark:bg-white rounded-xl text-white dark:text-custom-grey py-2 hover:scale-105 duration-300"
                    className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold  text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black]
                     dark:bg-custom-grey dark:text-white dark:border-white dark:hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <ResponseToast
        response={responsemessage}
        Open={Toast}
        setToast={setToast}
      />
    </div>
  );
});
