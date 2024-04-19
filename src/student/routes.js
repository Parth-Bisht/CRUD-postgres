const { Router } = require("express");
const { getStudents, getStudentById, addStudent, deleteStudent, updateStudent } = require("./controller");

const router = Router();

router.get("/", getStudents);
router.post("/", addStudent);
router.get("/:id", getStudentById);
router.put("/:id",updateStudent);
router.delete("/:id",deleteStudent);

module.exports = router;
