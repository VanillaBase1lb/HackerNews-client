import { useContext, useEffect } from "react";
import PostList from "../../components/postList";
import { UserContext } from "../../context/userContext";

export default function Bookmarks() {
    const userDetails = useContext(UserContext)

    
	useEffect(() => {}, []);

	return (
		<>
			<PostList />
		</>
	);
}
