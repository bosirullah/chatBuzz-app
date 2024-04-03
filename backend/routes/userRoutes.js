const express = require("express");
const {
    registerUser,
    authUser,
    allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// by using router.route we can do chain routing like after post we use a get request.
router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);

module.exports = router;
