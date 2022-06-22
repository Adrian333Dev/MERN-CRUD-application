const express = require('express');
const router = express.Router();
const {
	getGoals,
	postGoal,
	uptadeGoal,
	deleteGoal,
} = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, postGoal);
router.route('/:id').put(protect, uptadeGoal).delete(protect, deleteGoal);

module.exports = router;
