import { URL } from "./localStorage.js";

export const createUser = (endpoint, elements) => {
  return fetch(`${URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": getToken(),
    },
    body: JSON.stringify({
      name: elements.name,
      email: elements.email,
      password: elements.password,
      role: elements.role,
      restaurant: "Cannabizing Food",
    }),
  });
};

export const loginUser = (endpoint, elements) => {
  return fetch(`${URL}${endpoint}` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: elements.email,
      password: elements.password,
    })
  });
};