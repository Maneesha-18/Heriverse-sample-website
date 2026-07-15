import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  entryFee: {
    type: String,
    default: "Free"
  },
  timings: {
    type: String,
    required: true
  },
  bestTime: {
    type: String,
    required: true
  },
  weather: {
    type: String,
    required: true
  },
  unesco: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  audio: {
    type: String,
    default: "Not Available"
  },
  googleMap: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Place = mongoose.model("Place", placeSchema);
export default Place;
