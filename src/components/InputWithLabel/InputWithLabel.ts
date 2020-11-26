import Block from "Components/Block";
import ErrorHelper from "Components/ErrorHelper";
import template from "./template";
import { InputWithLabelProps } from "./types";

export default class InputWithLabel<T extends InputWithLabelProps> extends Block<T> {
    errorHelper: ErrorHelper;

    value: string | null;

    constructor(props: T) {
        super("div",
            {
                ...props,
                type: props && !props.type ? "text" : props.type
            });

        this.value = null;

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);

        this.errorHelper = new ErrorHelper({});
    }

    fixProps(props: T) {
        if (props && !props.type) return { ...props, type: "text" };

        return props;
    }

    componentDidMount() {
        this.setProps({
            ...this.props,
            errorHelper: this.errorHelper
        });
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

    setValue(value: string) {
        this.value = value;

        if (this.blockElement) {
            const input = this.element?.querySelector(`#${this.props.id}`);
            if (input) input.setAttribute("value", value);
        }
    }

    validate(): boolean {
        const message = this.checkValidation(this.value);
        this.errorHelper.showOnError(message);

        if (message) return false;

        return true;
    }

    checkValidation(value: string | null): string | null {
        // value нужен в дочерних классах
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        value?.length;
        return null;
    }
}
