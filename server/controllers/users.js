import UserModel from '../models/UserModel.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = "test";

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { email, password, name } = req.body; 
    try {
      const oldUser = await UserModel.findOne({ email });
  
      if (oldUser) {
        return res.status(400).json({ message: "Email is already taken" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await UserModel.create({
        email,
        password: hashedPassword,
        name, // Use `name` directly
      });
      const token = jwt.sign({ email: result.email, id: result._id }, secret, {
        expiresIn: "365d",
      });
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.error(error);
    }
  };
  