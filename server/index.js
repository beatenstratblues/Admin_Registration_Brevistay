const express = require("express");
const cors = require('cors');
const { sequelize } = require("./models");
const adminRouter = require('./routes/admins');
const propertyRouter = require('./routes/properties');


const app = express();

//middlewares

app.use(express.json())
app.use(cors({origin: "http://localhost:5173"}));


//routes

app.use('/api/admins', adminRouter);
app.use('/api/properties', propertyRouter);


app.listen(8000, async () => {
  console.log("Server Successfully connneted!!");
  await sequelize.authenticate();
  console.log("database connected!!");
});
