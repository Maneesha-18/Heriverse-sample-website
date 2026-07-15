import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: {
    type: String,
    trim: true,
    default: ""
  },
  address: {
    type: String,
    trim: true,
    default: ""
  },
  dob: {
    type: Date
  }
}, {
  timestamps: true
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
