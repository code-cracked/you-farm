// Get all deals from localhost:5000/deal
export const getAllDeals = async () => {
  const res = await fetch("http://localhost:5000/deal", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
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
export const getBidsOfDealer = async (phone) => {
  const res = await fetch(`http://localhost:5000/bid`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

// Post a bid to localhost:5000/bid
export const postBid = async (bid) => {
  const res = await fetch("http://localhost:5000/bid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bid),
  });
  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: res.statusText,
    };
  }
  const data = await res.json();
  return { ...data, ok: true };
};
