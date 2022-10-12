import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

export class ModuleAlreadyIsolatedException extends ErrorDto {
    constructor(idModuleAlreadyIsolated: number) {
        super(HttpStatus.CONFLICT, 'Module already isolated', `"${idModuleAlreadyIsolated}" is already isolated`);
    }
}