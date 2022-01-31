export default class PersistedStat {
    protected readonly id!: number;

    protected readonly stock!: string;

    protected readonly timesRequested!: number;

    constructor(props: { id: number, stock: string, timesRequested: number }) {
        Object.assign(this, props);
    }

    toResponse() {
        return {
            stock: this.stock,
            timesRequested: this.timesRequested,
        }
    }
}