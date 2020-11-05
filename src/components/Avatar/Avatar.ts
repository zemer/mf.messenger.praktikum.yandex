import { template } from "./template.js";
import Block from "../Block/index.js";
import { AvatarProps } from "./types";

export default class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps, classes: string | null = null) {
        super("div", props, classes);
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
} 