const db = require("../config/dbConnection");
const bcrypt = require("bcryptjs");

const getUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${hashedPassword}")`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ msg: "User created", user: { name, email, password: hashedPassword } });
    }
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM users WHERE id= ${id}`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};
