import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

export class NeedsNotExistException extends ErrorDto {
    constructor(idNeedsNotExist: number) {
        super(HttpStatus.BAD_REQUEST, 'Needs ', `"${idNeedsNotExist}" doesn't exist`);
    }
}