import Block from "../../components/Block/index.js";
import Login from "./Login.js";

const temp = new Login();
const content = temp.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}