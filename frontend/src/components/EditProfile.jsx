import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

function EditProfile() {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePhoto: file });
  };

  const genderChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    console.log(input);
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/profile/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedUserData = {
          ...user,
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture,
          gender: res.data.user?.gender,
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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
          <input
            ref={imageRef}
            onChange={fileChangeHandler}
            type="file"
            className="hidden"
          />
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
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            className="border border-gray-300 focus:border focus:border-black focus-visible:ring-transparent rounded-xl mt-3"
          />
        </div>
        <div className="mt-6">
          <h1 className="font-semibold text-md mb-3">Gender</h1>
          <Select
            defaultValue={input.gender}
            onValueChange={genderChangeHandler}
          >
            <SelectTrigger className="w-full py-5 border border-gray-300 text-gray-500">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="mt-2 text-xs text-gray-500">
            This won’t be part of your public profile.
          </p>
        </div>
        <div className="font-semibold text-md mt-7">
          <p>Show account suggestions on profiles</p>
        </div>
        <div className="border border-gray-300 rounded-xl px-4 mt-6 py-2">
          <p className=" font-normal">Show account suggestions on profiles</p>
          <p className="text-xs text-gray-500">
            Choose whether people can see similar account suggestions on your
            profile, and whether your account can be suggested on other
            profiles.
          </p>
        </div>
        <div className="mt-8 flex justify-end">
          {loading ? (
            <Button className="bg-blue-500 hover:bg-blue-600 h-10 w-[220px]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              please wait
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className="bg-blue-500 hover:bg-blue-600 h-10 w-[220px]"
            >
              Submit
            </Button>
          )}
        </div>
        <div className="mb-20 text-center text-xs text-gray-500 mt-16">
          <p>
            Meta . About . Blog . Jobs . Help . API . Privacy . Terms .
            Locations . Instagram Lite Threads . Contact . Uploading & Non-Users
            . Meta . Verified
          </p>
          <p className="text-xs text-gray-500 mt-8">@ 2024 FUSECHAT</p>
        </div>
      </section>
    </div>
  );
}

export default EditProfile;
