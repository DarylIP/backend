// the logout cant be done from server have to do it from clietn side

import jwt from "jsonwebtoken";

const logout = (req, res) => {
  const TOKEN_SECRET = "09f26e402586e2faa8da4c98a35f1b20d6b033c60";

  const authHeader = req.headers["authorization"];

  jwt.sign(req.user, TOKEN_SECRET, { espiresin: 1 }, (logout, err) => {
    if (logout) {
      res.status(200).json({ msg: "You have been Logged Out" });
    } else {
      res.status(500).json({ msg: "Error" });
    }
  });
};

export default logout;
