import {HttpException, HttpStatus} from '@nestjs/common';

export class rotationMissionConnotBeAssignedException extends HttpException {
    error: string;
    details: string;

    constructor(id_spacecraft: string) {
        super({'Rotation Mission already assigned':`Rotation Mission already assigned for id : "${id_spacecraft}"`},HttpStatus.FORBIDDEN);
        this.error = 'Rotation Mission already assigned';
        this.details = `Rotation Mission already assigned for id : "${id_spacecraft}"`;
    }
}
