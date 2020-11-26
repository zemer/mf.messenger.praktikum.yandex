import Block from "Components/Block";
import Registration from "./Registration";

const page = new Registration();
const content = page.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
