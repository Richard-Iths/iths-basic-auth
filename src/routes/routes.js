const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const authMiddleware = require("../middleware/auth");

router.post("/auth", controller.Authenticate);
router.post("/create", controller.Create);
router.get("/protected", authMiddleware, controller.Protected);

module.exports = router;
