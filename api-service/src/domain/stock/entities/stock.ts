import { StockInterface } from "../interfaces/stock.interface";

export default class Stock {
    private readonly symbol!: string;

    private readonly date!: string;

    private readonly time!: string;

    private readonly open!: number;

    private readonly high!: number;

    private readonly low!: number;

    private readonly close!: number;

    private readonly volume!: number;

    private readonly name!: string;

    constructor(props: StockInterface) {
        Object.assign(this, props);
    }
}