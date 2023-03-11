import React, {lazy, Suspense} from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/helper/Footer";
import Landing from "./pages/landing/Landing";
import "./fonts/Barlow/Barlow.font.css";
import "./fonts/Montserrat/Montserrat.font.css"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./components/helper/loading";
import WithAuth from "./util/authHOC";
import { useSelector } from "react-redux";

//lazy loadded modules
const Auth = lazy( () => import("./pages/auth/Auth") );
const ChatPage = lazy( () => import("./pages/chatPage/ChatPage") );
// import Auth from "./pages/auth/Auth";
// import ChatPage from "./pages/chatPage/ChatPage";



const App = () => {
  const { isLogedIn } = useSelector(state => state.user);
  return (
    <>
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat-page" element={
          <WithAuth isLogedIn={isLogedIn}>
            <ChatPage />
          </WithAuth>
        } />
      </Routes>
      <Footer />
      <ToastContainer/>
    </Suspense>
    </>
  );
};

export default App;
