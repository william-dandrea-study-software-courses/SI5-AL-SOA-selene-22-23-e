import { HttpStatus } from '@nestjs/common';
import {ErrorDto} from "../../shared/dto/error.dto";

export class MoonBaseNotExistException extends ErrorDto {
    constructor(idMoonBase: number) {
        super(HttpStatus.NOT_FOUND, `MoonBase "${idMoonBase}" does not exist`);
    }
}
