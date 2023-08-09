import axios from "axios";
import { server } from "../store";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const { data } = await axios.get(`${server}/user/profile`, {
      withCredentials: true,
    });

    dispatch({
      type: "loadUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginUserRequest",
    });

    const { data } = await axios.post(
      `${server}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "loginUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "loginUserFail",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutUserRequest",
    });

    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: "logoutUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "logoutUserFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "allUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/all`, {
      withCredentials: true,
    });

    dispatch({
      type: "allUsersSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "allUsersFail",
      payload: error.response.data.message,
    });
  }
};

export const userDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userDetailRequest",
    });

    const { data } = await axios.get(`${server}/user/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "userDetailSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "userDetailFail",
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (id, name, email, role) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${server}/user/${id}`,
      { name, email, role },
      config
    );

    dispatch({
      type: "updateUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "updateUserFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserRequest",
    });

    const { data } = await axios.delete(`${server}/user/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteUserFail",
      payload: error.response.data.message,
    });
  }
};

export const signUp = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "signUpRequest",
    });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/user/register`,
      formData,
      config
    );

    dispatch({
      type: "signUpSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "signUpFail",
      payload: error.response.data.message,
    });
  }
};

export const updateUserProfile = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/user/profile/update`,
      formData,
      config
    );

    dispatch({
      type: "updateProfileSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message, 
    });
  }
};

export const updateUserPassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${server}/user/password/update`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        config
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFail",
        payload: error.response.data.message,
      });
    }
  };

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/user/forgotpassword`,
      { email },
      config
    );

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFail",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "resetPasswordRequest",
      });

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${server}/user/password/reset/${token}`,
        { password, confirmPassword },
        config
      );

      dispatch({
        type: "resetPasswordSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "resetPasswordFail",
        payload: error.response.data.message,
      });
    }
  };
