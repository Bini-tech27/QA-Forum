import {
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
} from "./questionActionTypes";
const initialState = {
  data: [],
  loading: true,
  error: null,
};
const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Error fetching product data",
      };
    default:
      return state;
  }
};

export default questionReducer;
