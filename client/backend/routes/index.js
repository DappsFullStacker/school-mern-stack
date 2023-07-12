const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const managementRoutes = require('./management');
const scoreboardRoutes = require('./scoreboard');

router.use('/auth', authRoutes);
router.use('/management', managementRoutes);
router.use('/scoreboard', scoreboardRoutes);

module.exports = router;