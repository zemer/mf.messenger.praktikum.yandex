import Chat from "Pages/chat/Chat";
import ChatList from "Pages/chat_list/ChatList";
import Error404 from "Pages/errors/404/Error404";
import Error500 from "Pages/errors/500/Error500";
import Login from "Pages/login/Login";
import Registration from "Pages/registration/Registration";
import UserProfile from "Pages/user_profile/UserProfile";
import Router from "Utils/router";
import "./stylesheets/global.scss";

const router = new Router(".app");

router
    .use("/", Login)
    .use("/login", Login)
    .use("/registration", Registration)
    .use("/chats", ChatList)
    .use("/chats/:chatId", Chat)
    .use("/profile", UserProfile)
    .use("/404", Error404)
    .use("/500", Error500)
    .start();
