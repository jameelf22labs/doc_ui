import { BrowserRouter, Route, Routes } from "react-router";
import { Dashboard, Note } from "./page";
import Navbar from "./layout/navbar/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/note/:noteId" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
