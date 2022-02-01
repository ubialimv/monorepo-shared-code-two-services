import History from './history.entity';
import { PersistedHistoryInterface } from './persisted-history.interface';

export default class PersistedHistory extends History {
  protected id!: number;

  constructor(props: PersistedHistoryInterface) {
    super({
      date: props.date,
      symbol: props.symbol,
      name: props.name,
      low: props.low,
      close: props.close,
      high: props.high,
      open: props.open,
      userId: props.userId,
    });
    this.id = props.id;
  }

  toResponse() {
    return {
      date: this.date.toJSON(),
      name: this.name,
      symbol: this.symbol,
      open: this.open,
      high: this.high,
      low: this.low,
      close: this.close,
    };
  }
}
