const express = require("express");
const { sequelize, properties, Admins } = require("./models");
const { json } = require("sequelize");

const app = express();
app.use(express.json())

app.post("/api/admins", async (req, res) => {
  const { Name, email, contact } = req.body;
  try {
    await Admins.create({ Name, email, contact });
    return res.json({
      message: "Data posted successfully",
      status: "Success",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Failure to post the data",
      status: "Fail",
    });
  }
});

app.get("/api/admins", (req, res) => {
  return res.json("adminRegistration");
});

app.get("/api/admins/search", (req, res) => {
  return res.json("adminRegistration");
});

app.get("/api/properties", async (req, res) => {
  try {
    const Properties_data = await properties.findAll();
    return res.json({
      properties_data: Properties_data,
      message: "Data fetched successfully",
      status: "Success",
    });
  } catch (err) {
    return (
      res.status(400),
      json({
        message: "Failure to fetch the data",
        status: "Fail",
      })
    );
  }
});

app.listen(8000, async () => {
  console.log("Server Successfully connneted!!");
  await sequelize.authenticate();
  console.log("database connected!!");
});