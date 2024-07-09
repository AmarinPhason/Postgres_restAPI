const express = require("express");
const {
  getAllStudent,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  deleteAllStudent,
} = require("../controller/student");

const router = express.Router();

router.get("/", getAllStudent);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.delete("/", deleteAllStudent);

module.exports = router;
