import consts from "./const";
import store_calculator from "../storages/calculator"
import {connect} from "socket.io-client";
import {iAction} from "./interface";

const
ACT = consts.ACT,
socket = connect("ws://localhost:4200");

socket.on("message", (message:string) => {
  let parsed:iAction;

  try {
    parsed = JSON.parse(message);
  } catch (e) {
    parsed = {
      type: ACT.ERROR,
      payload: "Server sent incorrect data.",
    };
  }

  store_calculator.dispatch({
    type: parsed.type,
    payload: parsed.payload,
  });
});

socket.on("error", () => {
  // console.log("An error has been occurred.");
});

socket.on("disconnect", () => {
  // console.log("The connection has been closed.");
});

socket.on("connect", () => {
  // console.log("The connection has been established.");
});

export default socket;