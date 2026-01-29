import User from "../models/user-schema.js";
import {
  getSaltAndHashFromString,
  createJwtTokenForUser,
} from "../utilities/utilities.js";

export const getAllUsers = (req, res) => {
  res.json({ message: "GET ALL USERS" });
};

export const createNewUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists.");
    }
    const { salt, hashedKeys } = getSaltAndHashFromString("", password);
    const addedUser = await User.insertOne({
      name,
      email,
      salt,
      password: hashedKeys,
    });
    res.status(201).json({
      message: "User created successfully.",
      user: { id: addedUser._id },
    });
  } catch (err) {
    // res.status(401).json({ err });
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("User does not exist.");
    }
    const { salt, hashedKeys } = getSaltAndHashFromString(
      existingUser.salt,
      password,
    );
    if (hashedKeys !== existingUser.password) {
      throw new Error("Incorrect username or password.");
    }

    const jwtToken = createJwtTokenForUser(existingUser);

    return res
      .status(200)
      .send({ message: "Signed in successfully", token: jwtToken });
  } catch (err) {
    next(err);
  }
};
