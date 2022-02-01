import { StockInterface } from '../interfaces/stock.interface';

export default class Stock {
  public readonly symbol!: string;

  public readonly open!: number;

  public readonly high!: number;

  public readonly low!: number;

  public readonly close!: number;

  public readonly name!: string;

  constructor(props: StockInterface) {
    this.symbol = props.symbol;
    this.open = props.open;
    this.high = props.high;
    this.low = props.low;
    this.close = props.close;
    this.name = props.name;
  }

  toPlain() {
    return {
      name: this.name,
      symbol: this.symbol,
      open: this.open,
      high: this.high,
      low: this.low,
      close: this.close,
    };
  }

  toResponse() {
    return this.toPlain();
  }
}
