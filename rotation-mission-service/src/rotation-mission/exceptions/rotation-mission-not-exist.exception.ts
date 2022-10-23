import {HttpException, HttpStatus} from '@nestjs/common';

export class RotationMissionNotExistException extends HttpException {
    error: string;
    details: string;

    constructor(idMission: string) {
        super({'Rotation Mission does not exist':`No mission has the id : "${idMission}"`},HttpStatus.NOT_FOUND);
        this.error = 'Rotation Mission does not exist';
        this.details = `No mission has the id : "${idMission}"`;
    }
}
