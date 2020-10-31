import Chat from "./pages/chat/chat/Chat.js";
import ChatList from "./pages/chat/chat_list/ChatList.js";
import Error404 from "./pages/errors/404/Error404.js";
import Error500 from "./pages/errors/500/Error500.js";
import Login from "./pages/login/Login.js";
import Registration from "./pages/registration/Registration.js";
import UserProfile from "./pages/user_profile/UserProfile.js";
import Router from "./utils/router.js";

const router = new Router(".app");

router
    .use('/', Login)
    .use('/login', Login)
    .use('/registration', Registration)
    .use('/chats', ChatList)
    .use('/chat', Chat)
    .use('/profile', UserProfile)
    .use('/404', Error404)
    .use('/500', Error500)
    .start();