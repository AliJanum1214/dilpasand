const express = require("express");
const app = express();

const usersRoutes = require("./user-routes");
const paymentRoutes = require("./payment-routes");
const blogRoutes = require("./blog-routes");
const supportRoutes = require("./support-routes");

// ------------ health-check endpoint ------------
app.get("/monitor", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(), // handy for debugging
  });
});
// -----------------------------------------------

app.use("/users", usersRoutes);
app.use("/payment", paymentRoutes);
app.use("/blog", blogRoutes);
app.use("/entries", supportRoutes);

module.exports = app;
