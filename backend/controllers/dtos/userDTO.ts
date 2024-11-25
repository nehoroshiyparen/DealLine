interface IUser {
    email: string;
    id: number;
    isActivated: boolean,
    username: string, 
}

export default class UserDTO {
    email: string;
    id: number;
    username: string;
    isActivated: boolean;

    constructor(model: IUser) {
        this.email = model.email
        this.id = model.id
        this.isActivated = model.isActivated
        this.username = model.username
    }
}