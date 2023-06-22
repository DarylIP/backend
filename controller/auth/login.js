import query from "../../db/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const TOKEN_SECRET = "09f26e402586e2faa8da4c98a35f1b20d6b033c60";

const generateAccessToken = (userData) => {
  return jwt.sign(userData, TOKEN_SECRET, { expiresIn: "1800s" });
};

const login = async (req, res) => {
  const body = req.body;

  // query database for user by email then compare the password
  try {
    const user = await query(
      "SELECT * FROM users WHERE username=$1 OR email=$1",
      [body.identifier]
    ).then((res) => {
      if (res.rowCount > 0) {
        return res.rows[0];
      } else {
        throw res;
      }
    });

    // decrypt the hash from DB and compare encrypt using pkg bcrypt
    bcrypt.compare(body.password, user.password, (error, bcryptRes) => {
      if (bcryptRes) {
        const token = generateAccessToken({
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.is_admin,
        }); //this method is to ensure only keluar user id, username & email. lagi selamat when checking private route after login

        const serverRes = {
          message: "Login Successfull",
          data: user,
          jwt: token,
        };
        res.status(200).json(serverRes);
      } else {
        const serverRes = {
          message: "Login Unsuccessfull",
          error: "Invalid Credential",
          data: error,
        };
        res.status(200).json(serverRes);
      }
    });
  } catch (error) {
    const serverRes = {
      message: "Invalid Request",
      error: "Invalid Indentifier",
    };
    res.status(403).json(serverRes);
  }
};

export default login;
