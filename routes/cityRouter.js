const express = require("express");
const mongoose = require("mongoose");
const City = require("../models/cityModel");
const cityRouter = express.Router();
const _ = require("lodash");

cityRouter.post("/", async (req, res) => {
  try {
    let city = await City.create(req.body);
    res
      .status(200)
      .send({ success: true, message: "City Created", city: city });
  } catch (error) {
    res.status(400);
    res.send({ success: false, message: error.message });
  }
});

cityRouter.get("/", async (req, res) => {
  try {
    let cities = await City.find({});
    res
      .status(200)
      .send({ success: true, message: "All Cities Fetched", city: cities });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// cityRouter.get("/:id?", async (req, res) => {
//   try {
//     let city = await City.findById(req.params.id);
//     res
//       .status(200)
//       .send({ success: true, message: "City Fetched", city: city });
//   } catch (error) {
//     res.status(400).send({ success: false, message: error.message });
//   }
// });

// cityRouter.get("/:name?", async (req, res) => {
//   try {
//     let { name } = req.params;
//     let city = await City.findOne({ name });
//     if (!city) {
//       return res
//         .status(404)
//         .send({ success: false, message: "City not found!" });
//     }
//     res
//       .status(200)
//       .send({ success: true, message: "City Fetched", city: city });
//   } catch (error) {
//     res.status(400).send({ success: false, message: error.message });
//   }
// });

cityRouter.get("/:identifier", async (req, res) => {
  try {
    let { identifier } = req.params;
    let city;

    if (isNaN(+identifier[0]) === false) {
      if (mongoose.Types.ObjectId.isValid(identifier)) {
        console.log(`\n@@INFO: VALID ID ${identifier}`);
        city = await City.findById(identifier);
      }
    } else {
      let regulatedIdentifier = _.capitalize(identifier);
      console.log(`\n@@INFO: VALID NAME ${regulatedIdentifier}`);

      city = await City.findOne({ name: regulatedIdentifier });
    }

    if (!city) {
      return res
        .status(404)
        .send({ success: false, message: "City not found!" });
    }

    res
      .status(200)
      .send({ success: true, message: "City Fetched", city: city });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

cityRouter.put("/", async (req, res) => {
  try {
    let { id } = req.body;
    if (!id) {
      return res
        .status(404)
        .send({ success: false, message: "Id field is required!" });
    }
    let city = await City.findByIdAndUpdate(id, req.body);
    if (!city) {
      return res
        .status(404)
        .send({ success: false, message: "City not found!" });
    }
    res
      .status(200)
      .send({ success: true, message: "City Updated", city: city });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

cityRouter.delete("/", async (req, res) => {
  try {
    let { id } = req.body;
    let city = await City.findByIdAndDelete(id);
    if (!city) {
      return res
        .status(404)
        .send({ success: false, message: "City not found!" });
    }
    res
      .status(200)
      .send({ success: true, message: "City Deleted", city: city });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = { cityRouter };
