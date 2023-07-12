const express = require('express');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/students', authMiddleware(['admin', 'principal', 'teacher', 'student']), async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
});

router.post('/students', authMiddleware(['admin', 'principal', 'teacher']), async (req, res) => {
  try {
    const { name, email, age, grade, scores } = req.body;
    const student = new Student({ name, email, age, grade, scores });
    await student.save();
    res.status(201).send({ student });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
});

router.get('/teachers', authMiddleware(['admin', 'principal', 'teacher']), async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.send(teachers);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
});

router.post('/teachers', authMiddleware(['admin', 'principal']), async (req, res) => {
  try {
    const { name, email, subject } = req.body;
    const teacher = new Teacher({ name, email, subject });
    await teacher.save();
    res.status(201).send({ teacher });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;