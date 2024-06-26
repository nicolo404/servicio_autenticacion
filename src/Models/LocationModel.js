import { Schema, model } from "mongoose";

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
});

export default model("Location", LocationSchema, "locations");
