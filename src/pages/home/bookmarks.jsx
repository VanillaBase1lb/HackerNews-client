import axios from "axios";
import { useContext, useEffect } from "react";
import BookmarkList from "../../components/bookmarkList";
import { UserContext } from "../../context/userContext";
import { createBookmark, deleteBookmark } from "../../lib/bookmark";

export default function Bookmarks() {
  const userDetails = useContext(UserContext);

  useEffect(() => {
    console.log("hello");
    axios
      .get(`http://localhost:9899/fetch`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <BookmarkList />
    </>
  );
}
