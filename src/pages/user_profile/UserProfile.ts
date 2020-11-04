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
import UploadAvatar from "../../components/UploadAvatar/index.js";
import { baseAPIUrl } from "../../api/http.js";

export default class UserProfile extends Block<IUserProfileProps> {
    private avatarFile: File | null;

    private firtName?: NotEmptyField;
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
        this.handleAvatarClick = this.handleAvatarClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);

        store.subscribe(Store.EVENTS.PROFILE_CHANGED, this.onChangeStore.bind(this));

        this.firtName = new NotEmptyField({
            id: "first_name",
            label: "Имя",
        });

        this.secondName = new NotEmptyField({
            id: "second_name",
            label: "Фамилия",
        });

        this.login = new LoginField({
            id: "login",
            label: "Логин",
        });

        this.email = new MailField({
            id: "email",
            label: "Почта",
        });

        this.phone = new PhoneField({
            id: "phone",
            label: "Телефон",
        });

        this.oldPassword = new PasswordField({
            id: "oldPassword",
            label: "Старый пароль",
            type: "password",
        });

        this.newPassword = new PasswordField({
            id: "newPassword",
            label: "Новый пароль",
            type: "password",
        });

        this.avatar = new UploadAvatar({
            imgId: "profile-avatar",
            source: "",
            handleClick: this.handleAvatarClick
        });

        this.button = new Button({
            value: "Сохранить",
            handleClick: this.handleSaveClick
        }, "button button-save");

        this.backButton = new Button({
            value: "< Назад",
            handleClick: () => {
                Router.__instance.back();
            }
        }, "button");

        this.logoutButton = new Button({
            value: "Выход",
            handleClick: () => {
                authController.logout();
            }
        }, "button");


        super.init();
    }

    setEvents() {
        if (this._element) {
            var fileEl = document.getElementById("file") as HTMLInputElement;
            if (fileEl) {
                fileEl.addEventListener('change', this.handleFileChange, false);
            }
        }
    }

    componentDidMount() {
        super.componentDidMount();

        authController.profile();
    }

    chatsSelector(state: AppState) {
        return get(state, "profile") as ProfileState;
    }

    onChangeStore() {
        const profile = this.chatsSelector(store.getState());

        this.firtName?.setValue(profile.first_name);
        this.secondName?.setValue(profile.second_name);
        this.login?.setValue(profile.login);
        this.email?.setValue(profile.email);
        this.phone?.setValue(profile.phone);

        if (this.avatar) {
            this.avatar.setProps({
                ...this.avatar.props,
                source: baseAPIUrl + profile.avatar
            });
        }
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            firtName: this.firtName?.renderToString(),
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

    handleAvatarClick() {
        var fileEl = document.getElementById("file") as HTMLInputElement;
        fileEl?.click();
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
                })
            }

            fr.readAsDataURL(file);

            this.avatarFile = file;
        }
    }

    handleSaveClick() {
        const validation: Boolean[] = [];

        validation.push(this.firtName?.validate() ?? false);
        validation.push(this.secondName?.validate() ?? false);
        validation.push(this.login?.validate() ?? false);
        validation.push(this.email?.validate() ?? false);
        validation.push(this.phone?.validate() ?? false);
        validation.push(this.oldPassword?.validate() ?? false);
        validation.push(this.newPassword?.validate() ?? false);

        if (validation.every(v => v)) {
            usersController.updateProfile({
                first_name: this.firtName?.value ?? "",
                second_name: this.secondName?.value ?? "",
                login: this.login?.value ?? "",
                display_name: this.firtName?.value ?? "",
                email: this.email?.value ?? "",
                phone: this.phone?.value ?? ""
            }, this.oldPassword?.value ?? "", this.newPassword?.value ?? "", this.avatarFile);
        }
    }
} 