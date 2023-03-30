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

// SIgnin user to localhost:5000/user/signin
export const signInUser = (user) => {
  return fetch("http://localhost:5000/user/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    return res.json();
  });
};
