import { template } from "./template.js";
import Block from "../Block/index.js";
import { IUploadAvatarProps } from "./types";

export default class UploadAvatar extends Block<IUploadAvatarProps> {
    constructor(props: IUploadAvatarProps, classes: string | null = null) {
        super("div", props, classes);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled(this.props);
    }

    setElement(element: HTMLElement) {
        super.setElement(element);

        const img = document.getElementById(this.props.imgId) as HTMLImageElement;
        const span = document.getElementById(this.props.imgId + "-span") as HTMLElement;

        if (img && span) {
            if (this.props.source) {
                img.style.display = "block";
                span.style.display = "none";
            }
            else {
                img.style.display = "none";
                span.style.display = "flex";
            }
        }
    }

    setEvents() {
        if (this._element) {
            this._element.addEventListener('click', this.handleClick, false);
        }
    }

    handleClick() {
        this.props.handleClick();
    }
} 