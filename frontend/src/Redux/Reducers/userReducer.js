import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  GET_LIST_OF_USERS_REQUEST,
  GET_LIST_OF_USERS_SUCCESS,
  GET_LIST_OF_USERS_FAIL,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,
} from "../Constants/UserConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

//REGISTER
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//USER DETAILS
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};
//UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Users list reducer
export const usersListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_LIST_OF_USERS_REQUEST:
      return { loading: true, users: [] };
    case GET_LIST_OF_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_LIST_OF_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// verify user reducer
export const verifyUserReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_USER_REQUEST:
      return { loading: true };
    case VERIFY_USER_SUCCESS:
      return { loading: false, success: true };
    case VERIFY_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
