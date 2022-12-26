import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { deleteBookmark, fetchBookmarks } from "../lib/bookmark";
import axios from "axios";

function HackerNewsTopStories() {
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    fetchBookmarks().then((data) => {
      setTopStories(data);
    });
  }, []); // This empty array ensures the effect only runs once when the component mounts

  return (
    <div>
      {topStories.map((storyId) => (
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

  async function bookmark_delete() {
    console.log("delete clicked");
    console.log(storyId);
    await deleteBookmark(storyId);
  }

  return (
    <div className="p-5 bg-white border-2 border-white shadow-sm hover:border-blue-400 transition rounded-lg my-2">
      {story ? (
        <div className="inline-block">
          <a href={story.url}>
            <p className="text-xl font-bold mb-2">{story.title}</p>
          </a>
          {story.score > 150 && (
            <img className="mb-2" src="../src/assets/Fire.png"></img>
          )}
          <p className="text-lg mb-2">Topic - {story.type}</p>
          {/* <p>{story.score}</p> */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={bookmark_delete}
          >
            Delete
          </button>
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
