import Router from "Utils/router";
import ChatList from "Pages/chat_list/ChatList";

describe("Router", () => {
    describe("getRoute", () => {
        it("Поиск маршрута", () => {
            const router = new Router(".test");
            router.use("/test/chats", ChatList);

            const route = Router.instance.getRoute("/test/chats");
            expect(route).not.toBeUndefined();
            expect(route).toHaveProperty("blockClass");
        });

        it("Не найденный маршрут", () => {
            const router = new Router(".mocha");
            router.use("/test/chats", ChatList);

            const route = Router.instance.getRoute("/f7yds87fs7d");
            expect(route).toBeUndefined();
        });
    });
});
