import Block from "../../components/block/block.js";
import UserProfile from "./user_profile.js";
const page = new UserProfile();
const content = page.getContent();
if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
//# sourceMappingURL=index.js.map