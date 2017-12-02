const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const calculate = require("math-expression-interpretter").default;

const ACT = {
  ADD: 1,
  C: 2,
  CE: 3,
  FETCHING: 4,
  FETCHED: 5,
  ERROR: 6,
};

app.use(express.static("build"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

server.listen(4200);

io.on("connection", (client) => {
  client.on("message", (message) => {
    let result;

    message = message || "";

    try {
      result = {
        type: ACT.FETCHED,
        payload: calculate(message),
      };
    } catch (e) {
      result = {
        type: ACT.ERROR,
        payload: e.message
      };
    }

    result = JSON.stringify(result);

    client.send(result);
  });

  client.on("error", () => {
    console.log("An error has been occurred.");
  });

  client.on("disconnect", () => {
    console.log("The connection has been closed.");
  });

  client.on("connect", () => {
    console.log("The connection has been established.");
  });
});