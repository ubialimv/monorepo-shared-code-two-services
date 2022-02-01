import { HistoryInterface } from './history.interface';

export default class History {
  protected readonly date!: Date;

  protected readonly symbol!: string;

  protected readonly name!: string;

  protected readonly open!: number;

  protected readonly high!: number;

  protected readonly low!: number;

  protected readonly close!: number;

  protected readonly userId!: number;

  constructor(props: HistoryInterface) {
    this.date = props.date || new Date();
    this.symbol = props.symbol;
    this.name = props.name;
    this.open = props.open;
    this.high = props.high;
    this.low = props.low;
    this.close = props.close;
    this.userId = props.userId;
  }

  toPlain() {
    return {
      date: this.date,
      symbol: this.symbol,
      name: this.name,
      open: this.open,
      high: this.high,
      low: this.low,
      close: this.close,
      userId: this.userId,
    };
  }
}
