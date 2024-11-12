const { properties, Admins } = require("../models");
const { Op } = require("sequelize");

async function emailValidation(email,req,res) {
  try {
    const email = await Admins.findOne({
      email,
    });

    if (email) {
      return res.status(400).json({
        message: "The Email is already in use",
        status: "Fail",
      });
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: "Email is in wrong format",
        status: "Fail",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Data base error",
      status: "Fail",
    });
  }
}

module.exports = { emailValidation };
