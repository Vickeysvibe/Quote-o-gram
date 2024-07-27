import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import createToken from "../utils/createToken.js";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

import { profilePictures } from "../utils/profilePics.js";

function getRandomProfilePicture() {
  const randomIndex = Math.floor(Math.random() * profilePictures.length);
  return profilePictures[randomIndex];
}

// Example usage

//Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, description } = req.body;
    console.log(name, email, password);
    //check if the user already exusts
    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const randomProfilePic = getRandomProfilePicture();
    const user = new User({
      name,
      email,
      password: hash,
      profilePic: randomProfilePic,
      description,
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(res, user._id);
      res.status(200).send({ token, user });
    } else {
      res.status(401).send("Wrong password");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
