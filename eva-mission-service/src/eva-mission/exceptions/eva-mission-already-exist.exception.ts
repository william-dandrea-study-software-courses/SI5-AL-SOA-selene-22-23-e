import {HttpException, HttpStatus} from '@nestjs/common';

export class EVAMisionAlreadyExistException extends HttpException {
    error: string;
    details: string;

    constructor(id_mission: number) {
        super({'EVA Mission already exist':`EVA Mission already exist for id : "${id_mission}"`},HttpStatus.NOT_FOUND);
        this.error = 'EVA Mission already exist';
        this.details = `EVA Mission already exist for id : "${id_mission}"`;
    }
}
