const express = require("express");
const cors = require('cors');
const { sequelize, properties, Admins } = require("./models");
const { json, Op} = require("sequelize");


const app = express();

app.use(express.json())
app.use(cors({origin: "http://localhost:5173"}));


app.post("/api/admins", async (req, res) => {
  const { Name, email, contact, assignedProperties } = req.body;

  let recentlyAddedId;

  try {

    recentlyAddedId = await Admins.create({ Name, email, contact });

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Failure to post the data, error in details",
      status: "Fail",
    });
  }

  try {
    await properties.update({admin_id : recentlyAddedId.dataValues.uuid }, {
      where: {
        name : {
          [Op.in] : assignedProperties
        }
      }
    });
    
    return res.json({
      message: "Admin Successfully added",
      status: "Success", 
    })
  } catch(err) {
    return res.status(400).json({
        message: "Failure to post the data, error in property selection",
        status: "Fail",
      });
  }
});


app.get("/api/admins", async (req, res) => {

  try {
    const adminData = await Admins.findAll({
      include: [
        {
          model:properties,
        }
      ]
    });

    return res.json({
      admin_data : adminData,
      message: "Data Loaded Successfully",
      status: "Success",
    });
  }
  catch(err) {
    return res.status(400).json({
      message: "Failure to load admin data",
      status: "Fail",
    });
  }

});

app.get("/api/admins/search", (req, res) => {
  return res.json("adminRegistration");
});


app.get("/api/properties/:fetchType", async (req, res) => {

  try {
    if(req.params.fetchType==="all") {
        const Properties_data = await properties.findAll();
        return res.json({
          properties_data: Properties_data,
          message: "Data fetched successfully",
          status: "Success",
        });
    }
    else if(req.params.fetchType==="unadmin") {
        const Properties_data = await properties.findAll({
            where: {
                admin_id: null
            }
        });
        return res.json({
          properties_data: Properties_data,
          message: "Data fetched successfully",
          status: "Success",
        });
    }
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
