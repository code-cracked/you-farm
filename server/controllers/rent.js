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
  updateDoc,
  Timestamp,
} = require("firebase/firestore/lite");

const getAllShows = asyncHandler(async (req, res) => {
  const getrentData = async (rents, id) => {
    const rentData = await Promise.all(
      rents.map(async (val) => {
        const temp = await getrent(val, id).then((result) => {
          return result;
        });
        return temp;
      })
    );
    return rentData;
  };

  const getrent = async (ref, id = "sampleId") => {
    const docu = await getDoc(ref);
    let temp = docu.data();
    temp.rentId = id;
    return temp;
  };

  const getAllrents = async (ref) => {
    const query = await getDocs(ref);
    console.log(query);
    const rentData = await Promise.all(
      query.docs.map(async (doc) => {
        let docRef = await doc.data();
        const rentList = await getrentData(docRef.rents, doc.id).then(
          (result) => {
            return result;
          }
        );
        docRef.rents = rentList;
        docRef.id = doc.id;
        return docRef;
      })
    );
    return rentData;
  };

  try {
    const rentshowRef = collection(db, "rentshows");

    const data = await getAllrents(rentshowRef);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getDealById = asyncHandler(async (req, res) => {
  const getrent = async (ref, id = "sampleId") => {
    const docu = await getDoc(ref);
    let temp = docu.data();
    temp.rentId = id;
    return temp;
  };
  const getrentData = async (rents, id) => {
    const rentData = await Promise.all(
      rents.map(async (val) => {
        const temp = await getrent(val, id).then((result) => {
          return result;
        });
        return temp;
      })
    );
    return rentData;
  };
  try {
    const { id } = req.params;
    const docRef = doc(db, "rentshows", id);
    const dealRef = await getDoc(docRef);
    const deal = dealRef.data();
    console.log(deal);
    const rentList = await getrentData(deal.rents, deal.id).then((result) => {
      return result;
    });

    deal.rents = rentList;
    deal.id = id;
    res.status(200).send(deal);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const createShow = asyncHandler(async (req, res) => {
  try {
    const { phone, name, quantity, end } = req.body;
    console.log(phone);
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
    console.log(err);
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
  getAllShows,
  getDealById,
};
