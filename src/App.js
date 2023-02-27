import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/helper/Footer";
import Auth from "./pages/auth/Auth";
import ChatPage from "./pages/chatPage/ChatPage";
import Landing from "./pages/landing/Landing";
import "./fonts/Barlow/Barlow.font.css";
import "./fonts/Montserrat/Montserrat.font.css"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat-page" element={<ChatPage />} />
      </Routes>
      <Footer />
      <ToastContainer/>
    </>
  );
};

export default App;
