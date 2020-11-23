import { HTTPTransport, queryStringify } from "../fetch";

global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const testApiUrl = "https://reqres.in";

describe("fetch", () => {
    describe("get", () => {
        it("Должен придти ответ", () => {
            const fetch = new HTTPTransport(testApiUrl);
            return fetch.get("/api/users/2", { withCredentials: false })
                .then((res: XMLHttpRequest) => JSON.parse(res.responseText))
                .then((res) => expect(res).toHaveProperty("data"));
        });

        it("Запрос с параметрами", () => {
            const fetch = new HTTPTransport(testApiUrl);
            const data = {
                page: 2
            };
            return fetch.get("/api/users", { data, withCredentials: false })
                .then((res: XMLHttpRequest) => JSON.parse(res.responseText))
                .then((res) => expect(res).toHaveProperty("data"));
        });

        it("Должна быть ошибка, если адрес не существует", (done: jest.DoneCallback) => {
            const fetch = new HTTPTransport("https://reqfdsfsdfsres.in");
            return fetch.get("/api/users/23", { timeout: 1, withCredentials: false })
                .then(() => done("Должна быть ошибка"))
                .catch(() => done());
        });
    });

    describe("post", () => {
        it("Должен придти ответ", () => {
            const fetch = new HTTPTransport(testApiUrl);
            return fetch.post("/api/users", {
                data: {
                    name: "morpheus",
                    job: "leader"
                },
                withCredentials: false
            })
                .then((res: XMLHttpRequest) => JSON.parse(res.responseText))
                .then((res) => {
                    expect(res).toHaveProperty("id");
                    expect(res).toHaveProperty("createdAt");
                });
        });

        it("Должна быть ошибка, если адрес не существует", (done: jest.DoneCallback) => {
            const fetch = new HTTPTransport("https://reqrfdsfdsfsdgses.in");
            fetch.post("/api/register", {
                data: {
                    email: "sydney@fife"
                },
                timeout: 1,
                withCredentials: false
            })
                .then(() => done("Должна быть ошибка"))
                .catch(() => done());
        });
    });

    describe("put", () => {
        it("Должен придти ответ", () => {
            const fetch = new HTTPTransport(testApiUrl);
            return fetch.put("/api/users/2", {
                data: {
                    name: "morpheus",
                    job: "zion resident"
                },
                withCredentials: false
            })
                .then((res: XMLHttpRequest) => JSON.parse(res.responseText))
                .then((res) => expect(res).toHaveProperty("updatedAt"));
        });

        it("Должна быть ошибка, если адрес не существует", (done: jest.DoneCallback) => {
            const fetch = new HTTPTransport("https://reqrfdsfsdfsdes.in");
            fetch.put("/api/register", {
                data: {
                    email: "sydney@fife"
                },
                timeout: 1,
                withCredentials: false
            })
                .then(() => done("Должна быть ошибка"))
                .catch(() => done());
        });
    });

    describe("delete", () => {
        it("Должен придти ответ", () => {
            const fetch = new HTTPTransport(testApiUrl);
            return fetch.delete("/api/users/2", {
                data: {
                    name: "morpheus",
                    job: "zion resident"
                },
                withCredentials: false
            })
                .then((res: XMLHttpRequest) => expect(res.status).toEqual(204));
        });

        it("Должна быть ошибка, если адрес не существует", (done: jest.DoneCallback) => {
            const fetch = new HTTPTransport("https://reqrfdsfsdfsdes.in");
            fetch.delete("/api/register", {
                data: {
                    email: "sydney@fife"
                },
                timeout: 1,
                withCredentials: false
            })
                .then(() => done("Должна быть ошибка"))
                .catch(() => done());
        });
    });

    describe("queryStringify", () => {
        it("Конвертер данных в запрос", () => {
            const result = queryStringify({
                page: 2,
                type: "xxx"
            });

            expect(result).toEqual("page=2&type=xxx");
        });

        it("Конвертер пустого объекта", () => {
            const result = queryStringify({});
            expect(result).toEqual("");
        });
    });
});
