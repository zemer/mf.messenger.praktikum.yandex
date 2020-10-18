var _a;
import ChatItem from "../../components/chat-item/chat-item.js";
const source = (_a = document.getElementById("entry-template")) === null || _a === void 0 ? void 0 : _a.innerHTML;
const template = Handlebars.compile(source);
const items = [
    new ChatItem({
        user: "Илья",
        preview: "Текст",
        date: "01.10.2020"
    }),
    new ChatItem({
        user: "Илларион",
        preview: "Изображение",
        date: "02.10.2020"
    }),
    new ChatItem({
        user: "Игорь",
        preview: "Текст",
        date: "03.10.2020"
    }),
];
const context = {
    items: items.map(i => i.render())
};
const block = template(context);
document.body.innerHTML = block;
//# sourceMappingURL=index.js.map