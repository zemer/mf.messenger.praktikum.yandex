import Block from "../../../components/Block/index.js";
import { template } from "./template.js";
import SendMessage from "../../../components/SendMessage/index.js";
import { IChatProps } from "./types.js";
import { ISendMessagProps } from "../../../components/SendMessage/types.js";
import Link from "../../../components/Link/index.js";

export default class Chat extends Block<IChatProps> {
    constructor() {
        const sendMessage = new SendMessage({} as ISendMessagProps);

        const toProfile = new Link({
            text: "Профиль >",
            path: "/profile"
        });

        super("main", {
            items: [],
            user: "Илья",
            messages: [],
            sendMessage,
            toProfile
        }, "full-height zero-margin");

        // const globalStore1 = {
        //     chats: {
        //         items: [1, 2, 3],
        //     },
        // };
    }

    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            items: this.props.items.map(i => i.renderToString()),
            user: this.props.user,
            messages: this.props.messages.map(m => m.renderToString()),
            sendMessage: this.props.sendMessage.renderToString(),
            toProfile: this.props.toProfile.renderToString()
        });

        return block;
    }
} 