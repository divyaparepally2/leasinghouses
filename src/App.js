import React from "react";
import Login from "./components/login";
import Home from "./components/home";
import Profile from "./components/profile";
import "./App.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from "./components/signup";
import DigitalSign from "./components/digitalSign";
import House from "./components/house";
import TemporaryOwnership from "./components/temporaryOwnership";
import Ownership from "./components/ownership";
import PropertyPage from "./components/propertyPage";
import AlphaPropertyPage from "./components/alphaPropertyPage";
import Listings from "./components/listings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/DigitalSign" element={<DigitalSign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/house" element={<House />} />
        <Route path="/temporaryOwnership" element={<TemporaryOwnership />} />
        <Route path="/ownership" element={<Ownership />} />
        <Route path="/propertyPage" element={<PropertyPage />} />
        <Route path="/alphaPropertyPage" element={<AlphaPropertyPage />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
