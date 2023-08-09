import React, { useEffect, useState } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListAlt from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Backdrop } from "@material-ui/core";
import "./Header.css";
import { logoutUser } from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
const UserOptions = ({user}) => {
  const dispatch = useDispatch();

  const { message, error } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const actions = [
    { icon: <PersonIcon />, name: "Account", func: Person },
    { icon: <ListAlt />, name: "Orders", func: Orders },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: Cart,
    },
    { icon: <ExitToApp />, name: "Logout", func: Logout },
  ];

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  if (user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: Dashboard,
    });
  }

  function Dashboard() {
    navigate("/dashboard");
  }
  function Person() {
    navigate("/account");
  }
  function Orders() {
    navigate("/orders");
  }
  function Cart() {
    navigate("/cart");
  }
  function Logout() {
    dispatch(logoutUser());
    navigate("/login");
  }

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, message, error]);
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user && user.image.url ? user.image.url : "/Profile.png"}
            alt="Profile"
          />
        }
        style={{ zIndex: "11" }}
        direction="down"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
