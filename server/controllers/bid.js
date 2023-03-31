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

const createShow = asyncHandler(async (req, res) => {
  try {
    const { phone, name, quantity, end } = req.body;
    const bidShowRef = collection(db, "bidshows");
    const dataRef = {
      closetime: Timestamp.fromMillis(Date.parse(Date(end))),
      createdby: phone,
      createdon: Timestamp.fromMillis(Date.parse(Date())),
      name: name,
      quantity: quantity,
      bids: [],
    };
    let id = "";
    await addDoc(bidShowRef, dataRef).then((result) => (id = result.id));
    dataRef.id = id;
    res.status(200).send(dataRef);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const getUserBids = asyncHandler(async (req, res) => {
  const getBidData = async (bids, id) => {
    const bidData = await Promise.all(
      bids.map(async (val) => {
        const temp = await getBid(val, id).then((result) => {
          return result;
        });
        return temp;
      })
    );
    return bidData;
  };

  const getBid = async (ref, id = "sampleId") => {
    const docu = await getDoc(ref);
    let temp = docu.data();
    temp.bidId = id;
    return temp;
  };

  const getAllBids = async (ref) => {
    const query = await getDocs(ref);
    console.log(query);
    const bidData = await Promise.all(
      query.docs.map(async (doc) => {
        let docRef = await doc.data();
        const bidList = await getBidData(docRef.bids, doc.id).then((result) => {
          return result;
        });
        docRef.bids = bidList;
        docRef.id = doc.id;
        return docRef;
      })
    );
    return bidData;
  };

  try {
    const bidShowRef = collection(db, "bidshows");
    const q = query(bidShowRef, where("createdby", "==", req.params.phone));
    const data = await getAllBids(q);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getAllShows = asyncHandler(async (req, res) => {
  const getBidData = async (bids, id) => {
    const bidData = await Promise.all(
      bids.map(async (val) => {
        const temp = await getBid(val, id).then((result) => {
          return result;
        });
        return temp;
      })
    );
    return bidData;
  };

  const getBid = async (ref, id = "sampleId") => {
    const docu = await getDoc(ref);
    let temp = docu.data();
    temp.bidId = id;
    return temp;
  };

  const getAllBids = async (ref) => {
    const query = await getDocs(ref);
    console.log(query);
    const bidData = await Promise.all(
      query.docs.map(async (doc) => {
        let docRef = await doc.data();
        const bidList = await getBidData(docRef.bids, doc.id).then((result) => {
          return result;
        });
        docRef.bids = bidList;
        docRef.id = doc.id;
        return docRef;
      })
    );
    return bidData;
  };

  try {
    const bidShowRef = collection(db, "bidshows");

    const data = await getAllBids(bidShowRef);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const addBid = asyncHandler(async (req, res) => {
  try {
    const { id, phone, name, amount } = req.body;
    const bidRef = collection(db, "bids");
    const docRef = doc(db, "bids", id + phone);
    const createShowDocRef = doc(db, "bidshows", id);
    const dataRef = {
      name: name,
      amount: amount,
      phone: phone,
      bidId: createShowDocRef,
      createdon: Timestamp.fromMillis(Date.parse(new Date())),
    };
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      res.status(404).send("User already exists");
    } else {
      await setDoc(doc(bidRef, id + phone), dataRef);
      const updates = [];
      await getDoc(createShowDocRef).then((doc) => {
        updates.push(
          updateDoc(createShowDocRef, { bids: [...doc.data().bids, docRef] })
        );
        // console.log(updates);
      });
      Promise.all(updates, () => {
        console.log("Users updated success");
      });
      dataRef.bidId = id;

      res.status(200).send(dataRef);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

const getBids = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const bidRef = collection(db, "bids");
    const q = query(bidRef, where("bidId", "==", id));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getAllBids = asyncHandler(async (req, res) => {
  try {
    const bidRef = collection(db, "bids");
    const querySnapshot = await getDocs(bidRef);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  addBid,
  createShow,
  getBids,
  getAllBids,
  getAllShows,
  getUserBids,
};
