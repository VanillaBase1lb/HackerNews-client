import axios from "axios";

const AUTH_URL = "http://localhost:9899";

export async function createBookmark(id) {
  return await axios
    .post(
      `${AUTH_URL}/create`,
      { id },
      { withCredentials: true, headers: { "Access-Control-Allow-Origin": "*" } }
    )
    .then((res) => res.data);
}

export async function deleteBookmark(id) {
  return await axios
    .post(
      `${AUTH_URL}/delete`,
      { id },
      { withCredentials: true, headers: { "Access-Control-Allow-Origin": "*" } }
    )
    .then((res) => res.data);
}

export async function fetchBookmarks() {
  return await axios
    .get(`${AUTH_URL}/fetch`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((res) => {
      let bookmarks = [];
      for (let i = 0; i < res.data.length; i++) {
        bookmarks.push(res.data[i].id);
      }
      console.log(bookmarks);
      return bookmarks;
    });
}
