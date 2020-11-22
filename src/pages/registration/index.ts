import Block from "../../components/Block/index";
import Registration from "./Registration";

const page = new Registration();
const content = page.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
