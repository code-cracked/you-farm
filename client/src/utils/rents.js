// Get all deals from localhost:5000/deal
export const getAllDeals = () => {
  return fetch("http://localhost:5000/rent", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

// Get deal by id from localhost:5000/deal/
export const getDealById = (id) => {
  return fetch(`http://localhost:5000/rent/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

// Gets rents of the delaer from localhost:5000/rent/:phone(not implemented)
export const getRentsOfDealer = (phone) => {
  return fetch(`http://localhost:5000/rent`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

// Post a rent to localhost:5000/rent
export const postRent = (rent) => {
  return fetch("http://localhost:5000/rent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rent),
  }).then((res) => {
    if (res.status !== 200) {
      return {
        status: res.status,
        message: res.statusText,
      };
    }
    return res.json();
  });
};
