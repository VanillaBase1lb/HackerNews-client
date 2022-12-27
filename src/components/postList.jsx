import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";

import {
	HiExternalLink,
	HiFire,
	HiOutlineChevronRight,
	HiRefresh,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import PacmanLoader from "react-spinners/PacmanLoader";
import { createBookmark, fetchBookmarks } from "../lib/bookmark";

function RefreshButton() {
	const [refresh, setRefresh] = useState(false);
	const userDetails = useContext(UserContext);

	return (
		<div className="flex justify-between w-full mb-4 items-center">
			<div className="text-2xl text-indigo-500 font-bold">
				{userDetails ? `Hi, ${userDetails.username}` : "You are not logged in"}
			</div>
			<div
				className="text-sky-900 text-2xl hover:cursor-pointer hover:text-sky-600 transition-all duration-200 hover:bg-gray-200 p-2 rounded-md"
				onClick={() => setRefresh(!refresh)}
			>
				<HiRefresh />
			</div>
			{/* <button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				
			>
				Refresh
			</button> */}
		</div>
	);
}

function HackerNewsTopStories() {
	const [topStories, setTopStories] = useState([]);

	useEffect(() => {
		// Make the initial request to get the top stories
		const xhr = new XMLHttpRequest();
		xhr.open(
			"GET",
			"https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
			true
		);
		xhr.send();

		xhr.onload = function () {
			if (xhr.status === 200) {
				// Success! Save the top stories to state
				const data = JSON.parse(xhr.responseText);
				setTopStories(data);
			} else {
				// Something went wrong. Handle the error.
				console.error(xhr.statusText);
			}
		};
	}, []); // This empty array ensures the effect only runs once when the component mounts

	return (
		<div>
			{topStories.slice(0, 50).map((storyId) => (
				<div key={storyId}>
					{/* Make a request for each story and render its data */}
					<HackerNewsStory storyId={storyId} />
				</div>
			))}
		</div>
	);
}

function HackerNewsStory({ storyId }) {
	const [story, setStory] = useState(null);
	const [loadingStory, setLoadingStory] = useState(true);
	const userDetails = useContext(UserContext)

	async function addBookmark(id) {
		await createBookmark(id, userDetails.username)


	}

	useEffect(() => {
		// Make a request for the story data
		const xhr = new XMLHttpRequest();
		xhr.open(
			"GET",
			`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`,
			true
		);
		xhr.send();

		xhr.onload = function () {
			if (xhr.status === 200) {
				// Success! Save the story data to state
				const data = JSON.parse(xhr.response);
				setStory(data);
				setLoadingStory(false);
			} else {
				// Something went wrong. Handle the error.
				console.error(xhr.statusText);
			}
		};
	}, [storyId]); // This array ensures the effect runs again when the storyId prop changes
	return (
		<div className="p-5 bg-white border-2 border-white shadow-sm hover:border-blue-400 transition rounded-lg my-2">
			<div className="m-auto">
				<PacmanLoader size={30} loading={loadingStory} color={"#818cf8"} />
			</div>
			{story ? (
				<div className="flex items-center justify-between">
					<div className="inline-block">
						<div className="flex items-center hover:underline hover:text-indigo-400 transition-all duration-200  text-slate-600">
							<a href={story.url}>
								<p className="text-lg font-bold mb-2">{story.title}</p>
							</a>
							{story.score > 100 && (
								<HiFire className="text-xl mb-2 ml-1 text-rose-600" />
							)}
						</div>

						<p className="text-lg mb-2">Author - {story.by}</p>
						{/* <p>{story.score}</p> */}
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addBookmark(story.id)}>
							Save
						</button>
					</div>
					<div>
						<Link to={`/post/${storyId}`}>
							<HiOutlineChevronRight className="text-4xl text-indigo-400" />
						</Link>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default function PostList() {
	return (
		<div>
			<RefreshButton />
			<HackerNewsTopStories />
		</div>
	);
}
