import { UserInterface } from './user.interface';

export default class User {
  protected readonly email!: string;

  protected readonly password!: string;

  protected readonly root!: boolean;

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
    };
  }
}
