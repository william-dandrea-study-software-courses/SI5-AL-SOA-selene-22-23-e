import {HttpException, HttpStatus} from '@nestjs/common';

export class resupplyMissionConnotBeAssignedException extends HttpException {
    error: string;
    details: string;

    constructor(id_spacecraft: string) {
        super({'Resupply Mission already assigned':`Resupply Mission already assigned for id : "${id_spacecraft}"`},HttpStatus.FORBIDDEN);
        this.error = 'Resupply Mission already assigned';
        this.details = `Resupply Mission already assigned for id : "${id_spacecraft}"`;
    }
}
