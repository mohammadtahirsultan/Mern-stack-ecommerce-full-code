import React from "react";
import "./orderSuccess.css";
import { CheckCircle } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
const OrderSuccess = () => {
  return (
    <>
      <MetaData title={`Order Success --ECOMMERCE-MERN`} />
      <div className="orderSuccess">
        <CheckCircle />
        <Typography>Your Order Has Been Placed Successfully</Typography>
        <Link to={"/orders"}>View Orders</Link>
      </div>
    </>
  );
};

export default OrderSuccess;
