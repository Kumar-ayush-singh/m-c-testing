import React, {lazy, Suspense, useEffect} from "react";
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
import SelectAvatar from "./pages/auth/selectAvatar";

//lazy loadded modules
const Auth = lazy( () => import("./pages/auth/Auth") );
const ChatPage = lazy( () => import("./pages/chatPage/ChatPage") );
// import Auth from "./pages/auth/Auth";
// import ChatPage from "./pages/chatPage/ChatPage";

function handleResize(){
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--inner-height', `${vh}px`)
}



const App = () => {
  const { isLogedIn } = useSelector(state => state.user);

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--inner-height', `${vh}px`)

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return(
      () => {
        window.removeEventListener("resize", handleResize);
      }
    )
  }, []);


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
        <Route path="/select-avatar" element={
          <WithAuth isLogedIn={isLogedIn}>
            <SelectAvatar />
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
