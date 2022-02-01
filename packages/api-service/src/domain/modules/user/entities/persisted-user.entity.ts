import { PersistedUserInterface } from './persisted-user.interface';
import User from './user.entity';

export default class PersistedUser extends User {
  protected readonly id: number;

  constructor(props: PersistedUserInterface) {
    super({ email: props.email, password: props.password, root: props.root });
    this.id = props.id;
  }

  toPlain() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      root: this.root,
    };
  }

  toResponse() {
    return {
      id: this.id,
      email: this.email,
      root: this.root,
    };
  }
}
