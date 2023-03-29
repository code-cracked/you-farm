const assert = require("assert");

const { PORT, HOST, HOST_URL } = process.env;
assert(PORT, "Port is required");
assert(HOST, "Host is required");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.DB_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SENDER,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig: firebaseConfig,
};
