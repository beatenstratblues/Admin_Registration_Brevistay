const { properties, Admins } = require("../models");
const { Op, where } = require("sequelize");

async function getAllAdminsData(req, res) {
  const { uuid } = req.query;
  console.log("api active");
  try {
    if (uuid === "all") {
      const adminData = await Admins.findAll({
        include: [
          {
            model: properties,
          },
        ],
      });

      return res.json({
        admin_data: adminData,
        message: "Data Loaded Successfully",
        status: "Success",
      });
    } else {
      const adminData = await Admins.findAll({
        where: {
          uuid,
        },
        include: [
          {
            model: properties,
          },
        ],
      });

      return res.json({
        admin_data: adminData,
        message: "Data Loaded Successfully",
        status: "Success",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Failure to load admin data",
      status: "Fail",
    });
  }
}

async function handleAdminRegistration(req, res) {
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
    await properties.update(
      { admin_id: recentlyAddedId.dataValues.uuid },
      {
        where: {
          name: {
            [Op.in]: assignedProperties,
          },
        },
      }
    );

    return res.json({
      message: "Admin Successfully added",
      status: "Success",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Failure to post the data, error in property selection",
      status: "Fail",
    });
  }
}

async function deletingRegisteredAdmin(req, res) {
  const uuid = req.params.id;

  try {
    await Admins.destroy({
      where: {
        uuid,
      },
    });

    await properties.update(
      {
        admin_id: null,
      },
      {
        where: {
          admin_id: uuid,
        },
      }
    );

    return res.json({
      message: "Record deleted successfully",
      status: "Success",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Failed to delete the record",
      status: "Fail",
    });
  }
}

async function updateAdminDetails(req, res) {
  const { uuid, Name, email, contact, updatedProperties } = req.body;

  try {
    await Admins.update(
      { Name, email, contact },
      {
        where: {
          uuid,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Failure to update the data, error in details",
      status: "Fail",
    });
  }

  try {
    await properties.update(
      { admin_id: null },
      {
        where: {
          admin_id: uuid,
        },
      }
    );

    await properties.update(
      { admin_id: uuid },
      {
        where: {
          name: {
            [Op.in]: updatedProperties,
          },
        },
      }
    );

    return res.json({
      message: "Admin Successfully Updated",
      status: "Success",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Failure to update the data, error in property selection",
      status: "Fail",
    });
  }
}

module.exports = {
  getAllAdminsData,
  handleAdminRegistration,
  deletingRegisteredAdmin,
  updateAdminDetails,
};
