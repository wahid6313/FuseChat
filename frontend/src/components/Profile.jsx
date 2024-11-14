import { useParams } from "react-router-dom";
import useGetUserProfile from "../hooks/useGetUserProfile.jsx";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { useSelector } from "react-redux";
import { Button } from "./ui/button.jsx";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog.jsx";
import { MoreHorizontal } from "lucide-react";

function Profile() {
  const params = useParams();
  const userId = params.id;

  useGetUserProfile(userId);

  const { userProfile } = useSelector((store) => store.auth);
  useEffect(() => {
    if (userProfile) {
      console.log(userProfile);
    }
  }, [userProfile]);
  const isLoggedInUserProfile = true;
  const isFollowing = false;

  return (
    <div className="flex justify-center  w-[900px] mx-auto  px-20 h-screen ml-[400px]">
      <div className="flex  w-full py-10">
        <section className=" justify-center">
          <Avatar className="h-36 w-36">
            <AvatarImage src={userProfile?.profilePicture} alt="profile-pic" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
        <section>
          <div className="ml-20">
            <div className=" gap-2 w-full  flex items-center ">
              <span className="cursor-pointer  text-xl">
                {userProfile?.userName}
              </span>
              {isLoggedInUserProfile ? (
                <>
                  <Button className="bg-gray-200 text-black h-8 ml-3 rounded-lg hover:bg-gray-300 font-semibold">
                    Edit profile
                  </Button>
                  <Button className="bg-gray-200 text-black h-8 ml-2 rounded-lg hover:bg-gray-300 font-semibold">
                    View archive
                  </Button>
                </>
              ) : isFollowing ? (
                <>
                  <Button className="bg-gray-200  text-black w-fit h-8 ml-3 text-sm font-semibold hover:bg-gray-300">
                    Unfollow
                  </Button>
                  <Button className="bg-gray-200 text-black w-fit h-8 ml-1 text-sm font-semibold hover:bg-gray-300">
                    Message
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <MoreHorizontal className="cursor-pointer ml-2 justify-end"></MoreHorizontal>
                    </DialogTrigger>
                    <DialogContent className="w-60">
                      <Button
                        variant="ghost"
                        className="bg-white text-blue-600 border border-none  w-full"
                      >
                        Unfollow
                      </Button>
                      <Button
                        variant="ghost"
                        className="bg-white text-blue-600 border border-none  w-full"
                      >
                        Add to favorites
                      </Button>

                      <Button
                        variant="ghost"
                        className="bg-white text-blue-600 border border-none  w-full"
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
                      <MoreHorizontal className="cursor-pointer ml-2 justify-end"></MoreHorizontal>
                    </DialogTrigger>
                    <DialogContent className="w-60">
                      <Button
                        variant="ghost"
                        className="bg-white text-blue-600 border border-none  w-full"
                      >
                        Unfollow
                      </Button>
                      <Button
                        variant="ghost"
                        className="bg-white text-blue-600 border border-none  w-full"
                      >
                        Add to favorites
                      </Button>

                      <Button
                        variant="ghost"
                        className="bg-white text-blue-600 border border-none  w-full"
                      >
                        Delete
                      </Button>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
            <div className=" flex py-2 mt-4">
              <p className="font-semibold">
                {userProfile?.posts.length}{" "}
                <span className="font-normal">posts</span>
              </p>
              <p className="font-semibold ml-7 cursor-pointer">
                {userProfile?.followers.length}{" "}
                <span className="font-normal ">followers</span>
              </p>
              <p className="font-semibold ml-7 cursor-pointer">
                {userProfile?.following.length}{" "}
                <span className="font-normal ">following</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
