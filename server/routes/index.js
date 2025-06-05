const express = require("express");
const app = express();

const usersRoutes = require("./user-routes");
const paymentRoutes = require("./payment-routes");
const blogRoutes = require("./blog-routes");
const supportRoutes = require("./support-routes");

app.use("/users", usersRoutes);
app.use("/payment", paymentRoutes);
app.use("/blog", blogRoutes);
app.use("/entries", supportRoutes);

module.exports = app;
