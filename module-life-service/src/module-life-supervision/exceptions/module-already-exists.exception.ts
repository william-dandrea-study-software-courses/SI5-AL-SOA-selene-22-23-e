import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

export class ModuleAlreadyExistsException extends ErrorDto {
    constructor(idModuleAlreadyTaken: number) {
        super(HttpStatus.CONFLICT, 'Id module already exists', `"${idModuleAlreadyTaken}" is already used`);
    }
}