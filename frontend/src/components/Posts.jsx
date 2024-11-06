import React from "react";
import Post from "./Post";

function Posts() {
  return (
    <div className="">
      {[1, 2, 3, 4, 5].map((item, index) => (
        <Post key={index} />
      ))}
    </div>
  );
}

export default Posts;
