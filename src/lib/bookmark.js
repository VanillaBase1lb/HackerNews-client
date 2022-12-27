import axios from "axios";

const AUTH_URL = "http://localhost:9899";

export async function createBookmark(id, username) {
  return await axios
    .post(`${AUTH_URL}/create`, { id, username })
    .then((res) => res.data);
}

export async function deleteBookmark(id, username) {
  return await axios
    .post(`${AUTH_URL}/delete`, { id, username })
    .then((res) => res.data);
}

export async function fetchBookmarks(username) {
  return await axios
    .get(`${AUTH_URL}/fetch?username=${username}`)
    .then((res) => res.data);
}
