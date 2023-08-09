import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  { products: [] },
  {
    loadProductsRequest: (state) => {
      state.loading = true;
    },
    loadProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.resultPerPage = action.payload.resultPerPage;
      state.productCount = action.payload.productCount;
      state.filterProductsCount = action.payload.filterProductsCount;
    },
    loadProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminProductsRequest: (state) => {
      state.loading = true;
    },
    adminProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
    },
    adminProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);

export const adminProductsReducer = createReducer(
  { products: [] },
  {
    adminProductsRequest: (state) => {
      state.loading = true;
    },
    adminProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
    },
    adminProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);

export const addProductReducer = createReducer(
  { product: {} },
  {
    createProductRequest: (state) => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.product = action.payload.product;
    },
    createProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);


export const deleteProductReducer = createReducer(
  {  },
  {
    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);


export const updateProductReducer = createReducer(
  {  },
  {
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);

export const productDetailsReducer = createReducer(
  { product: {} },
  {
    productDetailRequest: (state) => {
      state.loading = true;
    },
    productDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    },
    productDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);

export const newReviewReducer = createReducer(
  { state: {} },
  {
    newReviewRequest: (state) => {
      state.loading = true;
    },
    newReviewSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    newReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);


export const getAllReviewsReducer = createReducer(
  { reviews : [] },
  {
    getAllReviewsRequest: (state) => {
      state.loading = true;
    },
    getAllReviewsSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload.reviews;
    },
    getAllReviewsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);


export const deleteReviewReducer = createReducer(
  { review : {} },
  {
    deleteReviewRequest: (state) => {
      state.loading = true;
    },
    deleteReviewSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);
