import {HttpException, HttpStatus} from '@nestjs/common';

export class ResupplyMissionNotExist extends HttpException {
    error: string;
    details: string;

    constructor(idResupply: string) {
        super({'Resupply mission does not exist':`No mission has the id : "${idResupply}"`},HttpStatus.NOT_FOUND);
        this.error = 'Resupply mission does not exist';
        this.details = `No mission has the id : "${idResupply}"`;
    }
}
