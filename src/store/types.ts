type TChatItems = {
    items: TChatItem[];
}

type TChatItem = {
    id: number;
    title: string;
    avatar: string;
}

type TProfile = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

type TChatUsers = {
    items: TProfile[];
}