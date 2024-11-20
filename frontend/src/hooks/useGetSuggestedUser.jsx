import { setSuggestedUser } from "@/redux/authSlice";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSuggestedUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSuggestedUser = async () => {
      try {
        const res = await axios.get(
          "https://fusechat.onrender.com/api/v1/user/suggested",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setSuggestedUser(res.data.users));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestedUser();
  }, []);
};

export default useGetSuggestedUser;
