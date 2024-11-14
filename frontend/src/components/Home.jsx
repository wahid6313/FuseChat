import React from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "../hooks/useGetAllPost.jsx";
import useGetSuggestedUser from "../hooks/useGetSuggestedUser.jsx";

function Home() {
  useGetAllPost();
  useGetSuggestedUser();
  return (
    <div className="flex ">
      <div className="flex-grow ">
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  );
}

export default Home;
