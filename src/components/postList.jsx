import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import { HiExternalLink, HiFire, HiOutlineChevronRight } from "react-icons/hi";

function RefreshButton() {
  const [refresh, setRefresh] = useState(false);

  return (
    <button 
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={() => setRefresh(!refresh)}
    >
      Refresh
    </button>
  );
}

function HackerNewsTopStories() {
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    // Make the initial request to get the top stories
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', true);
    xhr.send();

    xhr.onload = function() {
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
      {topStories.slice(0,50).map((storyId) => (
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

  useEffect(() => {
    // Make a request for the story data
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`, true);
    xhr.send();

    xhr.onload = function() {
      if (xhr.status === 200) {
        // Success! Save the story data to state
        const data = JSON.parse(xhr.response);
        setStory(data);
      } else {
        // Something went wrong. Handle the error.
        console.error(xhr.statusText);
      }
    };
  }, [storyId]); // This array ensures the effect runs again when the storyId prop changes
  return (
    <div className='p-5 bg-white border-2 border-white shadow-sm hover:border-blue-400 transition rounded-lg my-2'>
      {story ? (
        <div className='inline-block'>
          <a href={story.url}><p className='text-xl font-bold mb-2'>{story.title}</p></a>
          {story.score > 100 && <img className='mb-2' src='../src/assets/Fire.png'></img>}
          <p className='text-lg mb-2'>Author - {story.by}</p>
          {/* <p>{story.score}</p> */}
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Save</button>
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
      <RefreshButton />
      <HackerNewsTopStories />
    </div>
  );
}

