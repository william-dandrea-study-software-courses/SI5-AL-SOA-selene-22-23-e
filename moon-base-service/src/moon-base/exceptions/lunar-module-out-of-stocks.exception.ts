import { HttpStatus } from '@nestjs/common';
import {ErrorDto} from "../../shared/dto/error.dto";


export class LunarModuleOutOfStocksException extends ErrorDto {
    constructor() {
        super(HttpStatus.CONFLICT, `You cannot add this supply to the module life, because the main stock is out of stock`);
    }
}
