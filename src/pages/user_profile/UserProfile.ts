import Block from "../../components/Block/index.js";
import Button from "../../components/Button/index.js";
import { template } from "./template.js";
import LoginField from "../../components/LoginField/index.js";
import PasswordField from "../../components/PasswordField/index.js";
import NotEmptyField from "../../components/NotEmptyField/index.js";
import MailField from "../../components/MailField/index.js";
import PhoneField from "../../components/PhoneField/index.js";
import { IUserProfileProps } from "./types.js";
import Router from "../../utils/router.js";
import { AppState, ProfileState, Store, store } from "../../store/Store.js";
import get from "../../utils/get.js";
import { authController } from "../../controllers/AuthController.js";

export default class UserProfile extends Block<IUserProfileProps> {
    constructor() {
        const firtName = new NotEmptyField({
            id: "first_name",
            label: "Имя",
            value: ""
        });

        const secondName = new NotEmptyField({
            id: "second_name",
            label: "Фамилия",
            value: ""
        });

        const login = new LoginField({
            id: "login",
            label: "Логин",
            value: ""
        });

        const email = new MailField({
            id: "email",
            label: "Почта",
            value: ""
        });

        const phone = new PhoneField({
            id: "phone",
            label: "Телефон",
            value: ""
        });

        const oldPassword = new PasswordField({
            id: "oldPassword",
            label: "Старый пароль",
            type: "password",
            value: ""
        });

        const newPassword = new PasswordField({
            id: "newPassword",
            label: "Новый пароль",
            type: "password",
            value: ""
        });

        const button = new Button({
            value: "Сохранить",
            handleClick: () => {
                firtName.validate();
                secondName.validate();
                login.validate();
                email.validate();
                phone.validate();
                oldPassword.validate();
                newPassword.validate();
            }
        }, "button button-save");

        const backButton = new Button({
            value: "< Назад",
            handleClick: () => {
                Router.__instance.back();
            }
        }, "button");

        super("div", {
            firtName,
            secondName,
            login,
            email,
            phone,
            oldPassword,
            newPassword,
            button,
            backButton
        });

        store.subscribe(Store.EVENTS.PROFILE_CHANGED, this.onChangeStore.bind(this));
    }

    componentDidMount() {
        super.componentDidMount();

        authController.getChats();
    }

    chatsSelector(state: AppState) {
        return get(state, "profile") as ProfileState;
    }

    onChangeStore() {
        const profile = this.chatsSelector(store.getState());

        this.props.firtName.setValue(profile.first_name);
        this.props.secondName.setValue(profile.second_name);
        this.props.login.setValue(profile.login);
        this.props.email.setValue(profile.email);
        this.props.phone.setValue(profile.phone);
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            firtName: this.props.firtName.renderToString(),
            secondName: this.props.secondName.renderToString(),
            login: this.props.login.renderToString(),
            email: this.props.email.renderToString(),
            phone: this.props.phone.renderToString(),
            oldPassword: this.props.oldPassword.renderToString(),
            newPassword: this.props.newPassword.renderToString(),
            button: this.props.button.renderToString(),
            backButton: this.props.backButton.renderToString(),
        });

        return block;
    }
} 