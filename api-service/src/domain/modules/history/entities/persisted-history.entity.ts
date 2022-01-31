import History from "./history.entity";
import { PersistedHistoryInterface } from "./persisted-history.interface";

export default class PersistedHistory extends History {
    protected id!: number;

    constructor(props: PersistedHistoryInterface) {
        super({ date: props.date, symbol: props.symbol, name: props.name, low: props.low, close: props.close, high: props.high, open: props.open, userId: props.userId });
        this.id = props.id
    }
}