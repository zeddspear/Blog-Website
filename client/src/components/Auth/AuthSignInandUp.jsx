import { useState } from "react";
import { API } from "../../service/api";
import { useContext } from "react";
import { DataContext } from "../../context/GlobalData";
import { useNavigate } from "react-router-dom";

function AuthSignInandUp() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [errors, setErrors] = useState([]);

  const { setGdata } = useContext(DataContext);

  const Navigate = useNavigate();

  const toggleSignInandSignUp = () => {
    setIsLogIn((prev) => !prev);
    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";
  };

  const formSubmitSignUp = (e) => {
    e.preventDefault();

    let whichAuth = "signup";

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData);

    sendRequestToServer(user, whichAuth);

    e.currentTarget.reset();
  };

  const sendRequestToServer = async (user, whichAuth) => {
    if (whichAuth === "signup") {
      try {
        // For sign up
        let response = await API.adminSignup(user);
        if (response.isSuccess) {
          setIsLogIn((prev) => !prev);
        }
      } catch (error) {
        if (error.isError) {
          setErrors(error.data);
        }
      }
    } else {
      // For sign in
      try {
        const response = await API.adminSignin(user);

        sessionStorage.setItem(
          "AccessToken",
          `Bearer ${response.data.AccessToken}`
        );
        sessionStorage.setItem(
          "RefreshToken",
          `Bearer ${response.data.RefreshToken}`
        );

        setGdata({
          fullname: response.data.name,
          email: response.data.email,
          adminID: response.data.adminID,
        });

        Navigate("/admin");
      } catch (error) {
        if (error.isError) {
          if (Array.isArray(error.data)) {
            setErrors(error.data);
          } else {
            let errorArray = [];
            errorArray.push(error.data);
            setErrors(errorArray);
          }
        }
      }
    }
  };

  const formSubmitSignIn = (e) => {
    e.preventDefault();

    let whichAuth = "signin";

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData);

    sendRequestToServer(user, whichAuth);

    e.currentTarget.reset();
  };

  return (
    <>
      <div className="container rounded-xl px-5 py-8 sm:w-1/2 md:w-1/3 lg:w-1/4 mt-32 shadow-md relative z-20 bg-primaryMain">
        <h1 className="logo text-5xl text-tertiaryMain text-center mt-2 mb-14">
          BlogHub
        </h1>
        {isLogIn ? (
          <div className="signin-container flex flex-col justify-center items-center">
            <form
              className="w-full flex flex-col justify-center items-center gap-10 px-3 my-3"
              onSubmit={formSubmitSignIn}
            >
              <input
                className="border-b w-full outline-none px-1"
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                required
              />
              <input
                className="border-b w-full outline-none px-1"
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                required
              />
              {errors.length > 0 ? (
                <div>
                  {errors.map((err, idx) => {
                    return (
                      <p key={idx} className="text-md text-red-700">
                        {err.msg}
                      </p>
                    );
                  })}
                </div>
              ) : null}
              <button type="submit" className="btn text-white bg-surface">
                Sign In
              </button>
            </form>
            <p className="text-[12px] text-gray-500">OR</p>
            <button
              className="my-3 btn  bg-tertiaryMain text-white"
              onClick={toggleSignInandSignUp}
            >
              Create an account
            </button>
          </div>
        ) : (
          <div className="signup-container flex flex-col justify-center items-center">
            <form
              className="w-full flex flex-col justify-center items-center gap-10 px-3 my-3"
              onSubmit={formSubmitSignUp}
            >
              <input
                className="border-b w-full outline-none px-1"
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Enter First Name"
                required
              />
              <input
                className="border-b w-full outline-none px-1"
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Enter Last Name"
                required
              />
              <input
                className="border-b w-full outline-none px-1"
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                required
              />
              <input
                className="border-b w-full outline-none px-1"
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                required
              />
              {errors.length > 0 ? (
                <div>
                  {errors.map((err, idx) => {
                    return (
                      <p key={idx} className="text-md text-red-700">
                        {err.msg}
                      </p>
                    );
                  })}
                </div>
              ) : null}
              <button type="submit" className="btn  text-white bg-surface">
                Sign Up
              </button>
            </form>
            <p className="text-[12px] text-gray-500">OR</p>
            <button
              className="my-3 btn  bg-tertiaryMain text-white"
              onClick={toggleSignInandSignUp}
            >
              Already have an account?
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AuthSignInandUp;
