const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');
const { authenticateToken } = require('../middlewares/authenticate');
const { validateAppointmentData, getAdditionalData } = require('../middlewares/validate');

/**
 * @swagger
 * /appointments/search:
 *   get:
 *     summary: search for appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         content:
 *           application/json:
 */
router.get('/search', appointmentController.search);

/**
 * @swagger
 * /appointments/:id:
 *   get:
 *     summary: look up all appointment base on user id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 */
router.get('/users/:id', appointmentController.indexUser);

/**
 * @swagger
 * /appointments/:id:
 *   get:
 *     summary: look up all appointment base on user id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 */
router.get('/doctors/:id', appointmentController.indexDoctor);

/**
 * @swagger
 * /appointments:
 *    post:
 *     summary: create an appointment
 *     responses:
 *       200:
 *         content:
 *           application/json:
 */
router.post('/', validateAppointmentData, appointmentController.post);

/**
 * @swagger
 * /appointments/:id:
 *    put:
 *     summary: cancelled an appointment
 *     responses:
 *       200:
 *         content:
 *           application/json:
 */
router.put('/:id', appointmentController.put);

module.exports = router