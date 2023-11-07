import React, { useEffect, useRef, useState } from "react";
import "./LoginSignUp.css";
import { MailOutline, LockOpen } from "@material-ui/icons";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, signUp } from "../../redux/actions/user";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
const LoginSignUp = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [image, setimage] = useState("/Profile.png");
  const [imagePreview, setimagePreview] = useState("/Profile.png");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, message } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const signUpTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      signUpTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      signUpTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const signUpSubmit = (e) => {
    e.preventDefault();

    // const imageFile = e.target.elements.image.files[0];
    // dispatch(signUp(name, email, password, imageFile));

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("image", image); // set the image file

    dispatch(signUp(formData));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setimagePreview(reader.result);
          setimage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [error, message, dispatch]);

  if (isAuthenticated) {
    navigate("/account");
    return null; 
  }
  return (
    <>
      <MetaData title={"LOGIN-SIGNUP --ECOMMERCE-MERN"} />
      <div className="LoginSignUpContainer">
        {loading ? (
          <Loader />
        ) : (
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTab(e, "login")}>Login</p>
                <p onClick={(e) => switchTab(e, "register")}>Register</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" onSubmit={loginSubmit} ref={loginTab}>
              <div className="loginEmail">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="loginPassword">
                <LockOpen />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Link to="/forgotpassword">Forgot Password</Link>
              <input
                type="submit"
                value={"Login"}
                className="loginBtn"
                disabled={loading ? true : false}
              />
            </form>

            {/* SignUp Form  */}
            <form
              className="signUpForm"
              ref={signUpTab}
              encType="multipart/form-data"
              onSubmit={signUpSubmit}
            >
              <div className="signUpName">
                <FaUser />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                  required
                />
              </div>
              <div className="signUpEmail">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                  required
                />
              </div>
              <div className="signUpPassword">
                <LockOpen />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                  required
                />
              </div>

              <div id="registerImage">
                <img src={imagePreview} alt="User" />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>

              <input type="submit" value={"Sign Up"} className="signUpBtn" />
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginSignUp;
