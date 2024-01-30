import { combineReducers } from "redux";
import questionReducer from "./questionReducer";

const rootReducer = combineReducers({
  questionReducer: questionReducer,
});

export default rootReducer;
