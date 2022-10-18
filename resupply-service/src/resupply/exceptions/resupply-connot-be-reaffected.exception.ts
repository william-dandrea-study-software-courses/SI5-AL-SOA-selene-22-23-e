import {HttpException, HttpStatus} from '@nestjs/common';

export class ResupplyConnotBeReaffectedException extends HttpException {
    error: string;
    details: string;

    constructor(idResupply: string) {
        super({'Resupply mission has already been sent':`Resupply mission has already been sent for the id : "${idResupply}"`},HttpStatus.FORBIDDEN);
        this.error = 'Resupply mission has already been sent';
        this.details = `Resupply mission has already been sent for the id : "${idResupply}"`;
    }
}
