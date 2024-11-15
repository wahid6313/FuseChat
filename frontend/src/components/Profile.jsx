import { Link, useParams } from "react-router-dom";
import useGetUserProfile from "../hooks/useGetUserProfile.jsx";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { useSelector } from "react-redux";
import { Button } from "./ui/button.jsx";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog.jsx";
import {
  Bolt,
  Bookmark,
  CirclePlus,
  Contact,
  Grid3X3,
  Heart,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "./ui/badge.jsx";

function Profile() {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (userProfile) {
      console.log(userProfile);
    }
  }, [userProfile]);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="w-[900px] px-20   ml-[350px] overflow-hidden">
      <div className="flex w-full py-10 ">
        <div className="flex mt-8">
          <section className="justify-center">
            <Avatar className="h-36 w-36">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profile-pic"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
        </div>
        <div className="h-auto flex flex-col w-full">
          <section>
            <div className="ml-20">
              <div className="gap-2 w-full flex items-center">
                <span className="cursor-pointer text-xl">
                  {userProfile?.userName}
                </span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button className="bg-gray-100 text-black h-8 ml-3 rounded-lg hover:bg-gray-200 font-semibold">
                        Edit profile
                      </Button>
                    </Link>

                    <Button className="bg-gray-100 text-black h-8 ml-2 rounded-lg hover:bg-gray-200 font-semibold">
                      View archive
                    </Button>
                    <Bolt className="cursor-pointer ml-2 w-5 h-5"></Bolt>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button className="bg-gray-100 text-black w-fit h-8 ml-3 text-sm font-semibold hover:bg-gray-200">
                      Unfollow
                    </Button>
                    <Button className="bg-gray-100 text-black w-fit h-8 ml-1 text-sm font-semibold hover:bg-gray-200">
                      Message
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer ml-2 justify-end" />
                      </DialogTrigger>
                      <DialogContent className="w-60">
                        <Button
                          variant="ghost"
                          className="bg-white text-blue-600 border w-full"
                        >
                          Unfollow
                        </Button>
                        <Button
                          variant="ghost"
                          className="bg-white text-blue-600 border w-full"
                        >
                          Add to favorites
                        </Button>
                        <Button
                          variant="ghost"
                          className="bg-white text-blue-600 border w-full"
                        >
                          Delete
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <>
                    <Button className="bg-blue-500 w-fit h-8 ml-3 text-sm font-semibold hover:bg-blue-600">
                      Follow
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer ml-2 justify-end" />
                      </DialogTrigger>
                      <DialogContent className="w-60">
                        <Button
                          variant="ghost"
                          className="bg-white text-blue-600 border w-full"
                        >
                          Unfollow
                        </Button>
                        <Button
                          variant="ghost"
                          className="bg-white text-blue-600 border w-full"
                        >
                          Add to favorites
                        </Button>
                        <Button
                          variant="ghost"
                          className="bg-white text-blue-600 border w-full"
                        >
                          Delete
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
              <div className="flex py-2 mt-4">
                <p className="font-semibold">
                  {userProfile?.posts.length}{" "}
                  <span className="font-normal">posts</span>
                </p>
                <p className="font-semibold ml-7 cursor-pointer">
                  {userProfile?.followers.length}{" "}
                  <span className="font-normal">followers</span>
                </p>
                <p className="font-semibold ml-7 cursor-pointer">
                  {userProfile?.following.length}{" "}
                  <span className="font-normal">following</span>
                </p>
              </div>
              <div className="mt-3">
                <Badge className="rounded-xl h-7 bg-gray-100 text-sm font-normal text-black hover:bg-gray-200 cursor-pointer">
                  @{userProfile?.userName}
                </Badge>
                <p className="text-sm cursor-pointer mt-3">
                  {userProfile?.bio || "bio here..."}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className=" w-full border-t border-t-gray-300 mt-16">
        <div className="flex  items-center justify-center mt-4 text-xs font-semibold text-gray-500 ml-16">
          <div
            className={`flex items-center cursor-pointer ${
              activeTab === "posts" ? "text-black" : ""
            }`}
            onClick={() => handleTabChange("posts")}
          >
            <Grid3X3 className=" w-3 h-3 "></Grid3X3>
            <p className="mr-16">POSTS</p>
          </div>
          <div
            className={`flex items-center cursor-pointer ${
              activeTab === "saved" ? "text-black" : ""
            }`}
            onClick={() => handleTabChange("saved")}
          >
            <Bookmark className=" w-3 h-3 "></Bookmark>
            <p className="mr-16">SAVED</p>
          </div>
          <div
            className={`flex items-center cursor-pointer ${
              activeTab === "tagged" ? "text-black" : ""
            }`}
            onClick={() => handleTabChange("tagged")}
          >
            <Contact className=" w-3 h-3 "></Contact>
            <p className="mr-16">TAGGED</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-6">
          {displayedPost?.map((post) => {
            return (
              <div key={post?._id} className="cursor-pointer relative group">
                <img
                  src={post?.image}
                  alt="post-img"
                  className="w-72 h-72 object-cover aspect-square"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4">
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <Heart />
                      <span>{post?.likes.length}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <MessageCircle />
                      <span>{post?.comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
