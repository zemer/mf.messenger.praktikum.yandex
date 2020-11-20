import Block from "../../../components/Block/Block";
import Error404 from "./Error404";

const temp = new Error404();
const content = temp.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}