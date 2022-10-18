import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

export class MoonBaseAlreadyExistsException extends ErrorDto {
    constructor(idMoonBaseAlreadyTaken: number) {
        super(HttpStatus.CONFLICT, 'Id moon base already exists', `"${idMoonBaseAlreadyTaken}" is already used`);
    }
}