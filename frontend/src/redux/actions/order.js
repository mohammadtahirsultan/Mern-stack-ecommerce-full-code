import axios from "axios";
import { server } from "../store";

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({
      type: "createOrderRequest",
    });

    const { data } = await axios.post(`${server}/order/new`, orderData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: "createOrderSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "createOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: "getMyOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/my`, {
      withCredentials: true,
    });

    dispatch({
      type: "getMyOrdersSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getMyOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const adminOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/all`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminOrdersSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "adminOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteOrderRequest",
    });

    const { data } = await axios.delete(`${server}/order/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteOrderSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: "updateOrderRequest",
    });

    const { data } = await axios.put(`${server}/order/${id}`, status, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: "updateOrderSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "updateOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const orderDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "orderDetailsRequest",
    });

    const { data } = await axios.get(`${server}/order/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "orderDetailsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "orderDetailsFail",
      payload: error.response.data.message,
    });
  }
};
