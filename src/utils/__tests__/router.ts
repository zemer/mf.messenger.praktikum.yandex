import ChatList from "../../pages/chat_list/ChatList";
import Router from "../router";

describe("Router", () => {
    describe("getRoute", () => {
        it("Поиск маршрута", () => {
            const router = new Router(".test");
            router.use("/test/chats", ChatList);

            const route = Router.__instance.getRoute("/test/chats");
            expect(route).not.toBeUndefined();
            expect(route).toHaveProperty("_blockClass");
        });

        it("Не найденный маршрут", () => {
            const router = new Router(".mocha");
            router.use("/test/chats", ChatList);

            const route = Router.__instance.getRoute("/f7yds87fs7d");
            expect(route).toBeUndefined();
        });
    });
});
