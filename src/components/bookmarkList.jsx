import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import { deleteBookmark, fetchBookmarks } from "../lib/bookmark";
import axios from "axios";
import { UserContext } from "../context/userContext";
import PacmanLoader from "react-spinners/PacmanLoader";
import {
  HiExternalLink,
  HiFire,
  HiOutlineChevronRight,
  HiRefresh,
} from "react-icons/hi";
import { Link } from "react-router-dom";

function HackerNewsTopStories() {
  const [topStories, setTopStories] = useState([]);

  const [refreshList, setRefreshList] = useState(false);
  const userDetails = useContext(UserContext);

  useEffect(() => {
    async function getBookmarks() {
      const data = await fetchBookmarks(userDetails.username);
      console.log("data: ", data);
      setTopStories(data);
    }
    getBookmarks();
  }, [refreshList]);

  return (
    <div>
      {topStories
        ? topStories.map((story) => (
            <div key={story}>
              {/* Make a request for each story and render its data */}
              <HackerNewsStory
                storyId={story}
                setRefreshList={setRefreshList}
                refreshList={refreshList}
              />
            </div>
          ))
        : null}
    </div>
  );
}

function HackerNewsStory({ storyId, setRefreshList, refreshList }) {
  const [story, setStory] = useState(null);
  const [loadingStory, setLoadingStory] = useState(true);
  const userDetails = useContext(UserContext);
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

  async function bookmark_delete(storyId) {
    console.log("delete clicked");
    console.log(storyId);
    await deleteBookmark(storyId, userDetails.username);
    setRefreshList(!refreshList);
  }

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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => bookmark_delete(story.id)}
            >
              Delete
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

export default function BookmarkList() {
  return (
    <div>
      <HackerNewsTopStories />
    </div>
  );
}
