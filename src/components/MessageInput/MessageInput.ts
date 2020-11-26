import Block from "Components/Block";
import ErrorHelper from "Components/ErrorHelper";
import template from "./template";
import { IMessageInputProps } from "./types";

export default class MessageInput extends Block<IMessageInputProps> {
    errorHelper: ErrorHelper;

    value: string | null;

    constructor(props: IMessageInputProps, classes?: string) {
        super("div", props, classes);

        this.errorHelper = new ErrorHelper({});
        this.value = null;

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();

        this.setProps({
            ...this.props,
            errorHelper: this.errorHelper
        });
    }

    checkValidation(value: string | null): string | null {
        if (!value) {
            return "Сообщение не может быть пустым";
        }

        if (value.length > 200) {
            return "Сообщение не может быть больше 200 символов";
        }

        return null;
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            ...this.props,
            errorHelper: this.errorHelper?.renderToString()
        });

        return block;
    }

    doAfterRender() {
        if (this.blockElement) {
            this.blockElement.addEventListener("focus", this.handleFocus, true);
            this.blockElement.addEventListener("blur", this.handleBlur, true);
            this.blockElement.addEventListener("input", this.handleInput);
        }
    }

    handleFocus() {
        this.validate();
    }

    handleBlur() {
        this.validate();
    }

    handleInput(ev: Event) {
        this.value = (ev.target as HTMLInputElement)?.value;
    }

    validate(): string | null {
        const message = this.checkValidation(this.value);
        this.errorHelper.showOnError(message);
        return message;
    }
}
