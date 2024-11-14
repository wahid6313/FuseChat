import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { setAuthUser } from "../redux/authSlice.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    // console.log(input);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  flex-col justify-center items-center w-screen h-screen m-auto">
      <form
        onSubmit={signUpHandler}
        className="shadow-xl flex flex-col p-8 gap-5 w-"
      >
        <div className="items-center text-center">
          <h1 className="font-bold text-xl">FuseChat</h1>
          <p className="mt-2 mb-5 font-light">
            Login to see photos & videos of your freinds
          </p>
        </div>

        <div>
          <span>Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent mt-2"
          />
        </div>
        <div>
          <span>Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent mt-2"
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </Button>
        ) : (
          <Button type="submit" className="mt-3">
            Login
          </Button>
        )}
        <span className="text-center">
          Doesn't have a acount?
          <Link to="/signup" className="text-blue-600 ml-2 hover:underline">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
