// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../../config/db";
import { collection, getDocs } from "firebase/firestore";

export const handler = async (req, res) => {
  const UserRef = collection(db, "users");
  const snapshot = await UserRef.get()
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
  // res.status(200).json(data);
  // res.status(200).json({ name: "John Doe" });
};
