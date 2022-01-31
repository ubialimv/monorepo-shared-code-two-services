import BaseController from "../../../../../../common/controller/base.controller";
import { HttpRequest, HttpResponse } from "../../../../../../common/http/http.interface";
import { StatRepositoryInterface } from "../repositories/stat.repository.interface";

export default class StatController extends BaseController {
    constructor(
        private readonly statsRepository: StatRepositoryInterface,
    ) {
        super()
    }

    public async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const stats = await this.statsRepository.find(5);

            return this.ok(200, stats.map(x => x.toResponse()));
        } catch (error: any) {
            return this.serverError(error.message);
        }
    }
}