const express = require('express');
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management APIs
 */

/**
 * @swagger
 * /api/v1/jobs:
 *   get:
 *     summary: Get all jobs of logged-in user
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
 */
router.route('/').get(getAllJobs);

/**
 * @swagger
 * /api/v1/jobs:
 *   post:
 *     summary: Create a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - position
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 */
router.route('/').post(createJob);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job fetched successfully
 */
router.route('/:id').get(getJob);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   patch:
 *     summary: Update a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 */
router.route('/:id').patch(updateJob);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 */
router.route('/:id').delete(deleteJob);

module.exports = router;
