import { template } from "./template.js";
import Block from "../Block/index.js";
import { CreateChatProps } from "./types.js";
import Button from "../Button/index.js";
import Input from "../Input/index.js";

export default class CreateChat extends Block<CreateChatProps> {
    private newChatName?: Input;
    private buttonCreateChat?: Button;

    constructor(props: CreateChatProps) {
        super("div", props);
    }

    init() {
        this.handleCreateChat = this.handleCreateChat.bind(this);

        this.buttonCreateChat = new Button({
            value: "OK",
            handleClick: this.handleCreateChat,
        }, "button full-height");

        this.newChatName = new Input({
            id: "newChat",
            label: "Новый чат",
            value: "",
        }, "full-width");

        super.init();
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled({
            newChatName: this.newChatName?.renderToString(),
            buttonCreateChat: this.buttonCreateChat?.renderToString()
        });
    }

    handleCreateChat() {
        const name = this.newChatName?.value;
        if (name) {
            this.props.onCreateChat(name);
        }
    }
} 