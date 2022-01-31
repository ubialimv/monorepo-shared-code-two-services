import { HistoryInterface } from "./history.interface";

export default class History {
    private readonly date!: Date;

    private readonly symbol!: string;

    private readonly name!: string;

    private readonly open!: number;

    private readonly high!: number;

    private readonly low!: number;

    private readonly close!: number;

    private readonly userId!: number;

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
        }
    }
}