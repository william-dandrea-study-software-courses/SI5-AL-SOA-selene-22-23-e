import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

export class ModuleAlreadyAtTheMaximumSupplyQuantityException extends ErrorDto {
    constructor(moduleId: number, label: string, currentSupply: number, wantedSupply: number) {
        super(HttpStatus.CONFLICT, `Module ${moduleId} have currently a ${label} supply of ${currentSupply}, but your wanted supply of ${wantedSupply} cannot be greater than 10, please give less supply to module`);
    }
}
