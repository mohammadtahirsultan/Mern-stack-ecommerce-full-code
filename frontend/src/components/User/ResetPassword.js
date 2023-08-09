import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadUser, resetPassword } from "../../redux/actions/user";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { LockOpen, VpnKey } from "@material-ui/icons";
import "./ResetPassword.css";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.reset);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword(params.token, password, confirmPassword));
    toast.success("Password Reset Successfully");
    dispatch(loadUser());
    return navigate("/login");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [error, navigate, dispatch]);
  return (
    <>
      <MetaData title={"Reset Password --ECOMMERCE-MERN"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Reset Password </h2>
            <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
              <div className="resetPassword">
                <VpnKey />
                <input
                  type="password"
                  placeholder="New Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="resetPassword">
                <LockOpen />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <input
                type="submit"
                value={"Continue"}
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
