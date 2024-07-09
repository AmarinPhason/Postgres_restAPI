const express = require("express");
const router = require("./routes/route");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/students", router);

app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}/api/v1/students`
  );
});
