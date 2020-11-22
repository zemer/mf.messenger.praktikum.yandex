import Block from "../Block/index";
import ErrorHelper from "../ErrorHelper/index";
import { InputProps } from "./types";

export default class Input extends Block<InputProps> {
    errorHelper: ErrorHelper;

    value: string | null;

    constructor(props: InputProps, classes?: string) {
        super("input", {
            ...props
        }, classes);

        this.value = null;

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);

        this.errorHelper = new ErrorHelper({});
    }

    componentDidMount() {
        this.setProps({
            ...this.props,
            errorHelper: this.errorHelper
        });
    }

    setElement(element: HTMLElement) {
        super.setElement(element);

        if (element) {
            element.setAttribute("id", this.props.id);
            element.setAttribute("type", this.props.type ?? "text");
            element.setAttribute("placeholder", this.props.placeholder ?? "");
        }
    }

    render() {
        return "";
    }

    setEvents() {
        if (this._element) {
            this._element.addEventListener("focus", this.handleFocus, true);
            this._element.addEventListener("blur", this.handleBlur, true);
            this._element.addEventListener("input", this.handleInput);
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

        if (this._element) {
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
        value?.length;
        return null;
    }
}
