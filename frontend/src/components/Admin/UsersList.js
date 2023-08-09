import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit } from "@material-ui/icons";
import "./productList.css";
import Sidebar from "./Sidebar";
import { deleteUser, getAllUsers } from "../../redux/actions/user";

const UsersList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { loading, error, users } = useSelector((state) => state.allUsers);
 
  const { message: deleteMessage, error: deleteError } = useSelector(
    (state) => state.deleteUser
  );
  const { message: updateMessage, error: updateError } = useSelector(
    (state) => state.updateUser
  );

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 100,
      flex: 0.21,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.2,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 60,
      flex: 0.12,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 60,
      sortable: false,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>

            <Button
              onClick={() =>
                dispatch(deleteUser(params.getValue(params.id, "id")))
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

  users &&
    users.forEach((user) =>
      rows.push({
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      })
    );

  useEffect(() => {
    if (deleteMessage) {
      toast.success(deleteMessage);
      dispatch({ type: "clearMessage" });
    }
    if (updateMessage) {
      toast.success(updateMessage);
      dispatch({ type: "clearMessage" });
    }

    if (updateError) {
      toast.error(updateError);
      dispatch({ type: "clearError" });
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch({ type: "clearError" });
    }

    dispatch(getAllUsers());
  }, [
    error,
    dispatch,
    updateError,
    updateMessage,
    deleteMessage,
    deleteError,
    navigate,
  ]);

  return (
    <>
      <MetaData title={`All Users --ECOMMERCE-MERN`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL Users</h1>

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

export default UsersList;
