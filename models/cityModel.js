const mongoose = require("mongoose");
const { Schema } = mongoose;

const citySchema = new Schema({
  name: {
    type: String,
    required: [true, "name field is required"],
    unique: true,
  },
  country: { type: String, required: [true, "country field is required"] },
  population: {
    type: Number,
    required: [true, "population field is required"],
  },
  isCapital: { type: Boolean, default: false },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
