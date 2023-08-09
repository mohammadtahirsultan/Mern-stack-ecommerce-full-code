import React from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { adminOrders } from "../../redux/actions/order";
import { getAllUsers } from "../../redux/actions/user";
import { adminProducts } from "../../redux/actions/product";
import Loader from "../layout/Loader/Loader";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { productsCount, products, error, loading } = useSelector(
    (state) => state.adminProducts
  );
  const { ordersCount, totalAmount } = useSelector((state) => state.adminOrder);
  const { usersCount } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    dispatch(adminOrders());
    dispatch(adminProducts());
    dispatch(getAllUsers());
  }, [dispatch, error]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        data: [0, totalAmount],
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        data: [outOfStock, products.length - outOfStock],
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
      },
    ],
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="dashboardContainer">
            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount <br /> ₹{totalAmount && totalAmount}
                </p>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                  <p>Product</p>
                  <p>{productsCount && productsCount}</p>
                </Link>
                <Link to="/admin/orders">
                  <p>Orders</p>
                  <p>{ordersCount && ordersCount}</p>
                </Link>
                <Link to="/admin/users">
                  <p>Users</p>
                  <p>{usersCount}</p>
                </Link>
              </div>
            </div>

            <div className="lineChart">
              <Line data={lineState} />
            </div>

            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
