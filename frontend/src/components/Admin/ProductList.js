import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { adminProducts, deleteProduct } from "../../redux/actions/product";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products,  loading,  } = useSelector(
    (state) => state.product
  );
  const { error, message } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 100, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 30,
      flex: 0.3,
    },
    {
      field: "reviews",
      headerName: "#Reviews",
      minWidth: 30,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      minWidth: 30,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.4,
      headerName: "Actions",
      minWidth: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        reviews:item.reviews.length,
        price: item.price,
        name: item.name,
      });
    });

  useEffect(() => {
    dispatch(adminProducts());
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, message, error]);
  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>

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
      )}
    </>
  );
};

export default ProductList;
