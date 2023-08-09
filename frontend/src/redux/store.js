import { configureStore } from "@reduxjs/toolkit";
import {
  addProductReducer,
  adminProductsReducer,
  deleteProductReducer,
  deleteReviewReducer,
  getAllReviewsReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  updateProductReducer,
} from "./reducers/product";
import {
  allUsersReducer,
  deleteUserReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  updateProfileReducer,
  updateUserReducer,
  userDetailReducer,
  userReducer,
} from "./reducers/user";
import { cartReducer } from "./reducers/cart";
import {
  adminOrdersReducer,
  deleteOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  orderReducer,
  updateOrderReducer,
} from "./reducers/order";

const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailsReducer,
    user: userReducer,
    profile: updateProfileReducer,
    forgot: forgotPasswordReducer,
    reset: resetPasswordReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    adminOrder: adminOrdersReducer,
    allUsers: allUsersReducer,
    adminProducts: adminProductsReducer,
    newProduct: addProductReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer,
    deleteOrder: deleteOrderReducer,
    updateOrder: updateOrderReducer,
    userDetail: userDetailReducer,
    updateUser:updateUserReducer,
    deleteUser:deleteUserReducer,
    getAllReviews:getAllReviewsReducer,
    deleteReview:deleteReviewReducer
  },
});

export default store;
// https://ecommerce-mern-beryl.vercel.app
export const server = "https://ecommerce-mern-beryl.vercel.app/api/v1";
// export const server = "http://localhost:4000/api/v1";
