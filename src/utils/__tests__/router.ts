import ChatList from "../../pages/chat/chat_list/ChatList.js";
import UserProfile from "../../pages/user_profile/UserProfile.js";
import Router from "../router.js";

let expect = chai.expect;

describe("Router", function () {
    describe("getRoute", function () {
        it("Поиск маршрута", function () {
            const router = new Router(".test");
            router.use("/test/chats", ChatList);

            const route = Router.__instance.getRoute("/test/chats");
            expect(route).not.undefined;
            expect(route).haveOwnProperty("_blockClass");
        });

        it("Не найденный маршрут", function () {
            const router = new Router(".mocha");
            router.use("/test/chats", ChatList);

            const route = Router.__instance.getRoute("/f7yds87fs7d");
            expect(route).is.undefined;
        });
    });

    describe("onRoute", function () {
        it("Переход по маршруту", () => {
            const dom = document.createElement('div');
            dom.className = "test";
            dom.style.display = "none";

            const domMocha = document.querySelector("#mocha");
            domMocha?.appendChild(dom);

            const router = new Router(".test");
            router.use("/test/chats", ChatList);
            router.use("/test/profile", UserProfile);

            router._onRoute("/test/chats");

            expect(dom.childElementCount).equals(1);

            const chats = dom.firstChild;
            expect(chats).not.null;
            expect(chats?.firstChild).not.null;
        });

        it("Переход по несуществующему маршруту", () => {
            const dom = document.createElement('div');
            dom.className = "test";
            dom.hidden = true;

            const domMocha = document.querySelector("#mocha");
            domMocha?.appendChild(dom);

            const router = new Router(".test");
            router.use("/test/chats", ChatList);
            router.use("/test/profile", UserProfile);

            router._onRoute("/9а8в9авы9");

            expect(dom.childElementCount).equals(0);
        });
    });
});