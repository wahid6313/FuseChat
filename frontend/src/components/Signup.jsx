import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://fusechat.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          userName: "",
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
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex  flex-col justify-center items-center w-screen h-screen m-auto">
      <form
        onSubmit={signUpHandler}
        className="shadow-xl flex flex-col p-8 gap-5 w-"
      >
        <div className="items-center text-center">
          <h1 className="font-bold text-xl">FuseChat</h1>
          <p className="mt-2 mb-5 font-light">
            Signup to see photos & videos of your freinds
          </p>
        </div>
        <div>
          <span>Username</span>
          <Input
            type="text"
            name="userName"
            value={input.userName}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent mt-2"
          />
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
            Signup
          </Button>
        )}
        <span className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 ml-1 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
