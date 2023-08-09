import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
const Profile = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate,isAuthenticated]);

  return (
    <>
      <MetaData title={`${user.name}'s Profile --ECOMMERCE-MERN`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="profileContainer">
          <div>
            <h1>My Profile</h1>
            <img src={user.image.url} alt={user.name} />
            <Link to={"/update/profile"}>Edit Profile</Link>
          </div>
          <div>
            <div>
              <p>Full Name</p>
              <h4>{user.name}</h4>
            </div>
            <div>
              <p>Email</p>
              <h4>{user.email}</h4>
            </div>
            <div>
              <p>Joined On</p>
              <h4>{String(user.createdAt).substr(0, 10)}</h4>
            </div>
            <div>
              <Link to={"/orders"}>Orders</Link>
              <Link to={"/password/update"}>Change Password</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
