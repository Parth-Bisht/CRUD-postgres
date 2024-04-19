const pool = require("../db");
const queries = require("./queries");

const getStudents = async (req, res) => {
  pool.query(queries.getStudents, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const getStudentById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const addStudent = async (req, res) => {
  const { name, email, age, dob } = req.body;
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      return res.send("Email already exists.");
    }

    pool.query(queries.addStudent, [name, email, age, dob], (err, results) => {
      if (err) throw err;
      res.status(201).send("Student created successfully");
    });
  });
};

const deleteStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound)
      return res.send("Student does not exist in the database");

    pool.query(queries.deleteStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student deleted successfully");
    });
  });
};

const updateStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, age, dob } = req.body;
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound)
      return res.send("Student does not exist in the database");

    pool.query(queries.updateStudent, [name,id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student updated successfully");
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
