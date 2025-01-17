interface IUser {
    email: string;
    id: number;
    isActivated: boolean;
    username: string;
    avatar: string;
}

export default class UserDTO {
    email: string;
    id: number;
    username: string;
    avatar: string;

    constructor(model: IUser) {
        this.email = model.email
        this.id = model.id
        this.username = model.username
        this.avatar = model.avatar
    }
}