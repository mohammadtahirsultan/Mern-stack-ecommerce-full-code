import axios from "axios";
import { server } from "../store";

export const loadProducts =
  (keyword = "", currentPage = 1, price = [0, 50000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "loadProductsRequest",
      });

      let link = `${server}/product/all?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

      if (category) {
        link = `${server}/product/all?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({
        type: "loadProductsSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "loadProductsFail",
        payload: error.response.data.message,
      });
    }
  };

export const adminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/admin/products`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminProductsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "adminProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "productDetailRequest",
    });

    const { data } = await axios.get(`${server}/product/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "productDetailSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "productDetailFail",
      payload: error.response.data.message,
    });
  }
};

export const newReview = (id, rating, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "newReviewRequest",
    });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${server}/product/review`,
      { id, rating, comment },
      config
    );

    dispatch({
      type: "newReviewSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "newReviewFail",
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: "createProductRequest",
    });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/product/new`,
      productData,
      config
    );

    dispatch({
      type: "createProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "createProductFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(`${server}/product/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProductRequest",
    });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${server}/product/${id}`,
      formData,
      config
    );

    dispatch({
      type: "updateProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "updateProductFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllReviews = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllReviewsRequest",
    });

    const { data } = await axios.get(
      `${server}/product/reviews/all?productId=${productId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAllReviewsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllReviewsFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteReviewRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/review?productId=${productId}&id=${reviewId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteReviewSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteReviewFail",
      payload: error.response.data.message,
    });
  }
};
