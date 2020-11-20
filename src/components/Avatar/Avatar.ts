import { template } from "./template";
import Block from "../Block/index";
import { AvatarProps } from "./types";

export default class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps, classes: string | null = null) {
        super("div", props, classes);
    }

    render() {
        let source = this.props.source;

        if (!this.props.source || this.props.source === "")
            source = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

        const compiled = Handlebars.compile(template);
        return compiled({
            ...this.props,
            source
        });
    }
} 