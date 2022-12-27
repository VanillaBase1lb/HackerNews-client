import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function CommentsPage() {
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [commentLoading, setCommentLoading] = useState(true);

  useEffect(() => {
    async function loader() {
      const tokens = location.pathname.split("/");
      const postId = tokens[tokens.length - 1];
      const post = await axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`
        )
        .then((res) => res.data);
      if (!post.kids || post.kids.length === 0) {
        return [];
      }

      let finalArr = [];
      let testArr = [];

      async function fetchComment(id) {
        const kidData = await axios
          .get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          )
          .then((res) => res.data);
        const { parent, text, by } = kidData;
        testArr.push(id);
        return { id, kids: kidData.kids, parent, text, by };
      }

      async function fetchChildren(kids) {
        if (!kids || kids.length === 0) {
          return;
        }
        for (let kidId of kids) {
          const kidDetails = await fetchComment(kidId);
          finalArr.push(kidDetails);
          fetchChildren(kidDetails.kids);
        }
      }

      await fetchChildren(post.kids);
      const parent = finalArr.filter(
        (comment) => comment.parent === parseInt(postId)
      );

      setComments(finalArr);
      setCommentLoading(false);
    }

    loader();
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div
          onClick={() => navigate(-1)}
          className="ml-2 flex items-center text-sky-900 hover:cursor-pointer hover:text-sky-600 transition-all duration-200 hover:bg-gray-200 p-2 rounded-md"
          style={{ width: "120px" }}
        >
          <HiOutlineArrowNarrowLeft />
          <div className="ml-2">Go back</div>
        </div>
        <div className="m-auto">
          <PacmanLoader size={30} loading={commentLoading} color={"#818cf8"} />
        </div>
        {comments
          ? comments.map((comment) =>
              comment.text ? (
                <div
                  className="flex flex-col rounded shadow-sm bg-white overflow-hidden m-2"
                  key={comment.id}
                >
                  {/* Card Body */}
                  <div className="p-5 lg:p-6 grow w-full space-y-4">
                    {/* Media Object: Comment */}
                    <div className="flex space-x-4">
                      {/* Content */}
                      <div className="grow text-sm">
                        <p className="mb-1">
                          <div className="font-semibold text-indigo-600 hover:text-indigo-400">
                            {comment.by}
                          </div>
                          {
                            new DOMParser().parseFromString(
                              comment.text,
                              "text/html"
                            ).documentElement.textContent
                          }
                        </p>
                        {/* <p className="space-x-2">
								<a href="#" className="text-gray-500 hover:text-gray-400">
									Like
								</a>
								<a href="#" className="text-gray-500 hover:text-gray-400">
									Reply
								</a>
							</p> */}
                      </div>
                      {/* END Content */}
                    </div>
                    {/* END Media Object: Comment */}
                  </div>
                  {/* END Card Body */}
                </div>
              ) : null
            )
          : null}
      </div>
    </>
  );
}
