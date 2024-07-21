import User from "../models/user.js";

//get current user profile
export const currentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//get profile by id
export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.password = undefined;
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

//edit profile
export const editProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
