import axios from "axios";
import {
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
} from "./questionActionTypes";
import { IpAddress } from "../IpAddress";

export const fetchQuestionSuccess = (questionData) => {
  return {
    type: FETCH_QUESTION_SUCCESS,
    payload: questionData,
  };
};

export const fetchQuestionFailure = (error) => {
  return {
    type: FETCH_QUESTION_FAILURE,
    payload: error,
  };
};

export const fetchQuestionData = () => {
  return (dispatch) => {
      const token = localStorage.getItem("user");
    axios
      .get(`${IpAddress}/all-questions`,{
     headers: {
       Authorization: "Bearer " + JSON.parse(token).token,
     }},)
      .then((response) => {
        const questionData = response.data;

        dispatch(fetchQuestionSuccess(questionData));
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        dispatch(fetchQuestionFailure(error.message));
      });
  };
};

