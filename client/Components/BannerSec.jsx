import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion } from "framer-motion";

export const BannerSec = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      Signuppage: SignupToggle,
      Loginpage: LoginToggle,
    };
  });
  const [signinPage, setsigninPage] = useState(true);
  const [signinanimation, setsigninanimation] = useState(true);
  const [signinDisplay, setSigninDisplay] = useState(true);
  //By default sign in(login) is shown

  const [signupanimation, setSignupanimation] = useState(false);
  const [signupPage, setsignupPage] = useState(false);
  const [signupDisplay, setsignupDisplay] = useState(false);

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

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {signinPage && (
        <div
          className={`h-[400px] sm:h-[500px] lg:h-1/2 ${
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
              <div className="px-4 md:px-5 lg:w-full lg:px-16 lg:py-10">
                <h2 className="font-bold text-2xl lg:text-3xl text-gray-80000 dark:text-white ">
                  Login
                </h2>
                <p className="text-xs mt-4 text-black dark:text-white">
                  If you are already a member, easily log in
                </p>

                <form action="" className="flex flex-col gap-4 ">
                  <input
                    className="p-2 mt-8 rounded-xl border"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <div className="relative">
                    <input
                      className="p-2 rounded-xl border w-full"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="gray"
                      className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
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

                <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-black">
                  <svg
                    className="mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="25px"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                  </svg>
                  Login with Google
                </button>

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
          className={`h-[400px] sm:h-[500px] lg:h-1/2 ${
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
            <div className={` flex rounded-2xl  p-5 items-center ${Formstyle}`}>
              <div className="px-8 md:px-5 lg:w-full lg:px-16 lg:py-10">
                <h2 className="font-bold text-2xl lg:text-3xl text-gray-80000 dark:text-white ">
                  Sign Up
                </h2>

                <form action="" className="flex flex-col gap-4 ">
                  <input
                    className="p-2 mt-8 rounded-xl border"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <div className="relative">
                    <input
                      className="p-2 rounded-xl border w-full"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="gray"
                      className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </div>
                  <button
                    // className="bg-custom-grey dark:bg-white rounded-xl text-white dark:text-custom-grey py-2 hover:scale-105 duration-300"
                    className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold  text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black]
                     dark:bg-custom-grey dark:text-white dark:border-white dark:hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                  >
                    Sign up
                  </button>
                </form>

                <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                  <hr className="border-gray-400" />
                  <p className="text-center text-sm">OR</p>
                  <hr className="border-gray-400" />
                </div>

                <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-black">
                  <svg
                    className="mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="25px"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                  </svg>
                  Sign up with Google
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
});
