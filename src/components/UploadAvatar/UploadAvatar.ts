import { template } from "./template";
import Block from "../Block/index";
import { IUploadAvatarProps } from "./types";

export default class UploadAvatar extends Block<IUploadAvatarProps> {
    constructor(props: IUploadAvatarProps, classes: string | null = null) {
        super("div", props, classes);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let { source } = this.props;

        if (!this.props.source || this.props.source === "") source = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

        const compiled = Handlebars.compile(template);
        return compiled({
            ...this.props,
            source
        });
    }

    setEvents() {
        if (this._element) {
            this._element.addEventListener("click", this.handleClick, false);
        }
    }

    handleClick() {
        this.props.handleClick();
    }
}
