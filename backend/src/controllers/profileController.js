import UserProfile from "../models/UserProfile.js";

// @desc    Get user extended profile
// @route   GET /api/profile
export const getUserProfile = async (req, res) => {
  try {
    let profile = await UserProfile.findOne({ userId: req.user.id });
    
    // If not exists, create an empty one
    if (!profile) {
      profile = new UserProfile({ userId: req.user.id });
      await profile.save();
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update user extended profile
// @route   PUT /api/profile
export const updateUserProfile = async (req, res) => {
  try {
    const { bio, address, dob } = req.body;
    
    let profile = await UserProfile.findOne({ userId: req.user.id });
    if (!profile) {
      profile = new UserProfile({ userId: req.user.id });
    }
    
    if (bio !== undefined) profile.bio = bio;
    if (address !== undefined) profile.address = address;
    if (dob !== undefined) profile.dob = dob;
    
    await profile.save();
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
