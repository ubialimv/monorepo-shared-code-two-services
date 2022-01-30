import { PersistedUserInterface } from "./persisted-user.interface";
import User from "./user.entity";

export default class PersistedUser extends User {
    private readonly id: number

    constructor(props: PersistedUserInterface) {
        super({ email: props.email, password: props.password, root: props.root });
        this.id = props.id
    }
}