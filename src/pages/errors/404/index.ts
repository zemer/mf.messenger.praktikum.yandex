import Block from "../../../components/Block/Block.js";
import Error404 from "./Error404.js";

const temp = new Error404();
const content = temp.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}