import {Controller} from "@nestjs/common";
import {Get} from "@nestjs/common";
import {ClickhouseService} from "./clickhouse.service";

@Controller('clickhouse')

export class ClickhouseController {
    constructor(private readonly clickhouseService: ClickhouseService) {
    }
}