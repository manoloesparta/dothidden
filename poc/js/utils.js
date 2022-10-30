const hideDiv = (div) => (div.style.display = "none");

const showDiv = (div) => (div.style.display = "block");

const getReq = async (url, headers = {}) => {
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

const postReq = async (url, body, headers = {}) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

const putReq = async (url, body, headers = {}) => {
  return await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

const deleteReq = async (url, body, headers = {}) => {
  return await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};
