import { StockInterface } from "../interfaces/stock.interface";

export default class Stock {
    public readonly symbol!: string;

    public readonly date!: string;

    public readonly time!: string;

    public readonly open!: number;

    public readonly high!: number;

    public readonly low!: number;

    public readonly close!: number;

    public readonly volume!: number;

    public readonly name!: string;

    constructor(props: StockInterface) {
        Object.assign(this, props);
    }

    public toPlain() {
        return {
            name: this.name,
            symbol: this.symbol,
            open: this.open,
            high: this.high,
            low: this.low,
            close: this.close,
        }
    }
}