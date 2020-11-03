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
import { usersController } from "../../controllers/UsersController.js";

export default class UserProfile extends Block<IUserProfileProps> {
    constructor() {
        const firtName = new NotEmptyField({
            id: "first_name",
            label: "Имя",
        });

        const secondName = new NotEmptyField({
            id: "second_name",
            label: "Фамилия",
        });

        const login = new LoginField({
            id: "login",
            label: "Логин",
        });

        const email = new MailField({
            id: "email",
            label: "Почта",
        });

        const phone = new PhoneField({
            id: "phone",
            label: "Телефон",
        });

        const oldPassword = new PasswordField({
            id: "oldPassword",
            label: "Старый пароль",
            type: "password",
        });

        const newPassword = new PasswordField({
            id: "newPassword",
            label: "Новый пароль",
            type: "password",
        });

        const button = new Button({
            value: "Сохранить",
            handleClick: () => {
                const validation: Boolean[] = [];

                validation.push(firtName.validate());
                validation.push(secondName.validate());
                validation.push(login.validate());
                validation.push(email.validate());
                validation.push(phone.validate());
                validation.push(oldPassword.validate());
                validation.push(newPassword.validate());

                if (validation.every(v => v)) {
                    usersController.updateProfile({
                        first_name: firtName.value ?? "",
                        second_name: secondName.value ?? "",
                        login: login.value ?? "",
                        display_name: firtName.value ?? "",
                        email: email.value ?? "",
                        //password: password.value ?? "",
                        phone: phone.value ?? ""
                    });
                }
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