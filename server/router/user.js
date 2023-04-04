const express = require("express");

const {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  signIn,
  updateUser,
  getAllUserDetails,
} = require("../controllers/user");
const router = express.Router();

router.route("/").post(addUser).get(getAllUsers);
router.route("/:phone").get(getUser);
router.route("/signin").post(signIn);
router.route("/:phone/getDetails").get(getAllUserDetails);

module.exports = {
  userRoutes: router,
};

//7395879437
