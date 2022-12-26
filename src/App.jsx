import { useState } from "react";
import {
	Routes,
	Route,
	Link,
	useNavigate,
	useLocation,
	Navigate,
	Outlet,
} from "react-router-dom";

import reactLogo from "./assets/react.svg";
import "./App.css";

import AuthPage from "./pages/auth";
import HomePage from "./pages/home/home";
import RequireAuth from "./pages/requireAuth";
import AllPosts from "./pages/home/allPosts";
import Bookmarks from "./pages/home/bookmarks";
import { UserContext, UserProvider } from "./context/userContext";

function App() {
	return (
		<UserProvider>
			<Routes>
				<Route path="/" element={<HomePage />}>
					<Route path="/" element={<AllPosts />} />
					<Route
						path="/bookmarks"
						element={
							<RequireAuth>
								<Bookmarks />
							</RequireAuth>
						}
					/>
				</Route>
				<Route path="/login" element={<AuthPage />} />
			</Routes>
		</UserProvider>
	);
}

export default App;
