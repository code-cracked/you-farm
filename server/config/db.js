const { initializeApp } = require("firebase/app");

const { getFirestore } = require("firebase/firestore/lite");
const config = require("./index");

const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

module.exports = { db };
