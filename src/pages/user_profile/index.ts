import Block from "../../components/Block/index.js";
import UserProfile from "./UserProfile.js";

const page = new UserProfile();
const content = page.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}