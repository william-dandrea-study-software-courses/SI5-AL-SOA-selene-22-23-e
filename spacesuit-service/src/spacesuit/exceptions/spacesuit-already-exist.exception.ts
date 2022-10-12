import {HttpException, HttpStatus} from '@nestjs/common';

export class SpacesuitAlreadyExistException extends HttpException {
    error: string;
    details: string;

    constructor(id_spacesuit: number) {
        super({'Spacesuit already exist':`Spacesuit already exist for id : "${id_spacesuit}"`},HttpStatus.NOT_FOUND);
        this.error = 'Spacesuit already exist';
        this.details = `Spacesuit already exist for id : "${id_spacesuit}"`;
    }
}
