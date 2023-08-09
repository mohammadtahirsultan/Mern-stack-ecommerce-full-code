import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser, updateUserProfile } from "../../redux/actions/user";
import { toast } from "react-hot-toast";
import { MailOutline } from "@material-ui/icons";
import "./UpdateProfile.css";
import { FaUser } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("/Profile.png");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { error, loading, message } = useSelector((state) => state.profile);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    if (image) {
      formData.append("image", image);
    }
    dispatch(updateUserProfile(formData));
  };

  const updateDataChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setImagePreview(user.image.url);
    }
    if (message) {
      toast.success(message);
      dispatch(loadUser());
      dispatch({ type: "clearMessage" });
      navigate("/account");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [error, navigate, dispatch, message, user]);

  return (
    <>
      <MetaData title={"Update Profile --ECOMMERCE-MERN"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile </h2>
            <form
              className="updateProfileForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="updateProfileName">
                <FaUser />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="updateProfileEmail">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div id="updateProfileImage">
                <img src={imagePreview} alt="User" />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={updateDataChange}
                />
              </div>

              <input
                type="submit"
                value={"Update Profile"}
                className="updateProfileBtn"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
