const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} = require("firebase/firestore/lite");
const createShow = asyncHandler(async (req, res) => {
  try {
    res.status(200).send("hello");
  } catch (err) {
    res.status(400).send(err.messsage);
  }
});

module.exports = {
  createShow,
};
