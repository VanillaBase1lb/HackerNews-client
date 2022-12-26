import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import { HiExternalLink, HiFire, HiOutlineChevronRight } from "react-icons/hi";

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
				console.log(setTopStories);
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
	// const [count, setCount] = useState(0);

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
				// setCount(count ++);
			} else {
				// Something went wrong. Handle the error.
				console.error(xhr.statusText);
			}
		};
	}, [storyId]); // This array ensures the effect runs again when the storyId prop changes
	return (
		<div className="p-5 bg-white border-2 border-white shadow-sm hover:border-blue-400 transition rounded-lg my-2">
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
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							Save
						</button>
					</div>
					<div>
							<HiOutlineChevronRight className="text-4xl text-indigo-400"/>
						</div>
				</div>
			) : (
				<p>Loading story...</p>
			)}
		</div>
	);
}

export default function PostList() {
	return (
		<div>
			<HackerNewsTopStories />
		</div>
	);
}
