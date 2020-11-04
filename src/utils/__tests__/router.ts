import ChatList from "../../pages/chat_list/ChatList.js";
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
});