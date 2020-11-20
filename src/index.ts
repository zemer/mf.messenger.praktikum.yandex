import Chat from "./pages/chat/Chat";
import ChatList from "./pages/chat_list/ChatList";
import Error404 from "./pages/errors/404/Error404";
import Error500 from "./pages/errors/500/Error500";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import UserProfile from "./pages/user_profile/UserProfile";
import Router from "./utils/router";
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