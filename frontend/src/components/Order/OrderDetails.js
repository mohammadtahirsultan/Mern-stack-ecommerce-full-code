import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Typography } from "@material-ui/core";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { orderDetail } from "../../redux/actions/order";
import "./orderDetails.css";
const OrderDetails = () => {
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const params = useParams();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    dispatch(orderDetail(params.id));
  }, [error, dispatch, params.id]);
  return (
    <>
      <MetaData title={`Order Details --ECOMMERCE-MERN`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <Typography component={"h1"}>
              Order #{order && order._id}
            </Typography>
            <Typography>Shipping Info</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name:</p>
                <span>{order.user && order.user.name}</span>
              </div>

              <div>
                <p>Phone:</p>
                <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
              </div>

              <div>
                <p>Address:</p>
                <span>
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                </span>
              </div>
            </div>

            <Typography>Payment</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "Paid"
                    : "Not Paid"}
                </p>
              </div>

              <div>
                <p>Amount:</p>
                <span>{order.total && order.total}</span>
              </div>
            </div>

            <Typography>Order Status</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.orderStatus && order.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.id}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X ₹{item.price} = 
                        <b> ₹{item.price * item.quantity}</b>
                      </span> 
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
