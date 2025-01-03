const router = require("express").Router();
const { getUsers, createUser, getUserId } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use(auth);

router.get("/", getUsers);
router.get("/:userId", getUserId);
router.post("/", createUser);

module.exports = router;
