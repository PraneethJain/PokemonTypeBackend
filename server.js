require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
mongoose.set("strictQuery", false);
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected and listening on ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
