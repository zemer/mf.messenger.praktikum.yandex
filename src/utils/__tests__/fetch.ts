import { HTTPTransport, queryStringify } from "../fetch.js";

let expect = chai.expect;

describe("fetch", function () {
    describe("get", function () {
        it("Должен придти ответ", function () {
            const fetch = new HTTPTransport();
            return fetch.get("https://reqres.in/api/users/2", { withCredentials: false })
                .then((res: XMLHttpRequest) => JSON.parse(res.response))
                .then(res => {
                    expect(res).to.haveOwnProperty("data");
                })
        })

        it("Запрос с параметрами", function () {
            const fetch = new HTTPTransport();
            const data = {
                page: 2
            };
            return fetch.get("https://reqres.in/api/users", { data, withCredentials: false })
                .then((res: XMLHttpRequest) => JSON.parse(res.response))
                .then(res => {
                    expect(res).to.haveOwnProperty("data");
                });
        })

        it("Должна быть ошибка, если адрес не существует", function (done: Function) {
            const fetch = new HTTPTransport();
            fetch.get("https://reqfdsfsdfsres.in/api/users/23", { timeout: 1, withCredentials: false })
                .then(() => done("Должна быть ошибка"))
                .catch(() => done());
        });
    });

    describe("post", function () {
        it("Должен придти ответ", function () {
            const fetch = new HTTPTransport();
            return fetch.post("https://reqres.in/api/users", {
                data: {
                    name: "morpheus",
                    job: "leader"
                },
                withCredentials: false
            })
                .then((res: XMLHttpRequest) => JSON.parse(res.response))
                .then(res => {
                    expect(res).to.haveOwnProperty("id");
                    expect(res).to.haveOwnProperty("createdAt");
                });
        })

        it("Должна быть ошибка, если адрес не существует", function (done: Function) {
            const fetch = new HTTPTransport();
            fetch.post("https://reqrfdsfdsfsdgses.in/api/register", {
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

    describe("put", function () {
        it("Должен придти ответ", function () {
            const fetch = new HTTPTransport();
            return fetch.put("https://reqres.in/api/users/2", {
                data: {
                    name: "morpheus",
                    job: "zion resident"
                },
                withCredentials: false
            })
                .then((res: XMLHttpRequest) => JSON.parse(res.response))
                .then(res => {
                    expect(res).to.haveOwnProperty("updatedAt");
                });
        })

        it("Должна быть ошибка, если адрес не существует", function (done: Function) {
            const fetch = new HTTPTransport();
            fetch.put("https://reqrfdsfsdfsdes.in/api/register", {
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

    describe("delete", function () {
        it("Должен придти ответ", function () {
            const fetch = new HTTPTransport();
            return fetch.delete("https://reqres.in/api/users/2", {
                data: {
                    name: "morpheus",
                    job: "zion resident"
                },
                withCredentials: false
            })
                .then((res: XMLHttpRequest) => expect(res.status).to.equal(204));
        })

        it("Должна быть ошибка, если адрес не существует", function (done: Function) {
            const fetch = new HTTPTransport();
            fetch.delete("https://reqrfdsfsdfsdes.in/api/register", {
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

    describe("queryStringify", function () {
        it("Конвертер данных в запрос", function () {
            const result = queryStringify({
                page: 2,
                type: 'xxx'
            });

            expect(result).to.equal("page=2&type=xxx");
        })

        it("Конвертер пустого объекта", function () {
            const result = queryStringify({});
            expect(result).to.equal("");
        })
    })
});