import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./screens/HomePage";
import GamePage from "./screens/GamePage";

function App() {

  return (
    <div className="min-h-screen bg-[#012850] text-white flex flex-col items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/game" element={<GamePage/>} />
          <Route path="/smell" element={<h1>It smells like poop</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
