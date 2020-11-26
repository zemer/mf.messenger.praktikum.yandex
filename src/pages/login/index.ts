import Block from "Components/Block";
import Login from "./Login";

const temp = new Login();
const content = temp.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
