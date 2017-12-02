import consts from "./const";
import store_calculator from "../storages/calculator"
import io from "socket.io-client";

const
ACT = consts.ACT,
socket = io.connect("ws://localhost:4200");

socket.on("message", (message) => {

  try {
    message = JSON.parse(message);
  } catch (e) {
    message = {
      type: ACT.ERROR,
      payload: "Server sent incorrect data.",
    };
  }

  store_calculator.dispatch({
    type: message.type,
    payload: message.payload,
  });
});

socket.on("error", () => {
  console.log("An error has been occurred.");
});

socket.on("disconnect", () => {
  console.log("The connection has been closed.");
});

socket.on("connect", () => {
  console.log("The connection has been established.");
});

export default socket;