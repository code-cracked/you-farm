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
const Axios = require("axios");

const addUser = asyncHandler(async (req, res) => {
  try {
    const { phone, password, name, role, location, address } = req.body;
    const dataRef = {
      address,
      name,
      password,
      phone,
      role,
      location,
      created_on: Timestamp.fromMillis(Date.parse(new Date())),
    };
    const userRef = collection(db, "users");
    const docRef = doc(db, "users", phone);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.status(404).send("User already exists");
    } else {
      await setDoc(doc(userRef, phone), dataRef);
      res.status(200).send(dataRef);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    let users = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      users.push(doc.data());
    });
    if (users.length == 0) {
      res.status(404).send("No User record found");
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getAllUserDetails = asyncHandler(async (req, res) => {
  const getFetchData = async (phone) => {
    const { data: userDetails } = await Axios.get(
      `http://localhost:5000/user/${phone}`
    );
    const { data: dealDetails } = await Axios.get(
      `http://localhost:5000/bid/user/${phone}`
    );
    const { data: rentDetails } = await Axios.get(
      `http://localhost:5000/rent/user/${phone}`
    );
    let temp = { user: userDetails[0], deal: dealDetails, rent: rentDetails };
    console.log(temp);
    return temp;
  };

  try {
    const { phone } = req.params;
    const result = await Promise.all([getFetchData(phone)]);
    // console.log(result[0]);
    res.status(200).json(result[0]);
  } catch (error) {
    // console.log(error);
    res.status(400).send(error.message);
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const { phone } = req.params;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phone", "==", phone));
    const querySnapshot = await getDocs(q);
    let users = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      users.push(doc.data());
    });
    if (users.length == 0)
      res.status(404).send("No users found with this phone number");
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const signIn = asyncHandler(async (req, res) => {
  try {
    const { phone, password } = req.body;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phone", "==", phone));
    const querySnapshot = await getDocs(q);
    let users = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      users.push(doc.data());
    });
    if (users.length == 0)
      res.status(404).send("No users found with this phone number");
    if (users[0].password == password) {
      res.status(200).send(users[0]);
    } else {
      res.status(404).send("Password is incorrect");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const User = await firestore.collection("Users").doc(id);
    await User.update(data);
    res.send("User record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    await firestore.collection("Users").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  signIn,
  getAllUserDetails,
};
