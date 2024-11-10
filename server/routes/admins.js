const express = require("express");
const { properties, Admins } = require("../models");
const { Op } = require("sequelize");
const { getAllAdminsData, handleAdminRegistration, deletingRegisteredAdmin } = require("../controllers/admins");

const adminRouter = express.Router();

adminRouter.post("/", handleAdminRegistration);

adminRouter.get("/", getAllAdminsData);

adminRouter.delete("/:id", deletingRegisteredAdmin);

adminRouter.get("/search", (req, res) => {
  return res.json("adminRegistration");
});

module.exports = adminRouter;
