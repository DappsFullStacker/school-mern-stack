const express = require('express');
const Student = require('../models/Student');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/averages', authMiddleware(['admin', 'principal', 'teacher', 'student']), async (req, res) => {
  try {
    const students = await Student.find();
    const scores = students.reduce((acc, student) => {
      student.scores.forEach(({ subject, score }) => {
        if (!acc[subject]) {
          acc[subject] = [];
        }
        acc[subject].push(score);
      });
      return acc;
    }, {});

    const averages = Object.entries(scores).reduce((acc, [subject, scores]) => {
      const sum = scores.reduce((acc, score) => acc + score, 0);
      const average = sum / scores.length || 0;
      acc[subject] = average;
      return acc;
    }, {});

    res.send({ averages });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;