import { BrowserRouter, Route, Routes } from "react-router";
import { Dashboard, CollaborativeNote } from "./page";
import Navbar from "./layout/navbar/Navbar";
import React from "react";
import { generateRandomUser } from "./common/utils";
import type { User } from "./common/types";
import { Toaster } from "sonner";

function App() {
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      const newUser: User = generateRandomUser();
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/note/:noteId" element={<CollaborativeNote />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
