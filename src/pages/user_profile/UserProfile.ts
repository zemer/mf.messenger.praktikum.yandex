import Block from "../../components/Block/index";
import Button from "../../components/Button/index";
import template from "./template";
import LoginField from "../../components/LoginField/index";
import PasswordField from "../../components/PasswordField/index";
import NotEmptyField from "../../components/NotEmptyField/index";
import MailField from "../../components/MailField/index";
import PhoneField from "../../components/PhoneField/index";
import { IUserProfileProps } from "./interfaces";
import Router from "../../utils/router";
import { Store, store } from "../../store/Store";
import getFieldByPath from "../../utils/getFieldByPath";
import { authController } from "../../controllers/AuthController";
import { usersController } from "../../controllers/UsersController";
import UploadAvatar from "../../components/UploadAvatar/index";
import baseAPIUrl from "../../api/api-url";
import { AppState, UserState } from "../../store/interfaces";

export default class UserProfile extends Block<IUserProfileProps> {
    private avatarFile: File | null;

    private firstName?: NotEmptyField;

    private secondName?: NotEmptyField;

    private login?: LoginField;

    private email?: MailField;

    private phone?: PhoneField;

    private oldPassword?: PasswordField;

    private newPassword?: PasswordField;

    private button?: Button;

    private backButton?: Button;

    private logoutButton?: Button;

    private avatar?: UploadAvatar;

    constructor() {
        super("div", {});

        this.avatarFile = null;
    }

    init() {
        store.subscribe(Store.EVENTS.PROFILE_CHANGED, this.onChangeStore.bind(this));

        this.firstName = new NotEmptyField({
            id: "first_name",
            label: "Имя"
        });

        this.secondName = new NotEmptyField({
            id: "second_name",
            label: "Фамилия"
        });

        this.login = new LoginField({
            id: "login",
            label: "Логин"
        });

        this.email = new MailField({
            id: "email",
            label: "Почта"
        });

        this.phone = new PhoneField({
            id: "phone",
            label: "Телефон"
        });

        this.oldPassword = new PasswordField({
            id: "oldPassword",
            label: "Старый пароль",
            type: "password"
        });

        this.newPassword = new PasswordField({
            id: "newPassword",
            label: "Новый пароль",
            type: "password"
        });

        this.avatar = new UploadAvatar({
            imgId: "profile-avatar",
            source: "",
            handleClick: () => {
                const fileEl = document.getElementById("file") as HTMLInputElement;
                fileEl?.click();
            }
        });

        this.button = new Button({
            value: "Сохранить",
            handleClick: () => { this.handleSaveClick(); }
        }, "button button-save");

        this.backButton = new Button({
            value: "< Назад",
            handleClick: () => {
                Router.back();
            }
        }, "button");

        this.logoutButton = new Button({
            value: "Выход",
            handleClick: () => { authController.logout(); }
        }, "button");

        super.init();
    }

    setEvents() {
        if (this.blockElement) {
            const fileEl = document.getElementById("file") as HTMLInputElement;
            if (fileEl) {
                fileEl.addEventListener("change", (ev) => this.handleFileChange(ev), false);
            }
        }
    }

    componentDidMount() {
        super.componentDidMount();

        authController.profile();
    }

    chatsSelector(state: AppState) {
        return getFieldByPath(state, "profile") as UserState;
    }

    onChangeStore() {
        const profile = this.chatsSelector(store.getState());

        this.firstName?.setValue(profile.first_name);
        this.secondName?.setValue(profile.second_name);
        this.login?.setValue(profile.login);
        this.email?.setValue(profile.email);
        this.phone?.setValue(profile.phone);

        let avatarSource = "";

        if (profile.avatar?.length > 0) {
            avatarSource = baseAPIUrl + profile.avatar;
        }

        if (this.avatar) {
            this.avatar.setProps({
                ...this.avatar.props,
                source: avatarSource
            });
        }
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            firtName: this.firstName?.renderToString(),
            secondName: this.secondName?.renderToString(),
            login: this.login?.renderToString(),
            email: this.email?.renderToString(),
            phone: this.phone?.renderToString(),
            oldPassword: this.oldPassword?.renderToString(),
            newPassword: this.newPassword?.renderToString(),
            button: this.button?.renderToString(),
            backButton: this.backButton?.renderToString(),
            logoutButton: this.logoutButton?.renderToString(),
            avatar: this.avatar?.renderToString()
        });

        return block;
    }

    handleFileChange(ev: Event) {
        const target = ev.target as HTMLInputElement;

        if (target?.files && target.files.length === 1) {
            const file = target.files[0];

            if (!file.type.startsWith("image/")) {
                return;
            }

            const fr = new FileReader();
            fr.onload = () => {
                this.avatar?.setProps({
                    ...this.avatar.props,
                    source: (fr.result as string)
                });
            };

            fr.readAsDataURL(file);

            this.avatarFile = file;
        }
    }

    handleSaveClick() {
        const fieldsToValidate = [
            "firstName", "secondName", "login",
            "email", "phone", "oldPassword",
            "newPassword"
        ];

        let isInvalidForm = false;

        fieldsToValidate.forEach((field) => {
            if (!isInvalidForm && !Reflect.get(this, field)?.validate()) {
                isInvalidForm = true;
            }
        });

        if (!isInvalidForm) {
            usersController.updateProfile({
                first_name: this.firstName?.value ?? "",
                second_name: this.secondName?.value ?? "",
                login: this.login?.value ?? "",
                display_name: this.firstName?.value ?? "",
                email: this.email?.value ?? "",
                phone: this.phone?.value ?? ""
            }, this.oldPassword?.value ?? "", this.newPassword?.value ?? "", this.avatarFile);
        }
    }
}
