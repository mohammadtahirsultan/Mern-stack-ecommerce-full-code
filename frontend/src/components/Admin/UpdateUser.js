import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, userDetail } from "../../redux/actions/user";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { Email } from "@material-ui/icons";
import { FaUser, FaUserAlt } from "react-icons/fa";
import { Button } from "@material-ui/core";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.userDetail);
  const { message, error: updateError } = useSelector(
    (state) => state.updateUser
  );

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const params = useParams();
  const updateUserHandler = async (e) => {
    e.preventDefault();

    await dispatch(updateUser(params.id, name, email, role));
  };

  useEffect(() => {
    if (user && user._id !== params.id) {
      dispatch(userDetail(params.id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/admin/users");
    }
    if (updateError) {
      toast.error(updateError);
      dispatch({ type: "clearError" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error,params.id, message,user, updateError, navigate]);

  return (
    <>
      <MetaData title="Update User --ECOMMERCE-MERN" />

      <div className="dashboard">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className="newProductContainer">
            <form className="createProductForm" onSubmit={updateUserHandler}>
              <h2 style={{ fontFamily: "Roboto" }}>Update User Details</h2>
              <div>
                <FaUser />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Email />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <FaUserAlt />
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Choose Role</option>
                  <option>user</option>
                  <option>admin</option>
                </select>
              </div>
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Update
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateUser;
