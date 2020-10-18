import ChatItem from "../components/chat-item/chat-item.js";
import CompanionMessage from "../components/companionMessage/companionMessage.js";
import OwnMessage from "../components/ownMessage/ownMessage.js";

export const items = [
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

export const messages = [
    new CompanionMessage({
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit
        in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum`,
        date: "14:15"
    }),
    new OwnMessage({
        text: `Lorem ipsum dolor sit amet`,
        date: "15:16"
    })
];