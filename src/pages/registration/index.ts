import Block from "../../components/Block/Block.js";
import Registration from "./registration.js";

const page = new Registration();
const content = page.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}