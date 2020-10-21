import Block from "../../components/Block/index.js";
import Registration from "./Registration.js";

const page = new Registration();
const content = page.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}