import Block from "Components/Block";
import Button from "Components/Button";
import Input from "Components/Input";
import sanitize from "Utils/escape";
import template from "./template";
import { CreateChatProps } from "./types";

export default class CreateChat extends Block<CreateChatProps> {
    private newChatName?: Input;

    private buttonCreateChat?: Button;

    constructor(props: CreateChatProps, visible: boolean) {
        super("div", props, null, visible);
    }

    init() {
        this.handleCreateChat = this.handleCreateChat.bind(this);

        this.buttonCreateChat = new Button({
            value: "OK",
            handleClick: this.handleCreateChat
        }, "button full-height");

        this.newChatName = new Input({
            id: "newChat",
            label: "Новый чат",
            value: "",
            placeholder: "Название чата"
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
            this.props.onCreateChat(sanitize(name));
        }
    }
}
