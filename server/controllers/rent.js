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
    const { phone, name, quantity, end } = req.body;
    const rentShowRef = collection(db, "rentshows");
    const dataRef = {
      closetime: Timestamp.fromMillis(Date.parse(Date(end))),
      createdby: phone,
      createdon: Timestamp.fromMillis(Date.parse(Date())),
      name: name,
      quantity: quantity,
      rents: [],
    };
    let id = "";
    await addDoc(rentShowRef, dataRef).then((result) => (id = result.id));
    dataRef.id = id;
    res.status(200).send(dataRef);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const addRent = asyncHandler(async (req, res) => {
  try {
    const { id, phone, name, amount } = req.body;
    const rentRef = collection(db, "rents");
    const docRef = doc(db, "rents", id + phone);
    const createShowDocRef = doc(db, "rentshows", id);
    const dataRef = {
      name: name,
      amount: amount,
      phone: phone,
      rentId: createShowDocRef,
      createdon: Timestamp.fromMillis(Date.parse(new Date())),
    };
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      res.status(404).send("User already exists");
    } else {
      await setDoc(doc(rentRef, id + phone), dataRef);
      const updates = [];
      await getDoc(createShowDocRef).then((doc) => {
        updates.push(
          updateDoc(createShowDocRef, { rents: [...doc.data().rents, docRef] })
        );
        // console.log(updates);
      });
      Promise.all(updates, () => {
        console.log("Users updated success");
      });
      dataRef.rentId = id;

      res.status(200).send(dataRef);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  createShow,
  addRent,
};
