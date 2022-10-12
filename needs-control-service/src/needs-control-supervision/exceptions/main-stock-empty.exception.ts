import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

export class MainStockEmptyException extends ErrorDto {
    constructor() {
        super(HttpStatus.CONFLICT, `Main stock is empty`);
    }
}
