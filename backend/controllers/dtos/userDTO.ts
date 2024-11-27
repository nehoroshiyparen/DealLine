interface IUser {
    email: string;
    id: number;
    isActivated: boolean,
    username: string, 
}

export default class UserDTO {
    email: string;
    id: number;
    isActivated: boolean;
    username: string;

    constructor(model: IUser) {
        this.email = model.email
        this.id = model.id
        this.isActivated = model.isActivated
        this.username = model.username
    }
}