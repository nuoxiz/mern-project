const express = require("express"); // CommonJS module syntax. Different from the import from syntax(ES2015)
// ES 2015 syntax is used i the front-end
const router = express.Router();
const {
  getGoal,
  setGoal,
  deleteGoal,
  updateGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoal).post(protect, setGoal);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

// router.put("/:id", updateGoal);

// router.delete("/:id", deleteGoal);

module.exports = router;
