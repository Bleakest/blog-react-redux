const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://test:123qwe@cluster.zobas.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });
