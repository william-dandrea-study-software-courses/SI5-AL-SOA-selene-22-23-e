import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

export class ModuleNotExistException extends ErrorDto {
    constructor(idModule: number) {
        super(HttpStatus.NOT_FOUND, `Module "${idModule}" does not exist`);
    }
}
