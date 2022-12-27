import axios from "axios";

const AUTH_URL = "http://54.249.173.192:9898";

export async function register({ username, password }) {
  return await axios
    .post(`${AUTH_URL}/signup`, { username, password })
    .then((res) => res.data);
  // return new Promise((resolve, reject) => {
  // 	setTimeout(() => {
  // 		resolve({ user: { username: "John Cena" } });
  // 	}, 1000);
  // });
}

export async function login({ username, password }) {
  return await axios
    .post(`${AUTH_URL}/login`, { username, password })
    .then((res) => res.data);
  // return new Promise((resolve, reject) => {
  // 	setTimeout(() => {
  // 		resolve({ user: { username: "John Cena" } });
  // 	}, 1000);
  // });
}

export async function signout() {
  // signout api call here
  return await axios.get(`${AUTH_URL}/logout`).then((res) => res.data);
}
