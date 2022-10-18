import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../../../module-life-service/src/shared/dto/error.dto';

export class MoonBaseNotExistException extends ErrorDto {
    constructor(idMoonBase: number) {
        super(HttpStatus.CONFLICT, `MoonBase "${idMoonBase}" does not exist`);
    }
}
