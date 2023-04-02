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
export const getDealById = async (id) => {
  return await fetch(`http://localhost:5000/deal/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

// Gets bids of the delaer from localhost:5000/bid/:phone
export const getBidsOfDealer = (phone) => {
  return fetch(`http://localhost:5000/bid`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

// Post a bid to localhost:5000/bid
export const postBid = (bid) => {
  return fetch("http://localhost:5000/bid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bid),
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
