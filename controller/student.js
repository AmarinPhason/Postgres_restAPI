const pool = require("../db/db");

const getAllStudent = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM student");
    const allStudentsResponse = await pool.query(
      "SELECT * FROM student ORDER BY id ASC"
    );
    if (response.rows.length == 0) {
      return res.status(404).json("No student found");
    }
    res.status(200).json(allStudentsResponse.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM student WHERE id = $1", [
      req.params.id,
    ]);
    if (response.rows.length == 0) {
      return res.status(404).json("No student found");
    }
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, email, age, dob } = req.body;

    if (!name || !email || !age || !dob) {
      throw new Error("All fields are required");
    }
    // if email already exists, throw error
    const emailExists = await pool.query(
      "SELECT * FROM student WHERE email = $1",
      [email]
    );
    if (emailExists.rows.length > 0) {
      throw new Error("Email already exists");
    }

    const response = await pool.query(
      "INSERT INTO student (name, email,age,dob) VALUES ($1, $2,$3,$4) RETURNING *",
      [name, email, age, dob]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, dob } = req.body;
    const response = await pool.query(
      "UPDATE student SET name = $1, email = $2,age = $3,dob = $4 WHERE id = $5 RETURNING *",
      [name, email, age, dob, id]
    );

    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    // if id not found, throw error
    const checkID = await pool.query("SELECT * FROM student WHERE id = $1", [
      id,
    ]);
    if (checkID.rows.length == 0) {
      return res.status(404).json("No student found");
    } else {
      await pool.query("DELETE FROM student WHERE id = $1", [id]);
    }
    res.status(200).json(`Student ${id} deleted successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAllStudent = async (req, res) => {
  try {
    const response = await pool.query("DELETE FROM student");
    res.status(200).json("All students deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStudent,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  deleteAllStudent,
};
