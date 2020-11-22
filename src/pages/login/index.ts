import Block from "../../components/Block/index";
import Login from "./Login";

const temp = new Login();
const content = temp.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
