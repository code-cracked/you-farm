// Get all deals from localhost:5000/deal
export const getAllDeals = () => {
  return fetch("http://localhost:5000/deal", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

// Get deal by id from localhost:5000/deal/
export const getDealById = () => {
  return fetch(`http://localhost:5000/deal/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};