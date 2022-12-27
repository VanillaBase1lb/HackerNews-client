import { useContext, useEffect } from "react";
import BookmarkList from "../../components/bookmarkList";
import { UserContext } from "../../context/userContext";

export default function Bookmarks() {
  const userDetails = useContext(UserContext);

  useEffect(() => {}, []);

  return (
    <>
      <BookmarkList />
    </>
  );
}
