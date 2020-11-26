import Block from "Components/Block";
import UserProfile from "./UserProfile";

const page = new UserProfile();
const content = page.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
