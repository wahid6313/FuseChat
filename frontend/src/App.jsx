import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Signup from "./components/signUp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex  flex-col justify-center items-center w-screen h-screen m-auto">
      <Signup />
    </div>
  );
}

export default App;
