import Block from "../../components/Block/index";
import UserProfile from "./UserProfile";

const page = new UserProfile();
const content = page.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
