import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/actions/user";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { MailOutline } from "@material-ui/icons";
import './ForgotPassword.css'
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { message, loading, error } = useSelector((state) => state.forgot);

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      return navigate("/");
    }
    if (error) {
      toast.error(error);
    }

  }, [error, navigate, dispatch, message]);
  return (
    <>
      <MetaData title={"Forgot Password --ECOMMERCE-MERN"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password </h2>
            <form
              className="forgotPasswordForm"
              onSubmit={forgotPasswordSubmit}
            >
              <div className="forgotPasswordEmail">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <input
                type="submit"
                value={"Continue"}
                className="forgotPasswordBtn"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
