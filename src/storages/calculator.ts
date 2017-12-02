import {createStore} from "redux";
import reducer_calculator from "../reducers/calculator.ts";

const store_calculator = createStore(reducer_calculator, {
  fetching: false,
  fetched: false,
  error: null,
  value: "",
});

export default store_calculator;