import Block from "../../components/Block/index.js";
import { template } from "./template.js";
import SendMessage from "../../components/SendMessage/index.js";
import { ChatProps } from "./types.js";
import { ISendMessagProps } from "../../components/SendMessage/types.js";
import Button from "../../components/Button/index.js";
import Router from "../../utils/router.js";

export default class Chat extends Block<ChatProps> {
    private toProfile?: Button;
    private sendMessage?: SendMessage;

    constructor(props: ChatProps) {
        super("main", props, "full-height zero-margin");

        console.log(props);
    }

    init() {
        // this.handlePlusChat = this.handlePlusChat.bind(this);
        // this.handleCreateChat = this.handleCreateChat.bind(this);
        // this.handleShowChat = this.handleShowChat.bind(this);

        //store.subscribe(Store.EVENTS.CHATS_ITEMS_CHANGED, this.onChangeStore.bind(this));

        this.sendMessage = new SendMessage({} as ISendMessagProps);

        this.toProfile = new Button({
            value: "Профиль >",
            handleClick: () => {
                Router.__instance.go("/profile");
            }
        }, "button");

        super.init();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            //items: this.props.items.map(i => i.renderToString()),
            user: this.props.user,
            //messages: this.messages.map(m => m.renderToString()),
            sendMessage: this.sendMessage?.renderToString(),
            toProfile: this.toProfile?.renderToString()
        });

        return block;
    }
} 