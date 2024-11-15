import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

function EditProfile() {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="w-[900px] px-40   ml-[350px] overflow-hidden">
      <section className=" mt-16">
        <h1 className="font-semibold text-xl">Edit profile</h1>

        <div className="mt-10 p-3 flex items-center justify-between bg-gray-100 rounded-2xl px-4 py-4">
          <div className="flex items-center">
            <Link to={`/profile/${user?._id}`}>
              <Avatar className="w-14 h-14">
                <AvatarImage src={user?.profilePicture} alt="auth-image" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>

            <h1 className="text-md ml-2 font-semibold ">{user?.userName} </h1>
          </div>
          <input ref={imageRef} type="file" className="hidden" />
          <Button
            onClick={() => imageRef?.current.click()}
            className="bg-blue-500 hover:bg-blue-600 h-8 ml-"
          >
            Change photo
          </Button>
        </div>
        <div className="font-semibold text-md mt-7">
          <span>Website</span>
        </div>
        <div className="text-gray-500 mt-3 text-md px-4 bg-gray-200 p-2 rounded-xl border border-gray-300 cursor-not-allowed">
          <p>website</p>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <p>
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </p>
        </div>
        <div className="mt-6">
          <h1 className="font-semibold text-md ">Bio</h1>
          <Textarea className="border border-gray-300 focus:border focus:border-black focus-visible:ring-transparent rounded-xl mt-3" />
        </div>
      </section>
    </div>
  );
}

export default EditProfile;
