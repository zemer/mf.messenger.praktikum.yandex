import { template } from "./template.js";
import Block from "../Block/index.js";
//import { logForm } from "../../utils/logForm.js";
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

    setEvents() {
        if (this._element) {
            var fileEl = document.getElementById(this.props.inputId) as HTMLInputElement;
            if (fileEl) {
                fileEl.addEventListener('click', this.handleClick, false);
            }
        }
    }

    handleClick() {
        //logForm();
        this.props.handleClick();
    }
} 