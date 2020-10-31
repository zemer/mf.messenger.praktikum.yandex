import Block from "../../../components/Block/Block.js";
import Error500 from "./Error500.js";

const temp = new Error500();
const content = temp.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}