import React from "react";
import Posts from "./Posts";
import Story from "./Story";

function Feed() {
  return (
    <div className="flex-1 flex-col text-center items-center   pl-[20%] justify-center">
      <div className="flex items-center px-32  my-7">
        <Story />
      </div>
      <Posts />
    </div>
  );
}

export default Feed;
