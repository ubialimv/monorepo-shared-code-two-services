export default class PersistedStat {
  protected readonly id!: number;

  protected readonly stock!: string;

  protected readonly timesRequested!: number;

  constructor(props: { id: number; stock: string; timesRequested: number }) {
    this.id = props.id;
    this.stock = props.stock;
    this.timesRequested = props.timesRequested;
  }

  toResponse() {
    return {
      stock: this.stock,
      timesRequested: this.timesRequested,
    };
  }
}
