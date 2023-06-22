import { validationResult } from "express-validator";
import query from "../../db/index.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  // if no validation error baru kita execute this DB query

  try {
    const body = req.body;

    // hash password is benda something we can not recognise and others can not recognise
    // decrypt usingpkg bcrypt
    const salt = bcrypt.genSaltSync(10); //this one menentukan kebalan of the encryption
    const hashedPassword = bcrypt.hashSync(body.password, salt); //for hashing password or encrypting the password registered
    const dbRes = await query(
      "INSERT INTO users (email, username, password, is_admin) VALUES ($1, $2, $3, $4)",
      [body.email, body.username, hashedPassword, body.isAdmin]
    );

    const serverRes = {
      message: "A user created",
    };
    res.status(200).json(serverRes);
  } catch (error) {
    const { name, table, constraint, detail } = error;
    const serverRes = {
      message: detail,
      error: { name, table, constraint },
    };
    res.status(500).json(serverRes);
  }
};

export default register;
