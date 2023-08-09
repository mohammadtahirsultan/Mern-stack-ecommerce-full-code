import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadUser,
  updateUserPassword,
} from "../../redux/actions/user";
import { toast } from "react-hot-toast";
import { LockOpen,Lock,VpnKey } from "@material-ui/icons";
import "./UpdatePassword.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import './UpdatePassword.css'
const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { error, loading, message, isUpdated } = useSelector(
    (state) => state.profile
  );

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    // const imageFile = e.target.elements.image.files[0];
    // dispatch(signUp(name, email, password, imageFile));
    // const formData = new FormData();
    // formData.set("name", name);
    // formData.set("email", email);
    // formData.set("password", password);

    console.log(oldPassword, newPassword, confirmPassword);
    dispatch(updateUserPassword(oldPassword,newPassword,confirmPassword));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: "updatePasswordReset" });
      return navigate("/account");
    }
  }, [error, isUpdated, navigate, dispatch, message]);
  return (
    <>
      <MetaData title={"Update Password --ECOMMERCE-MERN"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Password </h2>
            <form
              className="updatePasswordForm"
              onSubmit={updatePasswordSubmit}
            >
                 <div className="updatePassword">
                <VpnKey />
                <input
                  type="password"
                  placeholder="Old Password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
                 <div className="updatePassword">
                <LockOpen />
                <input
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
                 <div className="updatePassword">
                <Lock />
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
                value={"Update Password"}
                className="updatePasswordBtn"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
