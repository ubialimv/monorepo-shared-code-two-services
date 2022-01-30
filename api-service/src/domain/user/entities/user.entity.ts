import { UserInterface } from "./user.interface";

export default class User {
    private readonly email!: string

    private readonly password!: string

    private readonly root!: boolean

    constructor(props: UserInterface) {
        this.email = props.email;
        this.password = props.password;
        this.root = props.root || false;
    }

    toPlain() {
        return {
            email: this.email,
            password: this.password,
            root: this.root,
        }
    }
}