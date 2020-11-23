export type TChatItems = {
    items: TChatItem[];
};

export type TChatItem = {
    id: number;
    title: string;
    avatar: string;
};

export type TProfile = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
};

export type TChatUsers = {
    items: TProfile[];
};

export type TError = {
    reason: string;
};
