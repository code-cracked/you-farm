// Get users from localhost:5000/user
export const getUsers = () => {
  return fetch("http://localhost:5000/user")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

// Get user by id from localhost:5000/user/:phno
export const getUserById = (phno) => {
  return fetch(`http://localhost:5000/user/${phno}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

// Post user to localhost:5000/user
/*
{
"password": "sam",
"address": "nazareth, TamilNadu, India",
"role": "farmer",
"phone": "7395879437",
"created_on": {
"seconds": 1680088261,
"nanoseconds": 849000000
},
"location": {
"lat": "20",
"long": "20"
}
}
*/
export const postUser = (user) => {
  return fetch("http://localhost:5000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    return res;
  });
};
