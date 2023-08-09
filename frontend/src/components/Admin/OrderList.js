import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit } from "@material-ui/icons";
import { adminOrders, deleteOrder } from "../../redux/actions/order";
import "./productList.css";
import Sidebar from "./Sidebar";
const OrderList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { loading, error, orders } = useSelector((state) => state.adminOrder);
  const { message, error: deleteError } = useSelector(
    (state) => state.deleteOrder
  );

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>

            <Button
              onClick={() =>
                dispatch(deleteOrder(params.getValue(params.id, "id")))
              }
            >
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) =>
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.total,
      })
    );

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/dashboard");
    }

    if (deleteError) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    dispatch(adminOrders());
  }, [error, dispatch, message, deleteError, navigate]);

  return (
    <>
      <MetaData title={`All Orders --ECOMMERCE-MERN`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL Orders</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderList;
