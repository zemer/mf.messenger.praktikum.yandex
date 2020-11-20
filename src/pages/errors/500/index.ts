import Block from "../../../components/Block/Block";
import Error500 from "./Error500";

const temp = new Error500();
const content = temp.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}