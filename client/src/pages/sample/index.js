import { useEffect, useState } from "react";
import { db } from "../../../config/db";
import Axios from "axios";
import { collection, getDocs } from "firebase/firestore";

export default function Sample() {
  const [users, setUsers] = useState();
  const UserRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(UserRef);
      console.log(data);
    };
    getUsers();
  }, []);
  return <div>Hello</div>;
}
